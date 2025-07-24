<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Enums\BattleDifficulty;
use App\Enums\BattleLanguage;

class MakeQuestionController extends Controller
{
    public function index(Request $request)
    {
        return inertia('admin/make-question/index', [
            'user' => $request->user(),
            'difficulties' => array_column(BattleDifficulty::cases(), 'value'),
            'languages' => array_column(BattleLanguage::cases(), 'value'),
        ]);
    }

    public function generateQuestion(Request $request)
    {
        // validasi admin
        if (!$request->user() || !$request->user()->hasRole('admin')) {
            return response()->json(['error' => 'Unauthorized.'], 403);
        }

        $validated = $request->validate([
            'language' => 'required|string|in:' . implode(',', array_column(BattleLanguage::cases(), 'value')),
            'difficulty' => 'required|string|in:' . implode(',', array_column(BattleDifficulty::cases(), 'value')),
            'prompt' => 'required|string|min:10',
        ]);

        $fullPrompt = "Anda adalah seorang ahli pembuat soal untuk platform kuis pemrograman CodeBattle.
        Berdasarkan informasi berikut:
        - Bahasa Pemrograman: {$validated['language']}
        - Tingkat Kesulitan: {$validated['difficulty']}
        - Keterangan Tambahan: {$validated['prompt']}

        Buatlah SATU soal pemrograman dalam bahasa Inggris. Respons HANYA dalam format JSON yang valid.
        Gunakan struktur JSON berikut:
        {
          \"title\": \"Judul soal yang singkat dan jelas\",
          \"language\": \"{$validated['language']}\",
          \"difficulty\": \"{$validated['difficulty']}\",
          \"description\": \"Deskripsi masalah yang detail. Jelaskan apa yang harus dilakukan, input yang diterima, dan output yang diharapkan. Berikan contoh jika perlu.\",
          \"correctAnswer\": \"Kode solusi yang lengkap dan benar untuk masalah tersebut.\",
        }";

        // ambbil API key dari env
        $apiKey = env('GEMINI_API_KEY');
        if (empty($apiKey)) {
            return response()->json(['error' => 'Gemini API Key is not configured.'], 500);
        }

        $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={$apiKey}";

        try {
            $payload = [
                'contents' => [
                    [
                        'role' => 'user',
                        'parts' => [
                            ['text' => $fullPrompt]
                        ]
                    ]
                ],
            ];

            $response = Http::withoutVerifying()->withHeaders([
                'Content-Type' => 'application/json',
            ])->post($apiUrl, $payload);

            $result = $response->json();

            if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
                $generatedText = $result['candidates'][0]['content']['parts'][0]['text'];

                // Bersihkan response dan parse JSON
                $cleanedText = preg_replace('/```json|```/', '', $generatedText);
                $questionData = json_decode(trim($cleanedText), true);

                // Validasi data dari AI
                if (!isset($questionData['title'], $questionData['description'], $questionData['correctAnswer'])) {
                    throw new \Exception('Invalid question format from AI');
                }

                return inertia('admin/make-question/index', [
                    'generatedQuestion' => $questionData,
                    'success' => 'Question generated successfully!',
                    'difficulties' => array_column(BattleDifficulty::cases(), 'value'),
                    'languages' => array_column(BattleLanguage::cases(), 'value'),
                ]);
            } else {
                return response()->json(['error' => 'Failed to get valid response from Gemini API.', 'details' => $result], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while connecting to Gemini API: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        // validasi admin
        if (!$request->user() || !$request->user()->hasRole('admin')) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'correctAnswer' => 'required|string',
            'language' => 'required|string|in:' . implode(',', array_column(BattleLanguage::cases(), 'value')),
            'difficulty' => 'required|string|in:' . implode(',', array_column(BattleDifficulty::cases(), 'value')),
        ]);

        Question::create([
            'user_id'        => $request->user()->id,
            'title'          => $validated['title'],
            'difficulty'     => BattleDifficulty::from($validated['difficulty']),
            'max_points'     => $this->calculatePoints($validated['difficulty']),
            'question'       => $validated['description'],
            'correct_answer' => $validated['correctAnswer'],
            'language'       => BattleLanguage::from($validated['language']),
        ]);

        // Redirect ke halaman daftar pertanyaan setelah berhasil menyimpan
        return redirect()->route('admin.dashboard.index')->with('success', 'Question saved successfully!');
    }

    protected function calculatePoints($difficulty)
    {
        $difficulty = BattleDifficulty::from($difficulty);
        return match ($difficulty) {
            BattleDifficulty::EASY => 10,
            BattleDifficulty::MEDIUM => 25,
            BattleDifficulty::HARD => 50,
        };
    }
}

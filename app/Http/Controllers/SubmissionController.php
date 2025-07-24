<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Submission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SubmissionController extends Controller
{
    public function submitAnswer(Request $request)
    {
        $request->validate([
            'question_id' => 'required|exists:questions,id',
            'answer'      => 'required|string',
        ]);

        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized.'], 401);
        }

        // Ambil soal dari DB
        $question = Question::findOrFail($request->input('question_id'));

        // Siapkan prompt untuk AI
        $prompt = "Soal: {$question->question}\nJawaban benar: {$question->correct_answer}\nJawaban player: {$request->answer}\nBeri penilaian (skor 0-{$question->max_points}) dan feedback singkat.";
        

        // Kirim ke Gemini API
        $apiKey = env('GEMINI_API_KEY');
        $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={$apiKey}";
        $payload = [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post($apiUrl, $payload);

        $result = $response->json();

        // Parsing hasil AI (misal: "Skor: 8\nFeedback: Jawaban sudah benar, tapi kurang penjelasan.")
        $aiText = $result['candidates'][0]['content']['parts'][0]['text'] ?? '';
        preg_match('/Skor:\s*(\d+)/i', $aiText, $scoreMatch);
        preg_match('/Feedback:\s*(.*)/i', $aiText, $feedbackMatch);

        $score = isset($scoreMatch[1]) ? (int)$scoreMatch[1] : 0;
        $feedback = $feedbackMatch[1] ?? 'Tidak ada feedback';

        // Simpan ke tabel submissions
        Submission::create([
            'user_id'           => $user->id,
            'question_id'       => $request->input('question_id'),
            'obtained_points'   => $score,
            'submitted_answers' => $request->answer,
            'feedback'          => $feedback,
        ]);

        return response()->json([
            'score'    => $score,
            'feedback' => $feedback,
        ]);
    }
}

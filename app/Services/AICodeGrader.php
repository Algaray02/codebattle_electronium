<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AICodeGrader
{
    public function grade(array $data): array
    {
        // Tentukan max score berdasar difficulty
        $difficulty = strtolower($data['difficulty'] ?? 'easy');
        $maxScore = match ($difficulty) {
            'easy' => 10,
            'medium' => 15,
            'hard' => 20,
            default => 10,
        };

        // Buat prompt Gemini
        $prompt = <<<PROMPT
Soal:
{$data['question']}

Jawaban benar:
{$data['expected_answer']}

Jawaban player:
{$data['user_answer']}

Beri penilaian skor 0 sampai {$maxScore} dan feedback singkat.
PROMPT;

        // Kirim ke Gemini API
        $apiKey = env('GEMINI_API_KEY');
        $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro:generateContent?key={$apiKey}";

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post($apiUrl, [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => $prompt],
                    ],
                ],
            ],
        ]);

        $result = $response->json();
        $aiText = $result['candidates'][0]['content']['parts'][0]['text'] ?? '';

        preg_match('/Skor:\s*(\d+)/i', $aiText, $scoreMatch);
        preg_match('/Feedback:\s*(.*)/i', $aiText, $feedbackMatch);

        $score = isset($scoreMatch[1]) ? (int)$scoreMatch[1] : 0;
        $feedback = $feedbackMatch[1] ?? 'Tidak ada feedback.';

        // Log biar mudah debug (opsional)
        // \Log::info('AI Response', ['text' => $aiText]);

        return [
            'is_correct' => $score >= ($maxScore * 0.7), // misal: lulus kalau 70%+
            'score' => $score,
            'feedback' => $feedback,
        ];
    }
}

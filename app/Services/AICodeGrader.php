<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AICodeGrader
{
    public function grade(array $data): array
    {
        // Tentukan max score berdasar difficulty
        $difficulty = strtolower($data['difficulty'] ?? 'easy');
        $maxScore = match ($difficulty) {
            'easy' => 10,
            'medium' => 25,
            'hard' => 50,
            default => 10,
        };

        // Buat prompt Gemini yang meminta output JSON
        $prompt = <<<PROMPT
        Anda adalah seorang asisten penilai kode untuk platform edukasi.
Tugas Anda adalah menilai jawaban kode dari seorang player berdasarkan soal yang diberikan.
Tidak ada kode yang akan dieksekusi. Tujuan Anda murni untuk analisis dan penilaian.

Soal:
{$data['question']}

Jawaban player:
{$data['user_answer']}

Tolong berikan penilaian dengan kriteria berikut:
1. Beri skor numerik dari 0 sampai {$maxScore}.
2. Beri feedback teks yang singkat dan jelas mengenai kelebihan atau kekurangan kode.

Tolong kembalikan HANYA sebuah string JSON yang valid dengan format berikut, tanpa teks atau format tambahan di luar JSON:
{
  "score": <skor_numerik>,
  "feedback": "<feedback_teks>"
}
PROMPT;

        // Kirim ke Gemini API
        $apiKey = env('GEMINI_API_KEY');
        $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$apiKey}";

        $response = Http::withoutVerifying()->withHeaders([
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

        // Untuk debugging, lihat respons lengkap dari AI di file log
        Log::info('Full Gemini API Response:', $result);

        // Ambil bagian teks dari respons AI
        $aiText = $result['candidates'][0]['content']['parts'][0]['text'] ?? '{}';

        // Bersihkan teks dari markdown code block jika ada
        $cleanedJsonText = trim(str_replace(['```json', '```'], '', $aiText));

        // Decode JSON dari respons AI
        $parsedResult = json_decode($cleanedJsonText, true);

        // Ambil skor dan feedback dari hasil parse, dengan nilai default jika gagal
        $score = $parsedResult['score'] ?? 0;
        $feedback = $parsedResult['feedback'] ?? 'Gagal memproses feedback dari AI. Silakan coba lagi.';

        return [
            'is_correct' => $score >= ($maxScore * 0.7), // misal: lulus kalau 70%+
            'score' => $score,
            'feedback' => $feedback,
        ];
    }
}

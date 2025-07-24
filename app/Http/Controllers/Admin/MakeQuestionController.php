<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MakeQuestionController extends Controller
{
    public function index()
    {
        return inertia('admin/make-question/index');
    }

    public function generateQuestion(Request $request)
    {
        // validasi admin
        if (!$request->user() || !$request->user()->hasRole('admin')) {
            return response()->json(['error' => 'Unauthorized.'], 403);
        }
        
        // Ambil prompt dari request (misalnya dari input form di frontend)
        $prompt = $request->input('prompt');
        if (empty($prompt)) {
            return response()->json(['error' => 'Prompt cannot be empty.'], 400);
        }

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
                            ['text' => $prompt]
                        ]
                    ]
                ],
            ];

            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($apiUrl, $payload);

            $result = $response->json();

            if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
                $generatedText = $result['candidates'][0]['content']['parts'][0]['text'];

                $question = Question::create([
                    'user_id'        => $request->user()->id,
                    'title'          => $request->input('title'), // pastikan input title dari form
                    'difficulty'     => $request->input('difficulty'),
                    'max_points'     => $request->input('max_points'),
                    'question'       => $generatedText,
                    'correct_answer' => $request->input('correct_answer'), // atau parsing dari AI jika ada
                    'language'       => $request->input('language'),
                ]);

                return response()->json([
                    'question' => $generatedText,
                    'saved'    => true,
                    'id'       => $question->id,
                ]);
            } else {
                return response()->json(['error' => 'Failed to get valid response from Gemini API.', 'details' => $result], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while connecting to Gemini API: ' . $e->getMessage()], 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Enums\BattleDifficulty;
use App\Enums\BattleLanguage;
use App\Enums\BattleStatus;
use App\Models\BattleStage;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BattleController extends Controller
{
    public function index(Request $request)
    {
        // Pastikan user login dan punya role player
        $request->user()->authorizeRoles(['player']);

        // Ambil enum language & difficulty
        $languages = array_map(fn($lang) => $lang->value, BattleLanguage::cases());
        $difficulties = array_map(fn($diff) => $diff->value, BattleDifficulty::cases());

        return Inertia::render('battle/index', [
            'user' => $request->user(),
            'languages' => $languages,
            'difficulties' => $difficulties,
            'canStartBattle' => true
        ]);
    }

    public function start(Request $request)
    {
        $request->validate([
            'language'   => ['required', Rule::in(array_column(BattleLanguage::cases(), 'value'))],
            'difficulty' => ['required', Rule::in(array_column(BattleDifficulty::cases(), 'value'))],
        ]);

        $question = Question::where('language', $request->input('language'))
            ->where('difficulty', $request->input('difficulty'))
            ->inRandomOrder()
            ->first();

        if (!$question) {
            return back()->with('error', 'Soal tidak ditemukan.');
        }

        $battle = BattleStage::create([
            'user_id'     => $request->user()->id,
            'question_id' => $question->id,
            'status'      => BattleStatus::IN_PROGRESS->value,
        ]);

        return Inertia::render('stage/index', [
            'user'      => $request->user(),
            'question'  => $question,
            'battle_id' => $battle->id,
        ]);
    }

    public function submit(Request $request)
    {
        $request->validate([
            'battle_id' => 'required|exists:battle_stages,id',
            'answer'    => 'required|string',
        ]);

        $battle = BattleStage::with('question')->findOrFail($request->input('battle_id'));

        $aiResult = app('App\Services\AICodeGrader')->grade([
            'question' => $battle->question->content,
            'expected_answer' => $battle->question->answer ?? '',
            'user_answer' => $request->input('answer'),
            'difficulty' => $battle->question->difficulty,
            'language' => $battle->question->language,
        ]);

        // Update battle stage dengan data hasil AI
        $battle->update([
            'user_answer'    => $request->input('answer'),
            'correct_answer' => $aiResult['correct_answer'] ?? null,
            'is_correct'     => $aiResult['is_correct'],
            'score'          => $aiResult['score'],
            'feedback'       => $aiResult['feedback'],
            'status'         => $aiResult['is_correct'] ? BattleStatus::COMPLETED->value : BattleStatus::TIMEOUT->value,
        ]);

        return Inertia::render('result/index', [
            'battle'    => $battle->fresh('question'),
            'isCorrect' => $aiResult['is_correct'],
            'score'     => $aiResult['score'],
            'feedback'  => $aiResult['feedback'],
            'correctAnswer' => $aiResult['correct_answer'],
        ]);
    }
}
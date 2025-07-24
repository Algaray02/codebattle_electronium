<?php

namespace App\Http\Controllers;

use App\Enums\BattleDifficulty;
use App\Enums\BattleLanguage;
use App\Enums\BattleStatus;
use App\Models\BattleStage;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BattleController extends Controller
{
    public function index(Request $request)
    {
        // Pastikan user login dan punya role player
        $request->user()->authorizeRoles(['player']);

        // Ambil enum language & difficulty
        $languages = array_column(BattleLanguage::cases(), 'value');
        $difficulties = array_column(BattleDifficulty::cases(), 'value');

        return Inertia::render('battle/index', [
            'user' => $request->user()->load('badge'),
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
            'user'      => $request->user()->load('badge'),
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
        $user = $request->user();

        $aiResult = app('App\Services\AICodeGrader')->grade([
            'question' => $battle->question->question,
            'correct_answer' => $battle->question->correct_answer,
            'user_answer' => $request->input('answer'),
            'difficulty' => $battle->question->difficulty,
            'language' => $battle->question->language,
        ]);

        DB::transaction(function () use ($battle, $user, $aiResult, $request) {
            // 1. Update battle stage dengan data hasil AI
            $battle->update([
                'user_answer'  => $request->input('answer'),
                'is_correct'   => $aiResult['is_correct'],
                'score'        => $aiResult['score'],
                'feedback'     => $aiResult['feedback'],
                'status'       => $aiResult['is_correct'] ? BattleStatus::COMPLETED->value : BattleStatus::TIMEOUT->value,
            ]);


            if ($aiResult['score'] > 0) {
                $user->increment('total_point', $aiResult['score']);
            }
        });

        return Inertia::render('result/index', [
            'user'      => $request->user()->load('badge'),
            'battle'    => $battle->fresh('question'),
            'isCorrect' => $aiResult['is_correct'],
            'score'     => $aiResult['score'],
            'feedback'  => $aiResult['feedback'],
            'correctAnswer' => $battle->question->correct_answer,
        ]);
    }
}

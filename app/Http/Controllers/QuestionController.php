<?php

namespace App\Http\Controllers;

use App\Enums\BattleDifficulty;
use App\Enums\BattleLanguage;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $questions = Question::when($search, function ($query, $search) {
            return $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('question', 'like', '%' . $search . '%');
        })
            ->orderByDesc('created_at')
            ->paginate(10);


        return inertia('admin/index', [
            'questions' => $questions,
            'search'    => $search,
            'auth' => $request->user()->load('badge'),
        ]);
    }

    public function show($id)
    {
        // $question = Question::findOrFail($id);
        // return inertia('admin/questions/show', [
        //     'question' => $question,
        // ]);
    }

    public function edit($id)
    {
        $question = Question::findOrFail($id);

        return inertia('admin/questions/edit/index', [
            'question' => $question,
            'auth' => auth()->user(),
            'difficulties' => array_column(BattleDifficulty::cases(), 'value'),
            'languages' => array_column(BattleLanguage::cases(), 'value'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $question = Question::findOrFail($id);
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'question' => 'required|string',
            'difficulty' => 'required|string',
            'max_points' => 'required|integer',
            'correct_answer' => 'required|string',
            'language' => 'required|string',
        ]);

        $question->update($data);

        return redirect()->route('admin.dashboard.index')->with('success', 'Question updated successfully.');
    }

    public function destroy($id)
    {
        Question::findOrFail($id)->delete();

        return Inertia::location(route('admin.dashboard.index'));
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

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

        return inertia('admin/questions/index', [
            'questions' => $questions,
            'search'    => $search,
        ]);
    }

    public function show($id)
    {
        $question = Question::findOrFail($id);
        return inertia('admin/questions/show', [
            'question' => $question,
        ]);
    }

    public function edit($id)
    {
        $question = Question::findOrFail($id);
        
        return inertia('admin/questions/edit', [
            'question' => $question,
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

        return redirect()->route('question.index')->with('success', 'Question updated successfully.');
    }

    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();

        return redirect()->route('question.index')->with('success', 'Question deleted successfully.');
    }
}

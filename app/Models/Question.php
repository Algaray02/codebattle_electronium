<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'difficulty',
        'max_points',
        'question',
        'correct_answer',
        'language',
    ];

    protected $casts = [
        'difficulty' => 'string',
        'status' => 'string',
        'language' => 'string',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function historyQuizzes()
    {
        return $this->hasMany(HistoryQuiz::class);
    }
}

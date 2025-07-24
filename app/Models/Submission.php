<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Submission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'obtained_points',
        'sumbmitted_answers',
        'feedback',
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

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('history_quiz', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users') 
                ->cascadeOnDelete();
            $table->foreignId('submission_id')
                ->constrained('submissions')
                ->cascadeOnDelete(); // Pastikan ada tabel submissions
            $table->foreignId('question_id')
                ->constrained('questions')
                ->cascadeOnDelete(); // Pastikan ada tabel questions
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('history_quiz');
    }
};

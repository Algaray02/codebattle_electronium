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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users') 
                ->cascadeOnDelete();
            $table->string('difficulty'); // Difficulty level of the question (e.g., easy, medium, hard)
            $table->bigInteger('max_points'); // Maximum points that can be obtained for this question
            $table->longText('question'); // The text of the question
            $table->longText('correct_answer'); // The correct answer for the question
            $table->string('language'); // Language of the question (e.g., 'en', 'id')
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};

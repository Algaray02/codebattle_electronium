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
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users') 
                ->cascadeOnDelete();
            $table->foreignId('question_id')
                ->constrained('questions') 
                ->cascadeOnDelete();
            $table->bigInteger('obtained_points')
                ->default(0); // Total points obtained by the user in this submission
            $table->longText('submitted_answers'); // JSON or serialized data of the answers submitted by the user
            $table->longText('feedback'); // Feedback for the submission, can be null if not provided
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};

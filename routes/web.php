<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//ini buat Home 
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// ini dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dahboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Badges page
// Route::get('/badges', [BadgeController::class, 'index'])
//     ->middleware(['auth'])
//     ->name('badges.index');

require __DIR__.'/auth.php';

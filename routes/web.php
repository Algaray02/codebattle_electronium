<?php

use App\Http\Controllers\Admin\BattleMonitorController;
use App\Http\Controllers\Admin\MakeQuestionController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BattleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;

use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SubmissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route untuk guest (login + register)
Route::middleware('guest')
    ->prefix('auth')
    ->name('auth.')
    ->group(function () {
        Route::inertia('/login', 'auth/login/index')->name('login.form');  // GET /auth/login untuk form
        Route::inertia('/register', 'auth/register/index')->name('register.form'); // GET /auth/register untuk form
        Route::post('/login', [AuthController::class, 'login'])->name('login');  // POST /auth/login untuk proses
        Route::post('/register', [AuthController::class, 'register'])->name('register'); // POST /auth/register untuk proses
    });

//ini buat Home 
Route::get('/', function () {
    return Inertia::render('index');
});

// PLAYER ROUTES
Route::group([
    'middleware' => ['auth'],
    'prefix' => 'battle',
    'name' => 'battle.',
], function () {
    Route::get('/', [BattleController::class, 'index'])->name('index');
    Route::post('/{id}/stage', [BattleController::class, 'start'])->name('start');
    Route::post('/submit', [BattleController::class, 'submit'])->name('submit');
});

// buat semua yang sudah login
Route::group([
    'middleware' => ['auth', 'verified'],
    'prefix' => 'profile',
    'name' => 'profile.',
], function () {
    Route::get('/', [ProfileController::class, 'show'])->name('show');
    Route::post('/update', [ProfileController::class, 'updatePlayer'])->name('updatePlayer');
});

// ADMIN ROUTES
Route::group([
    'middleware' => ['auth'],
    'prefix' => 'admin',
    'name' => 'battle.',
], function () {
    Route::get('/battle', [BattleMonitorController::class, 'index'])->name('index');
});

Route::group([
    'middleware' => ['auth'],
    'prefix' => 'admin',
    'name' => 'dashboard.',
], function () {
    // Untuk index admin
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('index');
    Route::delete('/{id}', [DashboardController::class, 'destroyProfile'])->name('profile.destroy');
});

Route::group([
    'middleware' => ['auth'],
    'prefix' => 'admin/generate-question',
    'name' => 'make-question.',
], function () {
    Route::get('/', [MakeQuestionController::class, 'index'])->name('index');
    Route::post('/', [MakeQuestionController::class, 'generateQuestion'])->name('generate');
});

Route::group([
    'middleware' => ['auth'],
    'prefix' => 'admin/questions',
    'name' => 'question.',
], function () {
    Route::get('/', [QuestionController::class, 'index'])->name('index');
    Route::get('/{id}', [QuestionController::class, 'show'])->name('show');
    Route::get('/{id}/edit', [QuestionController::class, 'edit'])->name('edit');
    Route::put('/{id}', [QuestionController::class, 'update'])->name('update');
    Route::delete('/{id}', [QuestionController::class, 'destroy'])->name('destroy');
});

Route::get('/leaderboard', function () {
    return Inertia::render('leaderboard/index');
})->middleware(['auth', 'verified'])->name('leaderboard');

Route::get('/result', function () {
    return Inertia::render('result/index');
})->middleware(['auth', 'verified'])->name('result');

// Route untuk logout (hanya untuk user yang sudah login)
Route::get('/logout', [AuthController::class, 'logout'])
    ->name('auth.logout')
    ->middleware('auth');
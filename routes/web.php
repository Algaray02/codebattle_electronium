<?php

use App\Http\Controllers\Admin\BattleMonitorController;
use App\Http\Controllers\Admin\MakeQuestionController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BattleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\ProfileController;

use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SubmissionController;
use GuzzleHttp\Middleware;
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
})->middleware('guest');

// PLAYER ROUTES
Route::group([
    'middleware' => ['auth'],
    'prefix' => 'battle',
    'name' => 'battle.',
    'as' => 'battle.'
], function () {
    Route::get('/', [BattleController::class, 'index'])->name('index');
    Route::post('/stage', [BattleController::class, 'start'])->name('start');
    Route::post('/submit', [BattleController::class, 'submit'])->name('submit');
});

// buat semua yang sudah login
Route::group([
    'middleware' => ['auth', 'verified'],
    'prefix' => 'profile',
    'name' => 'profile.',
    'as' => 'profile.',
], function () {
    Route::get('/', [ProfileController::class, 'index'])->name('index');
    Route::post('/update', [ProfileController::class, 'updatePlayer'])->name('updatePlayer');
});

Route::group([
    'middleware' => ['auth', 'verified'],
    'prefix' => 'leaderboard',
    'name' => 'leaderboard.',
    'as' => 'leaderboard.',
], function () {
    Route::get('/', [LeaderboardController::class, 'index'])->name('index');
});

Route::group([
    'middleware' => ['auth'],
    'prefix'     => 'admin',
], function () {

    // == RUTE STATIS (SPESIFIK) DI ATAS ==

    // Rute untuk Dashboard Admin
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard.index');

    // Rute untuk Battle Monitor
    // Route::get('/battle', [BattleMonitorController::class, 'index'])->name('battle.index');

    // Rute untuk Generate Question
    Route::group(['prefix' => 'generate-question', 'as' => 'make-question.'], function () {
        Route::get('/', [MakeQuestionController::class, 'index'])->name('admin.generate.index');
        Route::post('/', [MakeQuestionController::class, 'generateQuestion'])->name('generate');
        Route::post('/save', [MakeQuestionController::class, 'store'])->name('generate.save');
    });


    // == RUTE DINAMIS (DENGAN PARAMETER) DI BAWAH ==

    // Rute untuk Question (edit, update, delete)
    // Kelompokkan semua rute 'question' di bawah prefix 'question'
    Route::group(['prefix' => 'question', 'as' => 'question.'], function () {
        Route::get('/{id}/edit', [QuestionController::class, 'edit'])->name('edit');
        Route::put('/{id}', [QuestionController::class, 'update'])->name('update');
        Route::delete('/{id}', [QuestionController::class, 'destroy'])->name('destroy');
    });

    // Rute untuk menghapus profil dari dashboard
    // Pastikan ini tidak konflik. Jika {id} ini untuk user, lebih baik prefix-nya diganti
    // Contoh: /users/{id}
    Route::delete('/profile/{id}', [DashboardController::class, 'destroyProfile'])->name('profile.destroy');
});


// Route untuk logout (hanya untuk user yang sudah login)
Route::get('/logout', [AuthController::class, 'logout'])
    ->name('auth.logout')
    ->middleware('auth');

<?php

use App\Http\Controllers\ProfileController;

use App\Http\Controllers\Front\{
    BadgeController as FrontBadgeController
};

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//ini buat Home 
Route::get('/', function () {
    return Inertia::render('index');
});

// ini dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dahboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// use middleware khusus untuk role superAdmin dan admin
Route::group([
    'middleware' => ['auth', 'role:superAdmin, admin'],
    'prefix' => 'admin',
    'name' => 'profile.',
], function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('destroy');
});

// buat semua yang sudah login
Route::group([
    'middleware' => ['auth'],
    'prefix' => 'profile',
    'name' => 'profile.',
],function () {
    Route::get('/show', [ProfileController::class, 'show'])->name('show');
    Route::post('/update', [ProfileController::class, 'updatePlayer'])->name('updatePlayer');
});

// contoh untuk nampilin info badge di landing page
Route::get('/badge', [FrontBadgeController::class, 'index'])->name('index');

// Badges page
// Route::get('/badges', [BadgeController::class, 'index'])
//     ->middleware(['auth'])
//     ->name('badges.index');

require __DIR__.'/auth.php';

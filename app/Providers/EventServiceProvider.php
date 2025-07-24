<?php

namespace App\Providers;

use App\Models\User; // <-- Tambahkan ini
use App\Observers\UserObserver; // <-- Tambahkan ini
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Daftarkan UserObserver untuk mengamati model User
        User::observe(UserObserver::class);
    }
}

<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        //
    }

    /**
     * Handle the User "updated" event.
     */
    public function updating(User $user): void
    {
        // Hanya jalankan logika jika kolom 'total_point' berubah
        // untuk menghindari kalkulasi yang tidak perlu.
        if ($user->isDirty('total_point')) {
            $this->updateBadge($user);
        }
    }

    private function updateBadge(User $user): void
    {
        $totalPoints = $user->total_point;
        $newBadgeId = 2; // Default badge_id untuk Bronze

        if ($totalPoints >= 999999) {
            $newBadgeId = 1;
        }

        if ($totalPoints >= 2000) {
            $newBadgeId = 9; // Immortal
        } elseif ($totalPoints >= 1500) {
            $newBadgeId = 4; // Glory
        } elseif ($totalPoints >= 1000) {
            $newBadgeId = 5; // Honor
        } elseif ($totalPoints >= 700) {
            $newBadgeId = 6; // Legend
        } elseif ($totalPoints >= 450) {
            $newBadgeId = 7; // Epic
        } elseif ($totalPoints >= 300) {
            $newBadgeId = 8; // Master
        } elseif ($totalPoints >= 150) {
            $newBadgeId = 3; // Silver
        }

        // Update badge_id user HANYA JIKA badge barunya berbeda
        if ($user->badge_id !== $newBadgeId) {
            $user->badge_id = $newBadgeId;
        }
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}

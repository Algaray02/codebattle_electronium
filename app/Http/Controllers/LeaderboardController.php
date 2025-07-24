<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class LeaderboardController extends Controller
{
    public function index(Request $request): Response
    {
        // 1. Ambil daftar pengguna untuk leaderboard
        $leaderboard = User::query()
            // Eager load relasi badge dan hitung jumlah battle stages
            ->with(['badge'])
            ->withCount('battleStages')
            // Urutkan berdasarkan total_point dari tertinggi ke terendah
            ->orderByDesc('total_point')
            // Ambil 100 pemain teratas (atau sesuaikan jumlahnya)
            ->take(100)
            ->get()
            // Tambahkan ranking ke setiap user
            ->map(function ($user, $key) {
                $user->rank_position = $key + 1;
                return $user;
            });

        // 2. Ambil data user yang sedang login
        $currentUser = $request->user();

        // Cari data lengkap user di leaderboard (jika ada)
        $currentUserDataOnLeaderboard = $leaderboard->firstWhere('id', $currentUser->id);

        // Jika user tidak ada di 100 besar, buat data rank-nya secara manual
        if (!$currentUserDataOnLeaderboard) {
            $rank = User::where('total_point', '>', $currentUser->total_point)->count() + 1;
            $currentUser->load('badge');
            $currentUser->battle_stages_count = $currentUser->battleStages()->count();
            $currentUser->rank_position = $rank;
            $currentUserDataOnLeaderboard = $currentUser;
        }

        return Inertia::render('leaderboard/index', [
            'user' => $request->user()->load('badge'),
            'leaderboard' => $leaderboard,
            'currentUser' => $currentUserDataOnLeaderboard,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\BattleStage;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */

    public function index(Request $request): Response
    {
        $user = $request->user()->load('badge');
        $totalMatches = $user->battleStages()->count();
        $totalObtainedScore = $user->battleStages()->sum('score');

        $favoriteLanguageQuery = DB::table('battle_stages')
            ->join('questions', 'battle_stages.question_id', '=', 'questions.id')
            ->where('battle_stages.user_id', $user->id)
            ->select('questions.language', DB::raw('count(*) as total'))
            ->groupBy('questions.language')
            ->orderByDesc('total')
            ->first();

        $totalMaxScore = DB::table('battle_stages')
            ->join('questions', 'battle_stages.question_id', '=', 'questions.id')
            ->where('battle_stages.user_id', $user->id)
            ->sum(DB::raw("CASE 
            WHEN questions.difficulty = 'easy' THEN 10
            WHEN questions.difficulty = 'medium' THEN 25
            WHEN questions.difficulty = 'hard' THEN 50
            ELSE 0 
        END"));

        $languageCounts = DB::table('battle_stages')
            ->join('questions', 'battle_stages.question_id', '=', 'questions.id')
            ->where('battle_stages.user_id', $user->id)
            ->select('questions.language as label', DB::raw('count(*) as value'))
            ->groupBy('questions.language')
            ->orderByDesc('value')
            ->get();

        $colorMap = [
            'JavaScript' => '#FACC15', // Kuning
            'Python'     => '#22C55E', // Hijau
            'Java'       => '#F97316', // Oranye
            'PHP'        => '#8B5CF6', // Ungu
            'C#'         => '#3B82F6', // Biru
            'C++'        => '#64748B', // Abu-abu
        ];

        $languageStats = $languageCounts->map(function ($item) use ($colorMap) {
            $item->color = $colorMap[$item->label] ?? '#9CA3AF'; // Fallback ke warna abu-abu
            return $item;
        });

        $winrate = 0;
        if ($totalMaxScore > 0) {
            $winrate = round(($totalObtainedScore / $totalMaxScore) * 100, 2);
        }

        $battleHistory = BattleStage::where('user_id', $user->id)->with('question:id,title,question,language,difficulty')->latest()->paginate(5);

        // Tentukan nilai favoriteLanguage, beri default 'N/A' jika belum pernah main
        $favoriteLanguage = $favoriteLanguageQuery->language ?? 'N/A';


        // 3. Menambahkan data custom ke objek user sebelum dikirim
        $user->winRate = $winrate;
        $user->totalMatches = $totalMatches;
        $user->favoriteLanguage = $favoriteLanguage;


        return Inertia::render('profile/index', [
            'user' => $user,
            'battleHistory' => $battleHistory,
            'languageStats' => $languageStats,
        ]);
    }

    public function edit(Request $request)
    {
        // 
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request)
    {
        // $request->user()->fill($request->validated());

        // if ($request->user()->isDirty('email')) {
        //     $request->user()->email_verified_at = null;
        // }

        // $request->user()->save();

        // return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}

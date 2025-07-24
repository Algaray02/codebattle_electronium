<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BattleStage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BattleMonitorController extends Controller
{
    public function index(Request $request)
    {
        $battles = BattleStage::with(['user', 'question'])
            ->latest()
            ->paginate(20);

        return Inertia::render('admin/index', [
            'battles' => $battles,
        ]);
    }
}

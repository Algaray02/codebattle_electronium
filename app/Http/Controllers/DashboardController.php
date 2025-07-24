<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;

class DashboardController extends Controller
{
    // Untuk index admin 
    public function index()     {
        return inertia('admin/index', [
        ]);
        // return redirect()->route('admin.index'); // Redirect ke halaman admin
    }
    
    public function destroyProfile($id): RedirectResponse
    {
        $user = Auth::user();
        // Hapus user yang sedang login
        if ($user->hasRole('admin') || $user->id == $id) {
            User::findOrFail($id)->delete();
            return Redirect::back()->with('success', 'Akun Anda telah dihapus.');
        }

        // Jika bukan user yang sedang login, tampilkan pesan error
        return Redirect::back()->withErrors(['error' => 'Anda tidak dapat menghapus akun orang lain.']);
    }
}

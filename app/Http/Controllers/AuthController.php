<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        // Cek hanya pakai email
        $user = User::where('email', $credentials['email'])->first();

        if ($user && password_verify($credentials['password'], $user->password)) {
            auth()->login($user);
            $request->session()->regenerate();
            return redirect()->intended('/profile'); // Arahkan ke halaman utama atau dashboard
        }
        return back()->with('error', 'Login gagal, pastikan email dan password benar.');
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $data['role_id'] = 3; // role default player
        $data['badge_id'] = null; // default tidak ada badge
        $data['total_point'] = 0; // default point

        $user = User::create($data);

        if ($user) {
            return redirect()->route('auth.login')->with('success', 'Akun berhasil dibuat, silakan login.');
        }

        return back()->with('error', 'Akun gagal dibuat, silakan coba lagi.');
    }

    public function logout(Request $request)
    {
        auth()->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return to_route('auth.login');
    }
}

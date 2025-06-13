<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil role ID
        $roleIds = Role::pluck('id', 'role'); // hasil: ['superAdmin' => 1, 'admin' => 2, 'player' => 3]

        // Buat 1 superAdmin
        User::firstOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('password'),
                'role_id' => $roleIds['superAdmin'] ?? null,
                'email_verified_at' => now(),
                'total_point' => 0
            ]
        );

        // Buat 1 admin
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('password'),
                'role_id' => $roleIds['admin'] ?? null,
                'email_verified_at' => now(),
                'total_point' => 0
            ]
        );

        // Buat 8 player
        for ($i = 1; $i <= 8; $i++) {
            User::firstOrCreate(
                ['email' => "player{$i}@example.com"],
                [
                    'name' => "Player {$i}",
                    'password' => bcrypt('password'),
                    'role_id' => $roleIds['player'] ?? null,
                    'email_verified_at' => now(),
                    'total_point' => 0
                ]
            );
        }
    }
}
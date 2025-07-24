<?php

namespace Database\Seeders;


use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('test'),
                'email_verified_at' => now(),
                'total_point' => 0
            ]
        );
        $admin->assignRole('admin');

        // Buat 9 player
        for ($i = 1; $i <= 9; $i++) {
            $player = User::firstOrCreate(
                ['email' => "player{$i}@example.com"],
                [
                    'name' => "Player {$i}",
                    'password' => bcrypt('test'),
                    'email_verified_at' => now(),
                    'total_point' => 0
                ]
            );
            $player->assignRole('player');
        }
    }
}
<?php

namespace Database\Seeders;


use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'superAdmin',   // 1 untuk super admin
            'admin',   // 1 untuk admin
            'player'  // 2 untuk player
        ];

        foreach ($roles as $roleName) {
            Role::updateOrCreate(
                ['role' => $roleName],
                ['role' => $roleName, 'created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}

<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'key' => Str::uuid()->toString(),
            'nombre' => 'Test User',
            'user' => 'test',
            'password' => Hash::make('12345678'),
            'user_type' => 1
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        User::truncate();

        User::factory()->create([
            'name' => 'admin',
            'email' => env('ADMIN_EMAIL', 'admin@email.com'),
            'password' => env('ADMIN_PASSWORD', 'password'),
        ]);

        User::factory(10)->create();

    }
}

<?php

namespace Database\Seeders;

use App\Models\Carrito;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarritoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Carrito::truncate();
        Carrito::factory(10)->create();
    }
}

<?php

namespace Database\Seeders;

use App\Models\Carrito;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Model::unguard();
        Schema::disableForeignKeyConstraints();

        $this->call(UserTableSeeder::class);
        $this->call(ProductoTableSeeder::class);
        $this->call(CarritoTableSeeder::class);




        Model::reguard();
        Schema::enableForeignKeyConstraints();


    }
}

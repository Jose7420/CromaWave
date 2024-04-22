<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'propietario'



    ];

    public function users(){
        return $this->belongsToMany(User::class, 'carrito_user');
    }

    public function productos(){
        return $this->belongsToMany(Producto::class, 'carrito_producto');
    }


}

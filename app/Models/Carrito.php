<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'propietario'
    ];

    public function users(){
        return $this->belongsToMany(User::class, 'carrito_user');
    }

    public function productos(){
        return $this->belongsToMany(Producto::class, 'carrito_productos');
    }

    // metodo para obtener el usuario propietario del carrito
    public function propietario(){
        return $this->belongsTo(User::class, 'propietario');
    }

    public function carrito_productos()
    {
        return $this->hasMany(Carrito_producto::class);
    }

}

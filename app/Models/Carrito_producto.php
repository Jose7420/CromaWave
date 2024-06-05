<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrito_producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'carrito_id',
        'producto_id',
        'cantidad',
    ];


    // // Relación uno a muchos
    // // Un carrito_producto puede tener muchos carritos
    // public function carrito()
    // {
    //     return $this->belongsTo(Carrito::class);
    // }

    // Relación uno a muchos
    //  Un carrito_producto puede tener muchos productos
    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }

    public function carrito()
    {
        return $this->belongsTo(Carrito::class);
    }


}

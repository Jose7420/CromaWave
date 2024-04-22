<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class carrito_user extends Model
{
    use HasFactory;

    protected $fillable = [
        'carrito_id',
        'user_id',
        'propietario',
    ];

    public function carrito()
    {
        return $this->belongsTo(Carrito::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}

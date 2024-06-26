<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // atributo para saber si el usuario es administrador
    protected $appends = ['isAdmin'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    // Relación muchos a muchos
    // Un usuario puede tener muchos productos
    public function carritos()
    {
        return $this->belongsToMany(Carrito::class);
    }

    public function propietario()
    {
        return $this->hasMany(Carrito::class, 'propietario');
    }

    // metodo para verificar si el usuario es administrador
    public function getIsAdminAttribute():bool
    {
        return $this->email === env('ADMIN_EMAIL');
    }
}

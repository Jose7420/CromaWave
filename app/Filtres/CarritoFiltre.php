<?php
namespace App\Filtres;
use Illuminate\Https\request;
use App\Filtres\apiFiltre;

class CarritoFiltre extends apiFiltre
{
    protected $safeParams = [
        'id' => ['eq', 'ne', 'gt', 'lt', 'gte', 'lte'],
        'nombre' => ['eq', 'ne', 'like'],
        'description' => ['eq', 'ne', 'like'],
        'propietario' => ['eq', 'ne', 'gt', 'lt', 'gte', 'lte'],
        'created_at' => ['eq', 'ne', 'gt', 'lt', 'gte', 'lte'],
        'updated_at' => ['eq', 'ne', 'gt', 'lt', 'gte', 'lte'],
    ];

    protected $columnMap = [
        'id' => 'id',
        'nombre' => 'nombre',
        'description' => 'description',
        'propietario' => 'propietario',
        'created_at' => 'created_at',
        'updated_at' => 'updated_at',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'ne' => '!=',
        'gt' => '>',
        'lt' => '<',
        'gte' => '>=',

    ];
}

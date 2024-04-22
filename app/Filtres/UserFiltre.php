<?php
namespace App\Filtres;
use Illuminate\Https\request;
use App\Filtres\apiFiltre;

class UserFiltre extends apiFiltre
{
    protected $safeParams = [
        'id' => ['eq', 'ne', 'gt', 'lt', 'gte', 'lte'],
        'name' => ['eq', 'ne', 'like'],
        'email' => ['eq', 'ne', 'like'],
        'password' => ['eq', 'ne', 'like'],
        'email_verified_at' => ['eq', 'ne', 'gt', 'lt', 'gte', 'lte'],
        'remember_token' => ['eq', 'ne', 'like'],
        'created_at' => ['eq', 'ne', 'gt', 'lt', 'gte', 'lte'],
        'updated_at' => ['eq', 'ne', 'gt', 'lt', 'gte', 'lte'],
    ];

    protected $columnMap = [
        'id' => 'id',
        'name' => 'name',
        'email' => 'email',
        'password' => 'password',
        'email_verified_at' => 'email_verified_at',
        'remember_token' => 'remember_token',
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

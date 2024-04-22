<?php

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\CarritoController;
use App\Http\Controllers\API\ProductoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function () {
//     $users= User::all();
//     return $users;
// });//;->middleware('auth:sanctum');

Route::apiResource('user', UserController::class);
Route::apiResource('carrito', CarritoController::class);
Route::apiResource('producto', ProductoController::class);

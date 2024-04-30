<?php

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\CarritoController;
use App\Http\Controllers\API\CarritoProductoController;
use App\Http\Controllers\API\CarritoUserController;
use App\Http\Controllers\API\ProductoController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('user', UserController::class);
Route::apiResource('carrito', CarritoController::class);
Route::apiResource('producto', ProductoController::class);
Route::apiResource('carrito_user', CarritoUserController::class);
Route::apiResource('carrito_producto', CarritoProductoController::class);

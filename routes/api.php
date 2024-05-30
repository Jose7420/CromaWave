<?php

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\CarritoController;
use App\Http\Controllers\API\CarritoProductoController;
use App\Http\Controllers\API\CarritoUserController;
use App\Http\Controllers\API\ProductoController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::post('login', [AuthenticatedSessionController::class, 'store']);
// Route::post('register', [RegisteredUserController::class, 'store']);

// Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
//     ->middleware('auth:sanctum')->name('logout');

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::apiResource('user', UserController::class)->middleware('auth:sanctum');
Route::apiResource('carrito', CarritoController::class)->middleware('auth:sanctum');
Route::apiResource('producto', ProductoController::class);
Route::apiResource('carrito_user', CarritoUserController::class)->middleware('auth:sanctum');
Route::apiResource('carrito_producto', CarritoProductoController::class)->middleware('auth:sanctum');

Route::post('/login', [AuthenticatedSessionController::class, 'apiLogin']);







// require __DIR__ . '/auth.php';

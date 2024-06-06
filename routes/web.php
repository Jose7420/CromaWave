<?php

use App\Http\Controllers\API\CarritoController;
use App\Http\Controllers\API\CarritoProductoController;
use App\Http\Controllers\API\ProductoController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return ['Laravel' => app()->version()];
// });

// require __DIR__.'/auth.php';



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('productos', ProductoController::class, ['index', 'create', 'store', 'show', 'edit', 'update', 'destroy'])
    ->middleware('auth:sanctum');
Route::resource('carrito_producto', CarritoProductoController::class, ['index', 'create','store', 'show', 'update', 'destroy'])
    ->middleware('auth:sanctum');

Route::resource('carritos', CarritoController::class, ['index', 'create', 'store', 'show', 'edit', 'update', 'destroy'])
    ->middleware('auth:sanctum');

require __DIR__ . '/auth.php';

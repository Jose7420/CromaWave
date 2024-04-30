<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CarritoProductoResource;
use App\Models\Carrito;
use App\Models\Carrito_producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CarritoProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new CarritoProductoResource(Carrito_producto::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'cantidad' => 'required',
            'producto_id' => 'required',
            'carrito_id' => 'required',
        ]);

        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors()], 400);
        }

        $carrito_producto = Carrito_producto::create($request->all());
        return response()->json([$carrito_producto, 'message' => 'Carrito_producto created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Carrito_producto $carrito_producto)
    {

        return new CarritoProductoResource($carrito_producto);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Carrito_producto $carrito_producto)
    {
        $method = $request->method();
        if ($method === 'PUT') {
            $validate = Validator::make($request->all(), [
                'cantidad' => 'required',
                'producto_id' => 'required',
                'carrito_id' => 'required',
            ]);
        } else {
            $validate = Validator::make($request->all(), [
                'cantidad' => ['sometimes', 'required'],
                'producto_id' => ['sometimes', 'required'],
                'carrito_id' => ['sometimes', 'required'],
            ]);
        }

        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors()], 400);
        }
        $carrito_producto->update($request->all());
        return response()->json(['message' => 'Carrito_producto updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Carrito_producto $carrito_producto)
    {

        $carrito_producto->delete();
        return response()->json(['message' => 'Carrito_producto deleted successfully'], 200);
    }
}

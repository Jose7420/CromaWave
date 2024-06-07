<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CarritoProductoResource;
use App\Http\Resources\ProductoResource;
use App\Models\Carrito;
use App\Models\Carrito_producto;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CarritoProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return new CarritoProductoResource(Carrito_producto::all()->loadMissing('producto')->loadMissing('carrito'));

        // return Inertia::render('Carrito_producto/Index', [
        //     'carrito_productos' => new CarritoProductoResource(Carrito_producto::all()->loadMissing('producto','carrito'))
        // ]);
        // return Inertia::render('Carrito_producto/Index', [
        //     'carrito_productos' => new CarritoProductoResource(Carrito_producto::orderBy('carrito_id')->get()->loadMissing('producto', 'carrito'))
        // ]);


        return Inertia::render('Carrito_producto/Index', [
            'carrito_productos' => new CarritoProductoResource(Carrito_producto::all()->loadMissing('producto', 'carrito'))
        ]);
    }


    public function create(Request $request)
    {

        $carritosPropietario = Auth::user()->propietario;
        $carritosAcceso = Auth::user()->carritos;

        // Fusionar las colecciones
        $carritos = $carritosPropietario->concat($carritosAcceso);

        return Inertia::render('Carrito_producto/Create', [
            'carritos' => new CarritoProductoResource($carritos),
            'producto' => new ProductoResource($request)
        ]);

        // return Inertia::render('Carrito_producto/Create', [
        //     'producto' => $request->id
        // ]);
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
        return redirect()->route('carritos.index');

        return response()->json([$carrito_producto, 'message' => 'Carrito_producto created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($carrito_id)
    {
        // encuentra el carrito_producto por id y carga los productos y los carritos relacionados.
        $carrito_productos = Carrito_producto::where('carrito_id', $carrito_id)->get()->loadMissing('producto', 'carrito');
        //return CarritoProductoResource::collection($carrito_productos);

        //$carrito_productos = Carrito_producto::where('carrito_id', $carrito_producto->carrito_id)->get()->loadMissing('producto', 'carrito');

        return Inertia::render(
            'Carrito_producto/Show',
            [
                'carrito_productos' => new CarritoProductoResource($carrito_productos)
            ]
        );



        // return new CarritoProductoResource($carrito_producto);
       // return new CarritoProductoResource($carrito_producto->where('carrito_id' == 1)->loadMissing('producto', 'carrito'));
    }


    public function edit(Carrito_producto $carrito_producto)
    {
        return Inertia::render('Carrito_producto/Edit', [
            'carrito_producto' => new CarritoProductoResource($carrito_producto->loadMissing('producto', 'carrito'))
        ]);
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
        return redirect()->route('carritos.index');
        //return response()->json(['message' => 'Carrito_producto updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Carrito_producto $carrito_producto)
    {

        $carrito_producto->delete();
        return redirect()->route('carritos.index');
        // return response()->json(['message' => 'Carrito_producto deleted successfully'], 200);
    }
}

<?php

namespace App\Http\Controllers\API;

use App\Filtres\ProductoFiltre;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductoResource;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function index(Request $request)
    {

        $filtre = new ProductoFiltre();

        $queryItems = $filtre->transform($request);
        $productos = Producto::where($queryItems);

        // return new ProductoResource($productos->paginate(12)->appends($request->query()));
        return  Inertia::render('Productos/Index', [
            'productos' => new ProductoResource($productos->paginate(8)->appends($request->query()))
        ]);
    }

    public function create()
    {
        return Inertia::render('Productos/Create');
    }

    public function store(Request $request)
    {
        $producto = json_decode($request->getContent(), true);
        $producto = Producto::create($producto);

       // return new ProductoResource($producto);
       return redirect()->route('productos.index');
    }

    public function show(Producto $producto)
    {

        // crear una nueva instancia de ProductoResource y pasarle el producto y cargar los carritos relacionados.
        //return new ProductoResource($producto->loadMissing('carritos'));

        return Inertia::render('Productos/Show', [
            'producto' => new ProductoResource($producto->loadMissing('carritos'))
        ]);
    }

    public function edit(Producto $producto)
    {

        // return response()->json($producto->loadMissing('carritos'), 200);

        return Inertia::render('Productos/Edit', [
            'producto' => new ProductoResource($producto->loadMissing('carritos'))
        ]);
    }

    public function update(Request $request,$id)
    {

        return response()->json($request->all(), 200);
        // buscar el producto por id
        $producto = Producto::find($id);


        if(!$producto){
            return response()->json(['message' => 'Producto no encontrado'], 200);
        }

        // recoger el metodo de la peticion
        $method = $request->method();

        // comprobar el metodo recogido de la peticion y comprobar si es PUT o PATCH
        // y validar los campos.
        // if ($method === 'PUT') {

        //     $validator = Validator::make($request->all(), [
        //         'nombre' => 'required',
        //         'precio' => 'required',
        //         'descripcion' => 'required',
        //         'imagen' => 'required',
        //     ]);


        // } else {
            $validator = Validator::make($request->all(), [
                'nombre' => ['sometimes','required'],
                'precio' => ['sometimes','required'],
                'descripcion' => ['sometimes','required'],
                'imagen' => ['sometimes','required'],

            ]);
        // }

        // comprobar si la validacion falla y devolver un mensaje de error
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 400);
        }
        // actualizar el producto
        $producto->update($request->all());

        return redirect()->route('productos.index');
        // devolver un mensaje de exito.
        return response()->json(['message' => 'Producto updated successfully'], 200);
    }


    public function destroy(string $id)
    {
        $producto = Producto::find($id);
        if(!$producto){
            return response()->json(['message' => 'No productos found'], 200);
        }
        $producto->delete();
        return redirect()->route('productos.index');
       // return response()->json(['message' => 'Producto deleted successfully'], 200);
    }
}

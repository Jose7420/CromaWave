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
use PhpParser\Node\Stmt\Else_;

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

        $imagen = null;
        if ($request->hasFile('imagen')) {

            $request->validate([
                'imagen' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $imageName = time() . '.' . $request->imagen->extension();
            $request->imagen->move(public_path('images'), $imageName);
            $imagen = asset('images/' . $imageName);
        }

        $producto = new Producto;
        $producto->nombre = $request->nombre;
        $producto->descripcion = $request->descripcion;
        $producto->precio = $request->precio;
        $producto->imagen = $imagen;

        $producto->save();

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

    public function update(Request $request, Producto $producto)
    {

        if (!$producto) {
            return response()->json(['message' => 'No productos found'], 200);
        }

        // comprueba si la peticion tiene un archivo de imagen
        if ($request->hasFile('imagen')) {
            // comprueba si el archivo es valido
            if ($request->file('imagen')->isValid()) {
                // valida el archivo
                $request->validate([
                    'imagen' => 'mimes:png,jpg,jpeg|max:2048', // 2MB Max
                ], [
                    'imagen.mimes' => 'El archivo debe ser una imagen.',
                    'imagen.max' => 'El tamaño de la imagen no debe ser mayor a 5 MB.',
                ]);

                // renombra el archivo con la fecha actual y la extension del archivo
                $imageName = time() . '.' . $request->imagen->extension();
                $request->imagen->move(public_path('images'), $imageName);
                $producto->imagen = asset('images/' . $imageName);
            } else {
                // si el archivo no es valido, se mantiene la imagen actual
                $request['imagen'] = $producto->imagen;
            }
        }
        // valida los campos del producto
        $validator = Validator::make($request->all(), [
            'nombre' => ['sometimes', 'required'],
            'precio' => ['sometimes', 'required'],
            'descripcion' => ['sometimes', 'required'],
        ]);

        // si la validacion falla, devuelve un mensaje de error
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 400);
        }

        // actualiza los campos del producto
        $producto->nombre = $request->nombre;
        $producto->descripcion = $request->descripcion;
        $producto->precio = $request->precio;
        $producto->update();

        return redirect()->route('productos.index');
    }


    public function destroy(string $id)
    {

        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['message' => 'No productos found'], 200);
        }
        $producto->delete();

        // Rederigir a la ruta de productos
        return redirect()->route('productos.index');
    }
}

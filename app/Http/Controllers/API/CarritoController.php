<?php

namespace App\Http\Controllers\API;

use App\Filtres\CarritoFiltre;
use App\Http\Controllers\Controller;
use App\Http\Resources\CarritoResource;
use App\Models\Carrito;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class CarritoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $filtre = new CarritoFiltre();
        $queryItems = $filtre->transform($request);



        $carritosPropietario = Auth::user()->propietario;
        $carritosAcceso = Auth::user()->carritos;

        // Fusionar las colecciones
        $carritos = $carritosPropietario->concat($carritosAcceso);

        return Inertia::render('Carritos/Index', [
            'carritos' => CarritoResource::collection($carritos)
        ]);
    }


    public function create()
    {
        return Inertia::render('Carritos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $carrito = json_decode($request->getContent(), true);

        $carrito = Carrito::create($carrito);
        return "dentro de strore producto carrito";

        // Redirigir a la ruta de carritos
        return redirect()->route('carritos.index');

        //return new CarritoResource($carrito);
    }

    /**
     * Display the specified resource.
     */
    public function show(Carrito $carrito)
    {
        $carrito = Carrito::find($carrito->id);
        if (!$carrito) {
            return response()->json(['message' => 'No carritos found'], 200);
        }

        // retorna el carrito con los productos y los usuarios y los datos del propietario.
        // return new CarritoResource($carrito->loadMissing('productos')->loadMissing('users')->loadMissing('propietario'));

        return Inertia::render('Carritos/Show', [
            'carrito' => new CarritoResource(
                $carrito
                    ->loadMissing('carrito_productos')
                    ->loadMissing('productos')
                    ->loadMissing('users')
                    ->loadMissing('propietario')

            )
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $carrito = Carrito::find($id);

        if (!$carrito) {
            return response()->json(['message' => 'No carritos found'], 200);
        }

        if ($request->method() === 'PUT') {

            $validator = Validator::make($request->all(), [
                'nombre' => 'required',
                'descripcion' => 'required',
                'propietario' => 'required'
            ]);
        } else {

            $validator = Validator::make($request->all(), [
                // 'sometimes' significa que el campo es opcional, pero si se envía, debe ser 'required
                'nombre' => ['sometimes', 'required'],
                'descripcion' => ['sometimes', 'required'],
                'propietario' => ['sometimes', 'required']
            ]);
        }



        if ($validator->fails()) {
            $data = [
                'status' => 400,
                'message' => 'Validation error',
                'error' => $validator->errors()
            ];
            return response()->json($data, 400);
        }


        $carrito->update($request->all());
        return response()->json($carrito);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $carrito = Carrito::find($id);
        if (!$carrito) {
            return response()->json(['message' => 'No carritos found'], 200);
        }
        $carrito->delete();
        return redirect()->route('carritos.index');
       // return response()->json(['message' => 'Carrito deleted'], 200);
    }
}

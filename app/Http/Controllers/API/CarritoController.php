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
        $usuario = Auth::user();
        $filtre = new CarritoFiltre();
        $queryItems = $filtre->transform($request);
        // $carritos = Carrito::where($queryItems);

        $carritos = $usuario->carritos;

        return Inertia::render(
            'Carritos/Index',
            [
                'carritos' => new CarritoResource($carritos)

        ]);
        return new CarritoResource($carritos->paginate()->appends($request->query())->loadMissing('productos')->loadMissing('users')->loadMissing('propietario'));

        // return Inertia::render('Carritos/Index', [
        //     'carritos' => new CarritoResource($carritos->where($usuario->id = 'id_us'))->paginate(8)->appends($request->query()))
        // ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $carrito = json_decode($request->getContent(), true);

        $carrito = Carrito::create($carrito);

        return new CarritoResource($carrito);
    }

    /**
     * Display the specified resource.
     */
    public function show(Carrito $carrito)
    {
        $carrito = Carrito::find($carrito->id);
        if(!$carrito){
            return response()->json(['message' => 'No carritos found'], 200);
        }
        // retorna el carrito con los productos y los usuarios y los datos del propietario.
        // return new CarritoResource($carrito->loadMissing('productos')->loadMissing('users')->loadMissing('propietario'));

        return Inertia::render('Carritos/Show', [
            'carrito' => new CarritoResource($carrito->loadMissing('productos')->loadMissing('users')->loadMissing('propietario'))
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
        return response()->json(['message' => 'Carrito deleted'], 200);
    }
}

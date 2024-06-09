<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CarritoUserResource;
use App\Models\Carrito;
use App\Models\Carrito_user;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CarritoUserController extends Controller
{
    public function index()
    {
        return new CarritoUserResource(Carrito_user::all()->loadMissing('carrito', 'user'));
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'carrito_id' => 'required',
            'user_id' => 'required',
        ]);

        if ($validate->fails()) {
            return response()->json(['message' => 'Validation failed'], 400);
        }

        $carrito_user = Carrito_user::create($request->all());
        return response()->json([$carrito_user, 'message' => 'Carrito_user created successfully'], 201);
    }

    public function show(string $id)
    {
        $carrito_user = Carrito_user::find($id);
        if (is_null($carrito_user)) {
            return response()->json(['message' => 'Carrito_user not found'], 404);
        }
        return new CarritoUserResource($carrito_user);
    }

    public function update(Request $request, string $id)
    {
        $carrito_user = Carrito_user::find($id);

        if (is_null($carrito_user)) {
            return response()->json(['message' => 'Carrito_user not found'], 404);
        }

        if ($request->method() === 'PUT') {
            $validate = Validator::make($request->all(), [
                'carrito_id' => 'required',
                'user_id' => 'required',
            ]);
        } else {
            $validate = Validator::make($request->all(), [
                'carrito_id' => ['sometimes','required'],
                'user_id' => ['sometimes','required'],
            ]);
        }

        if ($validate->fails()) {
            return response()->json(['message' => 'Validation failed'], 400);
        }

        $carrito_user->update($request->all());
        return response()->json([$carrito_user, 'message' => 'Carrito_user updated successfully'], 200);
    }

    public function destroy(string $id)
    {
        $carrito_user = Carrito_user::find($id);
        if (is_null($carrito_user)) {
            return response()->json(['message' => 'Carrito_user not found'], 404);
        }
        $carrito_user->delete();
        return response()->json(['message' => 'Carrito_user deleted successfully'], 200);
    }
}

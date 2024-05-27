<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse //: Response
    {
        $request->authenticate();

        //$request->session()->regenerate();

        // recupera el usuario autenticado
        // elimina  todos los tokens del usuario
        // crea un nuevo token
        $user = $request->user();
        $user->Tokens()->delete();
         $token = $user->createToken('api-token');

        // rertorna el usuario y el token
        return response()->json([
            'user' => $user,
            'token' => $token->plainTextToken,
        ]);

        //  return response()->noContent();
        return response()->json(['message' => 'Sesión iniciada correctamente']);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request) //: Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        //return response()->noContent();
        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }
}

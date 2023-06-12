<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UsuarioEntidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'user' => 'required',
            'password' => 'required'
        ]);

        if (!Auth::attempt($request->only('user', 'password'))) {
            return response()->json([
                'ok' => false,
                'message' => 'Email o contraseña inválidos, o no tiene acceso.',
            ], 401);
        }


        $user = User::where('user', $request->user)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        $entidad_id = UsuarioEntidad::where('user_id', $user->id)->first();
        return response()->json([
            'ok' => true,
            'user' => [
                'nombre' => $user->nombre,
                'user' => $user->user,
                'keyUser' => $user->key,
                'user_type' => $user->user_type,
                'keyEntidad' => $entidad_id->entidad_id ?? 0
            ]
        ], 200);
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        Auth::guard('web')->logout();
        return response()->json([
            'ok' => true,
            'msg' => 'se cerro session'
        ]);
    }
}

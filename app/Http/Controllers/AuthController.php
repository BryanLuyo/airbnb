<?php

namespace App\Http\Controllers;

use App\Models\User;
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

        return response()->json([
            'ok' => true,
            'user' => $user
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

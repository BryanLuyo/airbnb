<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UsuarioEntidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ConserjeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json([
            'ok' => true,
            'response' => DB::select(
                "SELECT users.`key`,users.nombre,users.apellido,users.`user`, users.password_vista
                FROM users
                JOIN usuario_entidad ON users.id = usuario_entidad.user_id AND usuario_entidad.estado = TRUE
                WHERE users.estado = TRUE AND users.user_type = '3' AND usuario_entidad.entidad_id = ?
                ORDER BY users.id DESC",
                [$request->e]
            )
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'entidad_id' => 'required',
            'nombre' => 'required',
            'user' => 'required',
            'password' => 'required',
        ]);

        $user = new User();
        $user->nombre = $request->nombre;
        $user->apellido = $request->apellido ?? '';
        $user->user = $request->user;
        $user->password_vista = $request->password;
        $user->password = Hash::make($request->password);
        $user->user_type = '3';
        $user->save();

        $userFind = User::find($user->key);

        $usuarioEntidad = new UsuarioEntidad();
        $usuarioEntidad->user_id = $userFind->id;
        $usuarioEntidad->entidad_id = $request->entidad_id;
        $usuarioEntidad->save();

        return response()->json([
           'ok' => true,
           'response' => [
              'key' => $user->key,
              'nombre' => $user->nombre,
              'apellido' => $user->apellido,
              'user' => $user->user,
              'password_vista' => $user->password_vista
           ]
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $keyUsuario)
    {
        $user = User::find($keyUsuario);
        $user->estado = false;
        $user->save();
        return response()->json([
            'ok' => true
        ]);
    }
}

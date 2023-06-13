<?php

namespace App\Http\Controllers;

use App\Models\Entidad;
use App\Models\User;
use App\Models\UsuarioEntidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EntidadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'ok' => true,
            'url' => env('APP_URL'),
            'response' => DB::select("
                SELECT
                entidad.nombre,
                users.`user` 'usuario',
                users.password_vista 'password',
                entidad.`key` 'key',
                CONCAT(?,'/frm?e=',entidad.`key`) 'link'
                FROM usuario_entidad
                JOIN entidad ON usuario_entidad.entidad_id = entidad.id AND entidad.estado = TRUE
                JOIN users ON usuario_entidad.user_id = users.id AND users.estado = TRUE
                WHERE entidad.estado = TRUE
            ", [env('APP_URL')])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'usuario' => 'required',
            'password' => 'required'
        ]);

        $entidad = new Entidad();
        $entidad->nombre = $request->nombre;
        $entidad->save();

        $user = new User();
        $user->nombre = $request->nombre;
        $user->user = $request->usuario;
        $user->password_vista = $request->password;
        $user->password = Hash::make($request->password);
        $user->user_type = '2';
        $user->save();

        $entidadFind = Entidad::find($entidad->key);
        $userFind = User::find($user->key);

        $usuarioEntidad = new UsuarioEntidad();
        $usuarioEntidad->user_id = $userFind->id;
        $usuarioEntidad->entidad_id = $entidadFind->id;
        $usuarioEntidad->save();

        return response()->json([
            'ok' => true,
            'response' => [
                'key' => $entidad->key,
                'nombre' => $entidadFind->nombre,
                'usuario' => $userFind->user,
                'password' => $userFind->password_vista,
                'link' => env('APP_URL').'/frm?e='.$entidad->key
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($key)
    {

        $entidad = Entidad::where('id', $key)->first();
        return response()->json([
            'ok' => true,
            'response' => [
                'link' => env('APP_URL').'/frm?e='.$entidad->key,
                'entidad' => $entidad->nombre
            ]
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Entidad $entidad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $keyEntidad)
    {
        $request->validate([
            'nombre' => 'required',
            'usuario' => 'required',
            'password' => 'required'
        ]);

        $entidad = Entidad::find($keyEntidad);
        $entidad->nombre = $request->nombre;
        $entidad->save();

        $entidadFind = Entidad::find($entidad->key);
        $entidadUsuario = DB::table('users')
        ->join('usuario_entidad', 'users.id', '=', 'usuario_entidad.user_id')
        ->select('users.key')->where('users.estado', true)->where('usuario_entidad.estado', true)->first();

        $usuario = User::find($entidadUsuario->key);
        $usuario->user = $request->usuario;
        $usuario->password_vista = $request->password;
        $usuario->password = Hash::make($request->password);
        $usuario->save();

        return response()->json([
            'ok' => true,
            'response' => [
                'key' => $entidad->key,
                'nombre' => $entidadFind->nombre,
                'usuario' => $usuario->user,
                'password' => $usuario->password_vista,
                'link' => env('APP_URL').'/frm?e='.$entidad->key
            ]
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($keyEntidad)
    {
        $entidad = Entidad::find($keyEntidad);
        $entidad->estado = false;
        $entidad->save();
        return response()->json([
            'ok' => true,
            'response' => $keyEntidad
        ]);
    }
}

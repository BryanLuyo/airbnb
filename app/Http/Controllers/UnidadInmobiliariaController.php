<?php

namespace App\Http\Controllers;

use App\Models\Entidad;
use App\Models\UnidadInmobiliaria;
use App\Models\User;
use App\Models\UsuarioEntidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UnidadInmobiliariaController extends Controller
{
    public function index(Request $request)
    {
        $response = DB::select("
        SELECT unidad_inmobiliaria.`key`,entidad.nombre entidadNombre, unidad_inmobiliaria.departamento, users.nombre, IFNULL(users.apellido,'') apellido, users.celular
        FROM unidad_inmobiliaria
        JOIN users ON unidad_inmobiliaria.propietario =  users.id AND users.estado = TRUE
        JOIN entidad ON unidad_inmobiliaria.entidad_id = entidad.id AND entidad.estado = TRUE AND entidad.id = ?
        WHERE unidad_inmobiliaria.estado = TRUE
     ", [$request->e]);

        return response()->json([
            'ok' => true,
            'response' => $response
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'entidad_id' => 'required',
            'departamento' => 'required',
            'nombre' => 'required',
            'celular' => 'required'
        ]);

        $user = new User();
        $user->nombre = $request->nombre;
        $user->apellido = $request->apellido ?? '';
        $user->celular = $request->celular;
        $user->user_type = '5';
        $user->save();


        $unidad = new UnidadInmobiliaria();
        $unidad->departamento = $request->departamento;
        $unidad->propietario = User::find($user->key)->id;
        $unidad->entidad_id = $request->entidad_id;
        $unidad->save();

        return response()->json([
            'ok' => true,
            'response' => [
               'key' => $unidad->key,
               'departamento' => $unidad->departamento,
               'nombre' => $user->nombre,
               'apellido' => $user->apellido,
               'celular' => $user->celular,
               'entidadNombre' => Entidad::where('id', $request->entidad_id)->first()->nombre,
            ]
        ]);
    }

    public function destroy($keyUnidad)
    {
        $unidad = UnidadInmobiliaria::find($keyUnidad);
        $unidad->estado = false;
        $unidad->save();
        return response()->json([
            'ok' => true,
            'response' => $keyUnidad
        ]);
    }

    public function update(Request $request, $keyUnidad)
    {
        $unidad = UnidadInmobiliaria::find($keyUnidad);
        $unidad->departamento = $request->departamento;
        $unidad->save();

        $usuario = User::where('id',$unidad->propietario)->first();
        $usuario->nombre = $request->nombre;
        $usuario->apellido = $request->apellido;
        $usuario->celular = $request->celular;
        $usuario->save();

        return response()->json([
            'ok' => true,
            'response' => [
                'key' => $keyUnidad,
                'nombre' => $usuario->nombre,
                'apellido' => $usuario->apellido,
                'celular' => $usuario->celular,
                'departamento' => $unidad->departamento,
                'entidadNombre' => $request->nombre_entidad
            ]
        ]);
    }
}

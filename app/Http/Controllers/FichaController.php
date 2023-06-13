<?php

namespace App\Http\Controllers;

use App\Models\Ficha;
use App\Models\FichaUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FichaController extends Controller
{
    public function index()
    {
        return response()->json([
            'ok' => true,
            'response' => DB::select("
            SELECT
            ficha.id fichaid,
            users.id users_id,
            CONCAT(users.nombre,'',IFNULL(users.apellido,'')) usuario,
            ficha.departamento departamento,
            (SELECT tipo_documento.tipo FROM tipo_documento WHERE tipo_documento.id = users.tipo_documento_id) tipodocumento,
            users.numero_documento,
            DATE_FORMAT(ficha.ingreso, '%d/%m/%Y %H:%i') ingreso,
            DATE_FORMAT(ficha.salida, '%d/%m/%Y %H:%i') salida
            FROM ficha
            JOIN ficha_user ON ficha_user.ficha_id = ficha.id AND ficha_user.estado = TRUE
            JOIN users ON ficha_user.user_id = users.id AND users.estado = TRUE AND users.user_type = '4'
            WHERE ficha.estado = TRUE
            AND ficha.keyEntidad = (SELECT entidad.key FROM entidad JOIN usuario_entidad ON entidad.id = usuario_entidad.entidad_id AND usuario_entidad.estado = TRUE AND usuario_entidad.user_id = ? )
            AND DATE_ADD(ficha.ingreso, interval 1 day) > NOW()
            ", [Auth::user()->id])
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

        $directory = 'app-arbn';
        $ficha = new Ficha();
        $ficha->keyEntidad = $request->key;
        $ficha->departamento = $request->departamento;
        $ficha->estacionamiento = $request->estacionamiento ?? "";
        $ficha->numero_placa = $request->numero_placa ?? "";
        $ficha->visitas =  $request->visitas ?? "";
        $ficha->ingreso = $request->ingreso ?? "";
        $ficha->salida = $request->salida ?? "";
        $ficha->infantes = $request->infantes ?? "";
        $ficha->numero_huesped = $request->numero_huesped ?? "";
        $ficha->save();


        $adjunto = "";

        for ($i = 1; $i <= $request->numero_huesped; $i++) {

            if ($request->hasFile('adjunto-' . $i)) {
                $adjunto = $request->file('adjunto-' . $i)->store($directory, 'vultr');
            }

            $user = new User();
            $user->nombre  = $request->input("nombre-".$i);
            $user->apellido = $request->input("apellido-".$i);
            $user->tipo_documento_id = $request->input("tipo_documento_id-".$i);
            $user->numero_documento = $request->input("numero_documento-".$i);
            $user->user_type = '4';
            $user->adjunto = $adjunto;
            $user->save();

            $fichaUser = new FichaUser();
            $fichaUser->ficha_id = $ficha->id;
            $fichaUser->user_id = User::find($user->key)->id;
            $fichaUser->save();
        }

        return response()->json([
            'ok' => true,
            'message' => "Se guardo correctamente"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return response()->json([
           'ok' => true,
           'response' => DB::select("
                SELECT
                users.id users_id,
                users.nombre,
                IFNULL(users.apellido,'') apellido,
                ficha.departamento departamento,
                (SELECT tipo_documento.tipo FROM tipo_documento WHERE tipo_documento.id = users.tipo_documento_id) tipodocumento,
                users.numero_documento,
                DATE_FORMAT(ficha.ingreso, '%d/%m/%Y %H:%i') ingreso,
                DATE_FORMAT(ficha.salida, '%d/%m/%Y %H:%i') salida,
                users.adjunto adjunto,
                ficha.estacionamiento,
                ficha.numero_placa,
                CASE ficha.visitas WHEN '1' THEN 'LIBRE' ELSE 'Previa autorización' END visita,
                ficha.infantes  infantes,
                ficha.numero_huesped
                FROM ficha
                JOIN ficha_user ON ficha.id = ficha_user.ficha_id AND ficha_user.estado = TRUE
                JOIN users ON ficha_user.user_id = users.id AND users.estado = TRUE
                where ficha.estado = TRUE AND users.id = ?
           " , [$id])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $ficha = Ficha::find($id);
        $ficha->estado = FALSE;
        $ficha->save();

        return response()->json([
            'ok' => TRUE,
            'mesagge' => 'Se elimino el registro con exito'
        ]);
    }
}

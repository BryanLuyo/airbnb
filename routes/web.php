<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('layout.auth');
})->name('login');

Route::get('/frm', function (Request $request) {
    return view('pages.ficha', [
        'key' => $request->e,
        'unidades' => DB::select(
            "SELECT departamento FROM unidad_inmobiliaria
            WHERE unidad_inmobiliaria.estado = TRUE AND unidad_inmobiliaria.entidad_id =
            (SELECT entidad.id FROM entidad WHERE entidad.key = ?)",
            [$request->e]
        )
    ]);
});

Route::group([
    'middleware' => ['auth:sanctum']
], function () {
    Route::get('/entidades', function () {
        return view('pages.entidades');
    });

    Route::get('/portero', function () {
        return view('pages.portero');
    });

    Route::get('/administrador', function () {
        return view('pages.administrador');
    });
});

Route::get('/s', function (Request $request) {
    $url = Storage::temporaryUrl(
        $request->archive,
        now()->addMinutes(5)
    );
    return redirect($url);
})->middleware('auth:sanctum');

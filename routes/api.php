<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConserjeController;
use App\Http\Controllers\EntidadController;
use App\Http\Controllers\FichaController;
use App\Http\Controllers\UnidadInmobiliariaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::group([
    'middleware' => ['auth:sanctum']
], function () {
    Route::resource('/entidades', EntidadController::class);
    Route::resource('/unidades', UnidadInmobiliariaController::class);
    Route::resource('/conserje', ConserjeController::class);
    Route::post('/auth/logout',[AuthController::class, 'logout']);
    Route::put('/ficha/administrador/update/fechas/{id}', [FichaController::class, 'updateFechasAdministrador']);
    Route::post('/ficha/portero/update/adjunto', [FichaController::class, 'updateAdjunto']);
});

Route::resource('/ficha', FichaController::class);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

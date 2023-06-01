<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EntidadController;
use App\Http\Controllers\FichaController;
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
    Route::post('/auth/logout',[AuthController::class, 'logout']);
});

Route::resource('/ficha', FichaController::class);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('layout.auth');
})->name('login');

Route::get('/frm', function (Request $request){
    return view('pages.ficha', [
        'key' => $request->e
    ]);
});

Route::group([
    'middleware' => ['auth:sanctum']
], function () {
    Route::get('/entidades', function (){
       return view('pages.entidades');
    });

    Route::get('/fichas', function (){
        return view('pages.fichas');
    });
});

Route::get('/s', function (Request $request) {
    $url = Storage::temporaryUrl(
        $request->archive, now()->addMinutes(5)
    );
    return redirect($url);
})->middleware('auth:sanctum');

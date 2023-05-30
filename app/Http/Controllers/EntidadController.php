<?php

namespace App\Http\Controllers;

use App\Models\Entidad;
use Illuminate\Http\Request;

class EntidadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'ok' => true,
            'response' => Entidad::all()
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
         $entidad = new Entidad();
         $entidad->nombre = $request->nombre;
    }

    /**
     * Display the specified resource.
     */
    public function show($key)
    {


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
    public function update(Request $request, Entidad $entidad)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entidad $entidad)
    {
        //
    }
}

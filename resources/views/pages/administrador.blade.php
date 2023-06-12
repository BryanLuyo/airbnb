@extends('layout.dashboard')
@section('script-page')
    @vite(['resources/js/pages/administrador.js'])
@endsection
@section('content-child')
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-lg-12 col-12">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-fichas-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-fichas" type="button" role="tab" aria-controls="nav-fichas"
                                aria-selected="true" data-type='fichas'>Fichas</button></button>
                            <button class="nav-link" id="nav-departamentos-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-departamentos" type="button" role="tab"
                                aria-controls="nav-departamentos" aria-selected="false"
                                data-type='departamentos'>Departamentos</button>
                            <button class="nav-link" id="nav-usuarios-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-usuarios" type="button" role="tab" aria-controls="nav-usuarios"
                                aria-selected="false" data-type='usuario'>Conserje o porteria</button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <div class="card-body ag-theme-material" style="padding: 0">

            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-fichas" role="tabpanel" aria-labelledby="nav-fichas-tab"
                    tabindex="0">
                    <div id='grid-fichas'  style="height: calc(100vh - 180px);"></div>
                </div>
                <div class="tab-pane fade" id="nav-departamentos" role="tabpanel" aria-labelledby="nav-departamentos-tab"
                    tabindex="0">
                    <div id='grid-departamentos' style="height: calc(100vh - 230px);"></div>
                </div>
                <div class="tab-pane fade" id="nav-usuarios" role="tabpanel" aria-labelledby="nav-usuarios-tab"
                    tabindex="0">
                    <div id='grid-usuarios' style="height: calc(100vh - 230px);"></div>
                </div>
            </div>

        </div>
    </div>

    <x-modal-ficha-detalle></x-modal-ficha-detalle>
@endsection

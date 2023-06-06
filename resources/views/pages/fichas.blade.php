@extends('layout.dashboard')
@section('script-page')
    @vite(['resources/js/pages/fichas.js'])
@endsection
@section('content-child')

    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-lg-6 col-7">
                    <h6>Fichas</h6>
                </div>
            </div>
        </div>
        <div class="card-body ag-theme-material" id="myGrid" style="height: calc(100vh - 180px);padding:0">
        </div>
    </div>

    <div class="modal fade" id="modalDetalle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detalle del usuario <span id="nom_usuario"></span></h5>
                </div>
                <div class="modal-body" id="flicha-detalle">

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnCancelarGuardarEntidad"
                        data-bs-dismiss="modal">Cerrar</button>
                </div>

            </div>
        </div>
    </div>
@endsection

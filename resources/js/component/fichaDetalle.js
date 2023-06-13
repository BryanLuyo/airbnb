export default async (resp, administrador = false, dataDepartamentos = []) => {

    /*${ dataDepartamentos.map(departamento => {
            console.log(departamento);
    })}*/

    if ( administrador) {
       document.getElementById('foot-modal-detalle').innerHTML = `
            <button type="button" class="btn btn-secondary" id="btnCancelarGuardarEntidad" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" style="background: #001a57" id="btnGuardarDetalleFichaAdministrador">Guardar</button>
       `
    }

    return `
        <div class="row">
            <div class="col-md-6 col-lg-3">
                <label for="departamento" class="form-label"><span style="color: red">(*)</span>Departamento</label>
                <input type="text" class="form-control" value="${resp.departamento}" disabled="disabled">
            </div>
            <div class="col-md-6 col-lg-3">
                <label for="estacionamiento" class="form-label">Cochera(en caso aplique)</label>
                <input type="text" class="form-control" value="${resp.estacionamiento}" disabled="disabled">
            </div>
            <div class="col-md-6 col-lg-3">
                <label for="numero_placa" class="form-label">Número de Placa</label>
                <input type="text" class="form-control" value="${resp.numero_placa}" disabled="disabled">
            </div>
            <div class="col-md-6 col-lg-3">
                <label for="visitas" class="form-label">Autorización de Visitas </label>
                <input type="text" class="form-control" value="${resp.visita}" disabled="disabled">
            </div>

            <div class="col-md-6 col-lg-3">
                <label for="ingreso" class="form-label">Fecha y hora de ingreso</label>
                <input type="datetime-local" class="form-control" value="${resp.ingreso}" ${administrador ?? 'disabled="disabled"'}>
            </div>

            <div class="col-md-6 col-lg-3">
                <label for="salida" class="form-label">Fecha y hora de salida</label>
                <input type="datetime-local" class="form-control" value="${resp.salida}" ${administrador ?? 'disabled="disabled"'}>
            </div>

            <div class="col-md-6 col-lg-3">
                <label for="infantes" class="form-label">Incluye Infantes ?</label>
                <input type="text" class="form-control" value="${resp.infantes}" disabled="disabled">
            </div>

            <div class="col-md-6 col-lg-3">
                <label for="numero_huesped" class="form-label">Número de Huesped</label>
                <input type="number" class="form-control" value="${resp.numero_huesped}" disabled="disabled">
            </div>

            <div class="col-md-12" style="margin-top: 10px">
                <span style="font-size: 13px"><b> Huesped </b></span>
            </div>
            <hr style="margin-bottom: 10px !important">
            <div class="col-md-6 col-lg-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" value="${resp.nombre}" disabled="disabled">
            </div>
            <div class="col-md-6 col-lg-3">
                <label  class="form-label">Apellido</label>
                <input type="text" class="form-control" value="${resp.apellido}" disabled="disabled">
            </div>
            <div class="col-md-6 col-lg-3">
                <label class="form-label">Tipo de Documento</label>
                <input type="text" class="form-control"  value="${resp.tipodocumento}" disabled="disabled">
            </div>
            <div class="col-md-6 col-lg-3">
                <label for="numero_documento" class="form-label">Número de
                    Documento</label>
                <input type="text" class="form-control" value="${resp.numero_documento}" disabled="disabled">
            </div>
        </div>
    `
}

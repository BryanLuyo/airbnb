<div class="modal fade" id="modalGuardarUnidad" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="title-unidad" style="font-size: 15px">Agregar Entidad</h5>
            </div>
            <div class="modal-body">
                <form class="needs-validation" id="formUnidad" novalidate>
                    <input type="hidden" name="nombre_entidad" id="nombre_entidad">
                    <input type="hidden" name="entidad_id" id="entidad_id">
                    <div class="row g-3">
                        <div class="col-12">
                            <label for="txt-departamento" class="form-label"><span style="color: red">*</span> Unidad Inmobiliaria(Departamento)</label>
                            <input type="text" class="form-control" id="txt-departamento" name="departamento" required>
                        </div>
                        <div class="col-12">
                            <label for="txt-propietario-enombre" class="form-label"><span style="color: red">*</span> Nombre del Propietario</label>
                            <input type="text" class="form-control" id="txt-propietario-enombre" name="nombre" required>
                        </div>
                        <div class="col-12">
                            <label for="txt-propietario-apellido" class="form-label">Apellido del Propietario</label>
                            <input type="text" class="form-control" id="txt-propietario-apellido" name="apellido">
                        </div>
                        <div class="col-12">
                            <label for="txt-propietario-celular" class="form-label"><span style="color: red">*</span> Celular del Propietario</label>
                            <input type="number" class="form-control" id="txt-propietario-celular" name="celular" required>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="btnCancelarGuardarUnidad"
                    data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" style="background: #001a57"
                    id="btnGuardarUnidad">Guardar</button>
            </div>
        </div>
    </div>
</div>

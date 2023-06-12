import { Grid } from "ag-grid-community";
import ButtonsEntidad from "../../ag-grid-render/buttonsEntidad";
import Loading from "../../ag-grid-render/loading";
import NoResult from "../../ag-grid-render/noResult";
import es from "../../es";
import { alertMessage,nxtoast } from "../../function";
export default async (modalAddUnidad) => {
    document.getElementById('btnAddUnidad').addEventListener('click', () => {
        agregarUnidad = true;
        document.getElementById("formUnidad").classList.remove('was-validated')
        document.getElementById('title-unidad').innerText = 'Agregar Unidad Inmobiliaria'
        document.getElementById('entidad_id').value = _user.keyEntidad;
        document.getElementById('txt-departamento').value = '';
        document.getElementById('txt-propietario-enombre').value = '';
        document.getElementById('txt-propietario-apellido').value = '';
        document.getElementById('txt-propietario-celular').value = '';
        modalAddUnidad.show();
    })
    const editRow = async (resp) => {
        agregarUnidad = false;
        keyUnidad = resp.key;
        document.getElementById("formUnidad").classList.remove('was-validated')
        document.getElementById('title-unidad').innerText = 'Editar Unidad Inmobiliaria'
        document.getElementById('entidad_id').value = _user.keyEntidad;
        document.getElementById('nombre_entidad').value = resp.entidadNombre;
        document.getElementById('txt-departamento').value = resp.departamento;
        document.getElementById('txt-propietario-enombre').value = resp.nombre;
        document.getElementById('txt-propietario-apellido').value = resp.apellido;
        document.getElementById('txt-propietario-celular').value = resp.celular;
        modalAddUnidad.show();
    }
    const deleteRow = async (resp) => {
        nxtoast({
            title: "Eliminar Entidad",
            mensaje: `Desea eliminar la unidad ${resp.departamento} ?`,
            button: [
                {
                    title: "cerrar",
                    class: "btn btn-secondary btn-sm",
                    function: 'data-bs-dismiss="toast"',
                    callback: false,
                },
                {
                    title: "Aceptar",
                    class: "btn btn-primary btn-sm",
                    style: "background: #001a57;",
                    id: "btn-toast-aceptar",
                    callback: async () => {
                        var { data } = await axios.delete(`${apiURL}/unidades/${resp.key}`);
                        if (data.ok) {
                            gridOptions.api.applyTransaction({
                                remove: [{ key: resp.key }],
                            });
                            await nxtoast({
                                hide: true,
                            });
                            await alertMessage(
                                "success",
                                "Periodo eliminado con exito"
                            );
                        }
                    },
                },
            ],
            show: true,
        });
    };
    const columnDefs = [
        { field: "entidadNombre", headerName: "Entidad Inmobiliaria", width: 350 },
        { field: "departamento", headerName: "Unidad Inmobiliaria", width: 200 },
        { field: "nombre", headerName: "Nombre", width: 350 },
        { field: "apellido", headerName: "Apellido", width: 350 },
        { field: "celular", headerName: "Celular", width: 200 },
        {
            field: "key",
            headerName: "Acciones",
            width: 50,
            pinned: "right",
            cellRenderer: ButtonsEntidad,
            cellRendererParams: {
                clickedDelete: (data) => {
                    deleteRow(data);
                },

                clickedEdit: (data) => {
                    editRow(data);
                },
            },
        },
    ];
    const gridOptions = {
        columnDefs: columnDefs,
        getRowId: (params) => params.data.key,
        defaultColDef: {
            sortable: true,
            filter: false,
            resizable: true,
            minWidth: 160,
            flex: 1,
        },
        pagination: true,
        loadingOverlayComponent: Loading,
        loadingOverlayComponentParams: {
            loadingMessage: "Cargando Unidades...",
        },
        noRowsOverlayComponent: NoResult,
        localeText: es.ag_grid,

    };
    const gridDiv = document.querySelector("#grid-departamentos");
    gridDiv.innerHTML = "";
    new Grid(gridDiv, gridOptions);
    gridOptions.api.setRowData([]);
    var { data } = await axios.get(`${apiURL}/unidades?e=${_user.keyEntidad}`);
    gridOptions.api.setRowData(data.response);
}

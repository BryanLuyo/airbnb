import { Grid } from "ag-grid-community";
import es from "../../es";
import NoResult from "../../ag-grid-render/noResult";
import Loading from "../../ag-grid-render/loading";
import ButtonDelete from "../../ag-grid-render/buttonDelete";
import { alertMessage, nxtoast } from "../../function";

export default async (modalAddPortero) => {

    document.getElementById('btnAddPortero').addEventListener('click', () => {
        document.getElementById('entidad_id_concerje').value = _user.keyEntidad
        modalAddPortero.show()
    })

    const columnDefs = [
        { field: "nombre", headerName: "Nombre", width: 350 },
        { field: "apellido", headerName: "Apellido", width: 200 },
        { field: "user", headerName: "Usuario", width: 350 },
        { field: "password_vista", headerName: "Password", width: 350 },
        {
            field: "key",
            headerName: "Acciones",
            width: 50,
            pinned: "right",
            cellRenderer: ButtonDelete,
            cellRendererParams: {
                clickedDelete: (data) => {
                    deleteRow(data);
                },
            },
        },
    ];

    const deleteRow = async (resp) => {
        nxtoast({
            title: "Eliminar Usuario",
            mensaje: `Desea eliminar el usuario ${resp.nombre} ${resp.apellido} ?`,
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
                        var { data } = await axios.delete(`${apiURL}/conserje/${resp.key}`);
                        if (data.ok) {
                            gridOptions.api.applyTransaction({
                                remove: [{ key: resp.key }],
                            });
                            await nxtoast({
                                hide: true,
                            });
                            await alertMessage(
                                "success",
                                "Registro eliminado con exito"
                            );
                        }
                    },
                },
            ],
            show: true,
        });
    };

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
            loadingMessage: "Cargando Usuarios ...",
        },
        noRowsOverlayComponent: NoResult,
        localeText: es.ag_grid,

    };
    const gridDiv = document.querySelector("#grid-porteros");
    gridDiv.innerHTML = "";
    new Grid(gridDiv, gridOptions);
    var { data } = await axios.get(`${apiURL}/conserje?e=${_user.keyEntidad}`);
    gridOptions.api.setRowData(data.response);

}

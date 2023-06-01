import { Grid } from "ag-grid-community";
import Loading from "../ag-grid-render/loading";
import NoResult from "../ag-grid-render/noResult";
import es from "../es";
import ButtonDetalle from "../ag-grid-render/buttonDetalle";
import { nxmodal } from "../function";
import axios from "axios";
import fichaDetalle from "../component/fichaDetalle";

export default (async () => {


    const modalDetalle = nxmodal(
        document.getElementById("modalDetalle")
    );

    const columnDefs = [
        { field: "departamento", headerName: "Departamento", width: 180 },
        { field: "usuario", headerName: "Usuario", width: 300 },
        { field: "tipodocumento", headerName: "Tipo de documento", width: 200 },
        { field: "numero_documento", headerName: "Documento", width: 200 },
        { field: "ingreso", headerName: "Ingreso", width: 200, filter: false },
        { field: "salida", headerName: "Salida", width: 200, filter: false },
        {
            field: "fichaid",
            headerName: "Acciones",
            width: 100,
            pinned: "right",
            filter: false,
            cellRenderer: ButtonDetalle,
            cellRendererParams: {
                clickedDetalle: async (data) => {
                    var { data } = await axios.get(`${apiURL}/ficha/${data.users_id}`);
                    document.getElementById('flicha-detalle').innerHTML = await fichaDetalle(data.response[0])
                    console.log(data)
                    modalDetalle.show()
                },
            },
        },

    ];

    const gridOptions = {
        columnDefs: columnDefs,
        getRowId: (params) => params.data.users_id,
        defaultColDef: {
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true,
        },
        pagination: true,
        loadingOverlayComponent: Loading,
        loadingOverlayComponentParams: {
            loadingMessage: "Cargando la Data...",
        },
        noRowsOverlayComponent: NoResult,
        localeText: es.ag_grid,
    };

    const gridDiv = document.querySelector("#myGrid");
    new Grid(gridDiv, gridOptions);

    gridOptions.api.setRowData([]);

    var { data } = await axios.get(`${apiURL}/ficha`);
    gridOptions.api.setRowData(data.response);


    //logaut
    document.getElementById('salir-session-login').addEventListener('click', function () {
        axios.post(`${apiURL}/auth/logout`).then((result) => {
            if (result.data.ok) {
                localStorage.removeItem('_user')
                window.location.href = '/'
            }
        }).catch((err) => {
            console.log(err)
        })
    });
})()

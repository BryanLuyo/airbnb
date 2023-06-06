import { Grid } from "ag-grid-community";
import Loading from "../ag-grid-render/loading";
import NoResult from "../ag-grid-render/noResult";
import es from "../es";
import ButtonDetalle from "../ag-grid-render/buttonDetalle";
import { nxmodal } from "../function";
import axios from "axios";
import fichaDetalle from "../component/fichaDetalle";
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

export default (async () => {

    let filterParams = {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
            var dateAsString = cellValue;
            if (dateAsString == null) return -1;
            var dateParts = dateAsString.split('/');
            var cellDate = new Date(
                Number(dateParts[2]),
                Number(dateParts[1]) - 1,
                Number(dateParts[0])
            );

            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
            }

            if (cellDate < filterLocalDateAtMidnight) {
                return -1;
            }

            if (cellDate > filterLocalDateAtMidnight) {
                return 1;
            }
            return 0;
        },
        minValidYear: 2023,
        maxValidYear: 2025,
        inRangeFloatingFilterDateFormat: 'Do MMM YYYY',
    };

    const modalDetalle = nxmodal(
        document.getElementById("modalDetalle")
    );

    const columnDefs = [
        { field: "departamento", headerName: "Departamento", width: 180, rowGroup: true, hide: false },
        { field: "usuario", headerName: "Usuario", width: 300 },
        { field: "tipodocumento", headerName: "Tipo de documento", width: 200 },
        { field: "numero_documento", headerName: "Documento", width: 200 },
        { field: "ingreso", headerName: "Ingreso", width: 200, filter: 'agDateColumnFilter', filterParams: filterParams },
        { field: "salida", headerName: "Salida", width: 200, filter: 'agDateColumnFilter', filterParams: filterParams },
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
            minWidth: 160,
            flex: 1,
        },
        pagination: true,
        loadingOverlayComponent: Loading,
        loadingOverlayComponentParams: {
            loadingMessage: "Cargando la Data...",
        },
        groupDisplayType: 'singleColumn',
        groupDefaultExpanded: 1,
        animateRows: true,
        noRowsOverlayComponent: NoResult,
        localeText: es.ag_grid,
    };

    const gridDiv = document.querySelector("#myGrid");
    new Grid(gridDiv, gridOptions, { modules: [RowGroupingModule] });
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

import { Grid } from "ag-grid-community";
import es from './../es';
import NoResult from "../ag-grid-render/noResult";
import Loading from "../ag-grid-render/loading";
import { alertMessage, form_data, nxmodal, nxtoast } from "../function";
import ButtonDestroy from "../ag-grid-render/buttonDestroy";

export default (async () => {

    const modalAddEntidad = nxmodal(
        document.getElementById("modalAddEntidad")
    );


    document.getElementById('add_entidad').addEventListener('click', () => {
        modalAddEntidad.show();
    })

    document.getElementById('btnGuardarEntidad').addEventListener('click', async () => {
        const formGuardarConcepto = document.getElementById("formEntidad");
        let formConcepto = await form_data(
            document.querySelector("#formEntidad")
        );
        if (formGuardarConcepto.checkValidity()) {
            var { data } = await axios.post(`${apiURL}/entidades`, formConcepto)
            if (data.ok) {
                modalAddEntidad.hide();
                formGuardarConcepto.reset();
                await alertMessage(
                    "success",
                    "La entidad se guardo, correctamente."
                );
                gridOptions.api.applyTransaction({ add: [data.response] });
            }
        } else {
            formGuardarConcepto.classList.add("was-validated");
        }
    });

    const deleteRow = async (resp) => {
        nxtoast({
            title: "Eliminar Entidad",
            mensaje: `Desea eliminar la entidad ${resp.nombre} ?`,
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
                        var { data } = await axios.delete(`${apiURL}/entidades/${resp.key}`);

                        console.log(data)
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
        { field: "nombre", headerName: "Nombre", width: 350 },
        { field: "usuario", headerName: "Usuario", width: 200 },
        { field: "password", headerName: "Password", width: 200 },
        {
            field: "link",
            headerName: "Link",
            width: 200,
            cellRenderer: (resp) => {
                return `<a  href="${resp.data.link}" target="_blank" style='color: blue'>${resp.data.link}</a>`
            }
        },
        {
            field: "key",
            headerName: "Acciones",
            width: 50,
            pinned: "right",
            cellRenderer: ButtonDestroy,
            cellRendererParams: {
                clickedDelete: (data) => {
                    deleteRow(data);
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
        pagination: false,
        loadingOverlayComponent: Loading,
        loadingOverlayComponentParams: {
            loadingMessage: "Cargando Conceptos...",
        },
        noRowsOverlayComponent: NoResult,
        localeText: es.ag_grid,
    };

    const gridDiv = document.querySelector("#myGrid");
    new Grid(gridDiv, gridOptions);

    gridOptions.api.setRowData([]);

    var { data } = await axios.get(`${apiURL}/entidades`);
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


})();

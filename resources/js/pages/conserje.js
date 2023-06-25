import { alertMessage, form_data, nxmodal } from "../function";
import fichas from "../functions/fichas";
import mensagge from "../functions/mensagge";
import Compressor from 'compressorjs';
import { connectionState, deleteInstance, generateQr, sendMessage } from "../functions/whatsapp-conect";
import cerrarSession from "../functions/cerrar-session";
export default (async () => {
    window._user = JSON.parse(localStorage.getItem('_user'));
    window.modalQRWhatsapp = nxmodal(
        document.getElementById("modalQRWhatsapp")
    );

    const modalDetalle = nxmodal(
        document.getElementById("modalDetalle")
    );


    document.getElementById('loading-_-').classList.add('loadingActive');
    generateQr().then((resp) => {
        document.getElementById('loading-_-').classList.remove('loadingActive');
    });
    await fichas('3', modalDetalle)

    document.getElementById('btnconectado').addEventListener('click', async () => {
        const cstate = await connectionState();
        console.log(cstate)
        if (cstate.status === 404) {
            alert("Whatsapp no conectado, volver a generar el QR.");
            return false;
        }
        if (cstate.state === 'connecting') {
            alert("Whatsapp no conectado, scanear QR");
            return false;
        }

        if (cstate.state === 'open') {
            modalQRWhatsapp.hide()
            await alertMessage(
                "success",
                "Whatsapp conectado"
            );
        }
    });

    document.getElementById('btnGenerarQr').addEventListener('click', async () => {
        document.getElementById('spinerCargando').classList.remove('hide--');
        const deInstance = await deleteInstance();
        setTimeout(() => {
            generateQr().then((resp) => {
                document.getElementById('spinerCargando').classList.add('hide--');
            });
        }, 1000)
    });

    document.getElementById('foot-modal-detalle')?.addEventListener('click', async (e) => {
        if (e.target.id === 'btnGuardarDetalleFichaAdministrador') {
            const formGuardarDetalleFicha = document.getElementById("flicha-detalle").querySelector('#formDetalleFicha');

            let formComprobante = new FormData(
                document.getElementById("flicha-detalle").querySelector('#formDetalleFicha')
            );

            if (formGuardarDetalleFicha.checkValidity()) {

                document.getElementById('loading-_-').classList.add('loadingActive');
                const cstateValidate = await connectionState();

                if (cstateValidate?.state === 'open') {
                    const fichaID__ = document.getElementById('user_key__').value;
                    var { data } = await axios.post(`${apiURL}/ficha/portero/update/adjunto/${fichaID__}`, formComprobante)
                    console.log(data)
                    if (data.ok === true) {
                        formGuardarDetalleFicha.classList.remove('was-validated')
                        modalDetalle.hide();
                        sendMessage({
                            numero: data.response.numPropietario,
                            message: mensagge(data.response)
                        })
                        document.getElementById('loading-_-').classList.remove('loadingActive');
                        await alertMessage(
                            "success",
                            "se guardo correctamente."
                        );
                    }
                } else {

                    const deInstance = await deleteInstance();
                    generateQr().then((resp) => {
                        document.getElementById('loading-_-').classList.remove('loadingActive');
                    });

                }

            } else {
                formGuardarDetalleFicha.classList.add("was-validated");
            }
        }
        e.stopPropagation()
    })

    document.getElementById("flicha-detalle").addEventListener('change', async (e) => {

        if (e.target.id === "adjunto") {
            const file = e.target.files[0];

            if (!file) {
                return;
            }

            console.log(file)

            new Compressor(file, {
                quality: 0.3,
                success(result) {
                    console.log(result)
                }
            })

        }

    })

    cerrarSession()

})()

import fichas from "../functions/fichas"
import cerrarSession from "../functions/cerrar-session"
import departamentos from "./administrador/departamentos"
import { alertMessage, form_data, nxmodal } from "../function";
import portero from "./administrador/portero";
import axios from "axios";

export default (async () => {

    window._user = JSON.parse(localStorage.getItem('_user'));
    window.agregarUnidad = false;
    window.keyUnidad = 1;
    const modalAddUnidad = nxmodal(
        document.getElementById("modalGuardarUnidad")
    );
    const modalAddPortero = nxmodal(
        document.getElementById("modalGuardarPortero")
    );



    fichas('2')

    const tabs = document.querySelectorAll('#nav-tab button')
    tabs.forEach(button => {
        button.addEventListener('click', async event => {
            let type = event.target.dataset.type;
            if (type === 'fichas') {
                fichas('2')
            } else if (type === 'departamentos') {
                await departamentos(modalAddUnidad)
            } else if (type === 'usuarios') {
                await portero(modalAddPortero)
            }


            document.querySelector('.ag-watermark').remove()
        })
    })

    cerrarSession()

    document.getElementById('btnGuardarUnidad').addEventListener('click', async (e) => {
        const formGuardarConcepto = document.getElementById("formUnidad");
        let formConcepto = await form_data(
            document.querySelector("#formUnidad")
        );
        if (formGuardarConcepto.checkValidity()) {

            if (agregarUnidad) {
                var { data } = await axios.post(`${apiURL}/unidades`, formConcepto)
            } else {
                var { data } = await axios.put(`${apiURL}/unidades/${keyUnidad}`, formConcepto);
            }

            if (data.ok) {
                modalAddUnidad.hide();
                formGuardarConcepto.reset();
                formGuardarConcepto.classList.remove('was-validated')
                await alertMessage(
                    "success",
                    "La Unidad Inmobiliaria se guardo correctamente."
                );

                document.getElementById('nav-departamentos-tab').click();
            }
        } else {
            formGuardarConcepto.classList.add("was-validated");
        }

        e.stopPropagation()
    });

    document.getElementById('btnGuardarPortero').addEventListener('click', async (e) => {

        const formGuardarConserje = document.getElementById("formPortero");
        let formConserje = await form_data(
            document.querySelector("#formPortero")
        );

        if (formGuardarConserje.checkValidity()) {
            var { data } = await axios.post(`${apiURL}/conserje`, formConserje);
            if (data.ok) {
                modalAddPortero.hide();
                formGuardarConserje.reset();
                formGuardarConserje.classList.remove('was-validated')
                await alertMessage(
                    "success",
                    "El usuario se guardo correctamente."
                );
                document.getElementById('nav-usuarios-tab').click();
            }
        } else {
            formGuardarConserje.classList.add("was-validated");
        }

        e.stopPropagation()

    })

})()

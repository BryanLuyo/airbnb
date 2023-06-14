import { nxmodal } from "../function";
import cerrarSession from "../functions/cerrar-session";
import { generateQr } from "../functions/whatsapp-conect";
export default (async () => {
    window._user = JSON.parse(localStorage.getItem('_user'));
    window.modalQRWhatsapp = nxmodal(
        document.getElementById("modalQRWhatsapp")
    );

    generateQr()





    //const createInstance = await axios.post(`${apiURLWHATSAPP}/instance/create`,{
    //   instanceName : _user.keyUser
    //})





    cerrarSession()

})()



//"status": 404,

const connectionState = async () => {
    const state = await fetch(`${apiURLWHATSAPP}/instance/connectionState/${_user.keyUser}`,{
        headers: {
            "Content-Type": "application/json",
            "apikey" : `${apiKey__}`
        },
    })

    return  await state.json()
}

const createInstance = async () => {
    const instance = await fetch(`${apiURLWHATSAPP}/instance/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey" : `${apiKey__}`
        },
        body: JSON.stringify({ instanceName : _user.keyUser })
    })

    return  await instance.json()
}

const instanceConnect = async () => {

    const connect = await fetch(`${apiURLWHATSAPP}/instance/connect/${_user.keyUser}`,{
        headers: {
            "Content-Type": "application/json",
            "apikey" : `${apiKey__}`
        }
    })

    return  await connect.json()
}

const generateQr = async () => {
    const respCreate = await createInstance();
    if ( respCreate.status === 403 ) {
       return;
    }
    const respConnect = await instanceConnect();
    if ( respConnect.state === "open" ) {
        return;
    }
    if ( respConnect.status === 404 ) {
        generateQr()
        return;
    }

    document.getElementById('qr-whatsapp').innerHTML = `<img alt="QR Whatsapp" style() src="${respConnect.base64}" style="width: 100%">`
    modalQRWhatsapp.show();
}


export { generateQr }




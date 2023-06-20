const connectionState = async () => {
    const state = await fetch(`${apiURLWHATSAPP}/instance/connectionState/${_user.keyUser}`,{
        headers: {
            "Content-Type": "application/json",
            "apikey" : `${apiKey__}`
        },
    })

    return  await state.json()
}

const deleteInstance = async () => {

    const instance = await fetch(`${apiURLWHATSAPP}/instance/logout/${_user.keyUser}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "apikey" : `${apiKey__}`
        }
    })

    return  await instance.json()
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
    const deInstance = await deleteInstance();
    document.getElementById('qr-whatsapp').innerHTML= '';
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

    document.getElementById('qr-whatsapp').innerHTML = `<center><img alt="QR Whatsapp" style() src="${respConnect.base64}" style="width: 400px"></center>`
    modalQRWhatsapp.show();
}

const sendMessage = async (options = {}) => {
    const sendTexT = await fetch(`${apiURLWHATSAPP}/message/sendText/${_user.keyUser}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey" : `${apiKey__}`
        },
        body: JSON.stringify(
            {
                number: options.numero,
                options: {
                  delay: 1200
                },
                textMessage: {
                  text: options.message
                }
            }
        )
    })

    return sendTexT;
}


export { generateQr, connectionState, deleteInstance, sendMessage }




import fichas from "../functions/fichas"
import cerrarSession from "../functions/cerrar-session"
import departamentos from "./administrador/departamentos"

export default (async () => {

    fichas('2')

    const tabs = document.querySelectorAll('#nav-tab button')
    tabs.forEach(button => {
        button.addEventListener('click', event => {
            let type = event.target.dataset.type;
            if ( type === 'fichas'){
                fichas('2')
            } else if ( type === 'departamentos' ){
                departamentos()
            } else if ( type === 'usuarios' ){
                usuarios()
            }
        })
    })

    cerrarSession()

})()

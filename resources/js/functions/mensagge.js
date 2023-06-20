import moment from "moment/moment"

export default (data) => {

return `
*****************************************
*Confirmación de llegada del Huesped ${data.user.nombre} ${data.user.apellido}*

*N° Documento :* ${data.user.numero_documento}
*Hora de Ingreso :* ${moment().format("DD/MM/YYYY HH:mm")}
`

}

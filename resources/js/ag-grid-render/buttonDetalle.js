export default class ButtonDetalle {
    init(params) {

        this.eGui = document.createElement('div')
        this.eGui.innerHTML = `
            <div class="d-flex justify-content-center">
                <i class="bi bi-binoculars-fill detalle-row color-verde"></i>
            </div>
        `
        this.btnDetalle = this.eGui.querySelector('.detalle-row')
        this.btnDetalle.onclick = () => params.clickedDetalle(params.data)

    }

    getGui() { return this.eGui }
    refresh() { return false }
    destroy() { }
}

export default class ButtonDestroy {
    init(params) {

        this.eGui = document.createElement('div')
        this.eGui.innerHTML = `
            <div class="d-flex justify-content-center">
                <i class="bi bi-trash3-fill delete-row color-verde"></i>
            </div>
        `
        this.btnDelete = this.eGui.querySelector('.delete-row')
        this.btnDelete.onclick = () => params.clickedDelete(params.data)

    }

    getGui() { return this.eGui }
    refresh() { return false }
    destroy() { }
}

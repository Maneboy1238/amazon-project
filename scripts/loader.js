export class loader {
    loader;
    constructor(cssClass) {
     this.loader = document.querySelector(`.${cssClass}`);
    }
    showLoader() {
        this.loader.style.display = 'block';
    }
    hideLoader() {
        this.loader.style.display = 'none'
    }
}
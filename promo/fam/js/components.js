import { promo } from './config.js'

class AppBrand extends HTMLElement {
  connectedCallback() {
    const icon = document.createElement('img')
    icon.src = promo.app.icon
    icon.alt = ''
    icon.width = 64
    icon.height = 64

    const name = document.createElement('span')
    name.textContent = promo.app.name

    this.replaceChildren(icon, name)
  }
}

class AppFooter extends HTMLElement {
  connectedCallback() {
    this.textContent = promo.app.footer
  }
}

customElements.define('app-brand', AppBrand)
customElements.define('app-footer', AppFooter)

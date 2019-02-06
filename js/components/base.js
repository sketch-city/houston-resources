import kebabCase from 'voca/kebab_case'

class BaseComponent {
  constructor( properties = {}, el ) {
    this.name = kebabCase(this.constructor.name)
    this.el = el || this.init()

    this.update(properties)
    this.addEventListeners()
  }

  init() {
    const element = document.createElement(this.name)
    element.className = this.name
    return element
  }

  static markup(properties) {
    return ``
  }

  addEventListeners() {

  }

  update(properties) {
    this.properties = properties
    this.render()
  }

  // removeEventListeners()

  // unmount() {
  //   this.removeEventListeners()
  //   this.el.delete()
  // }

  render() {
    this.el.innerHTML = this.constructor.markup(this.properties)
  }
}

export default BaseComponent
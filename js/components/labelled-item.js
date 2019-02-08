import BaseComponent from './base'
import isEmpty from 'lodash/isEmpty'

class LabelledItem extends BaseComponent {
  static renderItem(item) {
    return (!isEmpty(item) && item) || `n/a`
  }
  static markup({ label, item, attribute }) {
    const dataAttrs = `
data-label="${label}"
data-attribute="${attribute}"
data-item="${item}"
    `

    return `
<div
  class="labelled-item labelled-for-${attribute}"
  ${dataAttrs}>
  <span
    class="labelled-item--label"
  >${label}</span>
  <span
    class="labelled-item--item"
  >${(this || LabelledItem).renderItem(item)}</span>
</div>
    `
  }
}

export default LabelledItem
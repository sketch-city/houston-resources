import BaseComponent from './base'
class LabelledItem extends BaseComponent {
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
    ${dataAttrs}
  >${label}</span>
  <span
    class="labelled-item--item"
    ${dataAttrs}
  >${item}</span>
</div>
    `
  }
}

export default LabelledItem
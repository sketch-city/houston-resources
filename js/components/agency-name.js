import BaseComponent from './base'
class AgencyName extends BaseComponent {
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
  <h4
    class="labelled-item--item"
    ${dataAttrs}
  >${item}</h4>
</div>
    `
  }
}

export default AgencyName
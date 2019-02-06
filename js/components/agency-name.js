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
  <h6
    class="labelled-item--item"
    ${dataAttrs}
  ><strong>${item}</strong></h6>
</div>
    `
  }
}

export default AgencyName
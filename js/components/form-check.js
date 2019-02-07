import BaseComponent from './base'
import kebabCase from 'voca/kebab_case'

class FormCheck extends BaseComponent {
  static markup({ label, attribute, value }) {
    return `
<div class="form-check">
  <input
    class="form-check-input"
    type="checkbox"
    value="${value || label}"
    name="${attribute}"
    id="filter-${attribute}-${kebabCase(value || label)}"
  >
  <label
    class="form-check-label"
    for="filter-${attribute}-${kebabCase(value || label)}"
  >
    ${label}
  </label>
</div>
    `
  }
}

export default FormCheck
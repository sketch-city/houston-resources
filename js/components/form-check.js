import BaseComponent from './base'
import kebabCase from 'voca/kebab_case'

class FormCheck extends BaseComponent {
  static markup({ label, attribute, value, checked, dataValue }) {
    return `
<div class="form-check">
  <input
    class="form-check-input"
    type="checkbox"
    value="${value || label}"
    name="${attribute}"
    id="filter-${attribute}-${kebabCase(value || label)}"
    ${((checked || (value && (value === dataValue))) && 'checked')}
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
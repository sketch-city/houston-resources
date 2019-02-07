import BaseComponent from './base'

class FormGroupInput extends BaseComponent {
  static markup({ label, attribute, value = '', placeholder = '', type = 'text' }) {
    return `
<div class="form-group">
  <label for="filter-${attribute}">${label}</label>
  <input
    type="${type}"
    class="form-control"
    name="${attribute}"
    id="filter-${attribute}"
    placeholder="${placeholder}"
    value="${value}"
  >
</div>
    `
  }
}

export default FormGroupInput
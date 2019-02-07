import BaseComponent from './base'

class FormGroupSelect extends BaseComponent {
  static markup({ label, attribute, value: selectValue = '', placeholder = '', options = [] }) {
    return `
<div class="form-group">
  <label for="filter-${attribute}">${label}</label>
  <select
    name="${attribute}"
    class="form-control"
    id="filter-${attribute}">
    <option value="">${placeholder}</option>
    ${
      options.map(({ label, value }) => {
        return `
<option value="${value}" ${(selectValue === value)? 'selected' : ''}>${label}</option>
        `
      }).join('')
    }
  </select>
</div>
    `
  }
}

export default FormGroupSelect
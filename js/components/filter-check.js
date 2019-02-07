import BaseComponent from './base'

class FilterCheck extends BaseComponent {
  static markup({ label, attribute }) {
    return `
<div class="form-check">
  <input
    class="form-check-input"
    type="checkbox"
    value="Yes"
    name="${attribute}"
    id="filter-${attribute}"
  >
  <label
    class="form-check-label"
    for="filter-${attribute}"
  >
    ${label}
  </label>
</div>
    `
  }
}

export default FilterCheck
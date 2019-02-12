import { h } from 'preact'
import kebabCase from 'voca/kebab_case'


export const Checkbox = ({ label, attribute, value, checked, dataValue }) => {

  let isCheckedProp = {}

  if (checked || (value && (value === dataValue))) {
    isCheckedProp = {
      checked: 'checked'
    }
  }

  return (<input
    className="form-check-input"
    type="checkbox"
    value={ value || label }
    name={ attribute }
    id={`filter-${attribute}-${kebabCase(value || label)}`}
    {...isCheckedProp}
  />)
}

const FormCheck = ({ label, attribute, value, checked, dataValue }) => (
  <div className="form-check">
    <Checkbox
      label = { label }
      attribute = { attribute }
      value = { value }
      checked = { checked }
      dataValue = { dataValue }
    />
    <label
      className="form-check-label"
      for={`filter-${attribute}-${kebabCase(value || label)}`}
    >
      {label}
    </label>
  </div>
)

export default FormCheck
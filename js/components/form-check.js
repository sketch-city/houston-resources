import { h } from 'preact'
import kebabCase from 'voca/kebab_case'


export const Checkbox = ({ label, attribute, value, checked, dataValue, disabled }) => {

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
    disabled = { disabled }
    id={`filter-${attribute}-${kebabCase(value || label)}`}
    {...isCheckedProp}
  />)
}

const FormCheck = ({ label, attribute, value, checked, dataValue, disabled }) => (
  <div className="form-check">
    <Checkbox
      label = { label }
      attribute = { attribute }
      value = { value }
      checked = { checked }
      dataValue = { dataValue }
      disabled = { disabled }
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
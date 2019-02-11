import { h } from 'preact'
import kebabCase from 'voca/kebab_case'

const FormCheck = ({ label, attribute, value, checked, dataValue }) => {

  let isCheckedProp = {}

  if (checked || (value && (value === dataValue))) {
    isCheckedProp = {
      checked: 'checked'
    }
  }

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={ value || label }
        name={ attribute }
        id={`filter-${attribute}-${kebabCase(value || label)}`}
        {...isCheckedProp}
      />
      <label
        className="form-check-label"
        for={`filter-${attribute}-${kebabCase(value || label)}`}
      >
        {label}
      </label>
    </div>
  )
}

export default FormCheck
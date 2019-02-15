import { h } from 'preact'

const FormGroupInput = ({ label, attribute, value = '', placeholder = '', type = 'text', disabled }) => (
  <div className="form-group">
    <label for={`filter-${attribute}`}>{label}</label>
    <input
      type={ type }
      className="form-control"
      name={ attribute }
      id={`filter-${attribute}`}
      placeholder={ placeholder }
      value={ value }
      disabled = { disabled }
    />
  </div>
)

export default FormGroupInput
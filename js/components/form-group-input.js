import { h } from 'preact'

const FormGroupInput = ({ label, attribute, value = '', placeholder = '', type = 'text' }) => (
  <div className="form-group">
    <label for={`filter-${attribute}`}>{label}</label>
    <input
      type={ type }
      className="form-control"
      name={ attribute }
      id={`filter-${attribute}`}
      placeholder={ placeholder }
      value={ value }
    />
  </div>
)

export default FormGroupInput
import { h } from 'preact'

const FormGroupSelect = ({ label, attribute, value: selectValue = '', placeholder = '', options = [] }) => (
  <div className="form-group">
    <label for={`filter-${attribute}`}>{label}</label>
    <select
      name={ attribute }
      className="form-control"
      id={`filter-${attribute}`}>
      <option value="">{placeholder}</option>
      {
        options.map(({ label, value }) => {

          let optionProps = {}
          if (selectValue === value) {
            optionProps = {
              selected: 'selected'
            }
          }

          return (<option value = {value} {...optionProps}>{ label }</option>)
        })
      }
    </select>
  </div>
)

export default FormGroupSelect
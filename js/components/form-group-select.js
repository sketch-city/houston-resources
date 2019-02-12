import { h } from 'preact'

export const Select = ({ label, attribute, value: selectValue = '', placeholder = '', options = [], children }) => (
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
)


const FormGroupSelect = ({ label, attribute, value: selectValue = '', placeholder = '', options = [], children }) => (
  <div className="form-group">
    <label for={`filter-${attribute}`}>{label}</label>
    { children }

    <Select
      attribute = { attribute }
      placeholder = { placeholder }
      options = { options }
      value = { selectValue }
    />
  </div>
)

export default FormGroupSelect
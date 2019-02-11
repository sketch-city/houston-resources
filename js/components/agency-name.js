import { h } from 'preact'

const AgencyName = ({ label, item, attribute }) => {
  const dataAttrs = {
    'data-label': label,
    'data-attribute': attribute,
    'data-item': item
  }

  return (<div
    className={`labelled-item labelled-for-${attribute}`}
    {...dataAttrs}>
    <span className="labelled-item--label">
      {label}
    </span>
    <h6 className="labelled-item--item">
      <strong>{item}</strong>
    </h6>
  </div>)
}

export default AgencyName
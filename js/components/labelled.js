import isEmpty from 'lodash/isEmpty'
import { h } from 'preact'

const LabelledItem = ({ label, item, attribute, groups, children }) => {
  const dataAttrs = {
    'data-label': label,
    'data-attribute': attribute,
    'data-item': item,
    'data-groups': (groups || []).join(', ')
  }

  return (<div
    className={`labelled-item labelled-for-${attribute}`}
    {...dataAttrs}>
    {
      label && (<span className="labelled-item--label">
        {label}
      </span>)
    }
    <span className="labelled-item--item">
      {children}
    </span>
  </div>)
}

export default LabelledItem
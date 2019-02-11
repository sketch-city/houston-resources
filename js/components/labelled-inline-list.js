import isEmpty from 'lodash/isEmpty'
import { h } from 'preact'

const LabelledInlineList = ({ label, item, attribute, groups }) => {
  const dataAttrs = {
    'data-label': label,
    'data-attribute': attribute,
    'data-item': item,
    'data-groups': (groups || []).join(', ')
  }

  return (<div
    className={`labelled-item labelled-for-${attribute}`}
    {...dataAttrs}>
    <span className="labelled-item--label">
      {label}
    </span>
    <span className="labelled-item--item">
      {(!isEmpty(item) && item.join(', ')) || 'n/a'}
    </span>
  </div>)
}


export default LabelledInlineList
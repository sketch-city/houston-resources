import isEmpty from 'lodash/isEmpty'
import { h } from 'preact'
import Labelled from './labelled'

const LabelledInlineList = ({ label, item, attribute, groups }) => {
  return (
    <Labelled
      label={label}
      item={item}
      attribute={attribute}
      groups={groups}
    >
      {(!isEmpty(item) && item.join(', ')) || 'n/a'}
    </Labelled>)
}

export default LabelledInlineList
import isEmpty from 'lodash/isEmpty'
import { h } from 'preact'
import Labelled from './labelled'

const LabelledLink = ({ label, item, attribute, groups, children }) => {
  return (
    <Labelled
      label={label}
      item={item}
      attribute={attribute}
      groups={groups}
    >
      {(!isEmpty(item) && (
        <a href={item} target="_blank">{( children || 'Information Here' )}</a>
      )) || 'n/a'}
    </Labelled>)
}

export default LabelledLink
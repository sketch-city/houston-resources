import LabelledItem from './labelled-item'
import { h } from 'preact'
import isEmpty from 'lodash/isEmpty'

const AgencyPhone = ({ label, item, attribute }) => {
  if (isEmpty(item)) {
    return
  }

  return (<div>
    {item.map(LabelledItem)}
  </div>)
}

export default AgencyPhone
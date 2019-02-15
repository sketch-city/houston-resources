import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import { h } from 'preact'

import { isLink } from '../utils'
import Labelled from './labelled'
import LabelledLink from './labelled-link'

const LabelledItem = ({ label, item, attribute, groups, children }) => {

	if (isLink(item)) {
		return (
	    <LabelledLink
	      label= { label }
	      item= { item }
	      attribute = { attribute }
	      groups = { groups }
	    >
	      { (!isEmpty(children) && children) || item }
	    </LabelledLink>
		)
	}

  return (
    <Labelled
      label={label}
      item={item}
      attribute={attribute}
      groups={groups}
    >
      { (!isEmpty(children) && children) || (!isEmpty(item) && (isArray(item) && item.join(', ') || (isString(item) && item.replace(/\n/g, ', ').replace(':,', ':')) || item )) || 'n/a'}
    </Labelled>)
}

export default LabelledItem
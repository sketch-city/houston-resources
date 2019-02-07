import { buildURL } from '../utils'
import BaseComponent from './base'
import LabelledItem from './labelled-item'

import AgencyPhone from './agency-phone'
import Name from './name'
import AgencyName from './agency-name'
import LabelledInlineList from './labelled-inline-list'

const customRenders = {
  'agency-phone': AgencyPhone,
  'name': Name,
  'agency-name': AgencyName,
  'language-arr': LabelledInlineList,
}

function renderProperty(property) {
  const Component = customRenders[property.attribute] || LabelledItem

  return Component.markup(property)
}

class SearchResultItem extends BaseComponent {
  static markup(properties) {

    return `
<a href="${buildURL('/program.html')}?id=${properties.identifiers.find(({attribute}) => attribute == 'id').item}" class="list-group-item list-group-item-action">
  ${ properties.listing.map(renderProperty).join('') }
</a>
    `
  }
}

export default SearchResultItem
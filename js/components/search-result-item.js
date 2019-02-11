import { buildURL } from '../utils'
import { h } from 'preact'

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

  return <Component {...property}/>
}

const SearchResultItem = ( properties ) => (
  <a href={`${buildURL('/program.html')}?id=${properties.identifiers.find(({attribute}) => attribute == 'id').item}`}
    className="list-group-item list-group-item-action"
    data-jets={properties.searchable}>
    {properties.listing.map(renderProperty)}
  </a>
)

export default SearchResultItem
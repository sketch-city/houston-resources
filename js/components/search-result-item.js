import { buildURL } from '../utils'
import { h } from 'preact'

import LabelledItem from './labelled-item'
import AgencyPhone from './agency-phone'
import Name from './name'
import AgencyName from './agency-name'

const customRenders = {
  'agency-phone': AgencyPhone,
  'name': Name,
  'agency-name': AgencyName,
}

function renderProperty(property) {
  const Component = customRenders[property.attribute] || LabelledItem

  return <Component {...property}/>
}

const SearchResultItem = ( properties ) => (
  <a
    href={`${buildURL('/program.html')}?id=${properties.identifiers.find(({attribute}) => attribute == 'id').item}`}
    className="list-group-item list-group-item-action"
    data-coverage={ properties.coverage.map( (data) => data.item ).join(' ') }
    data-jets={ properties.searchable }>
    { properties.listing.map(renderProperty) }
  </a>
)

export default SearchResultItem
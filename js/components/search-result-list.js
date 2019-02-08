import BaseComponent from './base'
import SearchResultItem from './search-result-item'
import isEmpty from 'lodash/isEmpty'

function hasServiceCheck(serviceChecks, checks) {
  return checks.find((check) => {
      return (serviceChecks || '').includes(check.label) && !isEmpty(check.item)
    })? true : false
}

function hasMatching(value, checks) {
  return checks.find((check) => (check.item.includes(value)))? true : false
}

function filterData(state) {
  const filters = state.get('filters')
  const items = state.get('items')

  return items.filter((item) => {
    const hasServices = isEmpty(filters['service-checks']) || hasServiceCheck(filters['service-checks'], item['service-checks'])
    const isServiceType = isEmpty(filters['service-type']) || hasMatching(filters['service-type'], item['service-type'])
    const hasLanguage = isEmpty(filters['languages']) || hasMatching(filters['languages'], item['language-support'])

    return hasServices && isServiceType && hasLanguage
  })
}

class SearchResultList extends BaseComponent {
  static markup( properties ) {
    const items = filterData(properties)
    return `
<span class="badge badge-secondary">${items.length} Results</span>
<div class="list-group minimize">
    ${
      items
        .map(item => SearchResultItem.markup(item) )
        .join('')
    }
</div>
      `
  }
}

export default SearchResultList

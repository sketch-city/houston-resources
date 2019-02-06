import BaseComponent from './base'
import SearchResultItem from './search-result-item'

class SearchResultList extends BaseComponent {
  static markup( properties ) {
    const { items } = properties
    return `
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

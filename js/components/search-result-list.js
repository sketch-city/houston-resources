import { h } from 'preact'
import SearchResultItem from './search-result-item'
import { connect } from 'preact-redux'

export const SearchResultList = ({ results }) => {
  return (<div className="list-group minimize">
    {results.map(SearchResultItem)}
  </div>)
}

export default connect((state) => ({
  results: ((state && state.get('filteredResults')) || [])
}))( SearchResultList )

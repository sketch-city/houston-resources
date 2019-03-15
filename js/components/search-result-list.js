import { h } from 'preact'
import SearchResultItem from './search-result-item'
import { connect } from 'preact-redux'

export const SearchResultList = ({ results, isLoading }) => {
  if (isLoading) {
    return (<div>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <span className="pl-2">Loading matching programs...</span>
    </div>)
  }

  return (<div className="list-group minimize">
    {results.map((item) => (
      <SearchResultItem
        {...item}
        key={item.identifiers.find(({attribute}) => attribute == 'id').item}
      />
    ))}
  </div>)
}

export default connect((state) => ({
  results: state && state.get('filteredResults') || [],
  isLoading: state && state.get('isResultsLoading'),
}))( SearchResultList )

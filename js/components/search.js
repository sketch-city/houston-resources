import { h } from 'preact'
import SearchResultList from './search-result-list'
import SearchFilters from './search-filters'

export default () => {
  return (<div className="container">
    <div className="row">
      <div className="col-8" id="search-result-container">
        <SearchResultList/>
      </div>
      <div className="col" id="search-filters-container">
        <SearchFilters/>
      </div>
    </div>
  </div>)
}
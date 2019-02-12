import { h } from 'preact'
import SearchResultList from './search-result-list'
import SearchFilters from './search-filters'

import { buildURL } from '../utils'

export default () => {
  return (<div className="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href={ buildURL('/index.html') }>Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Search</li>
      </ol>
    </nav>
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
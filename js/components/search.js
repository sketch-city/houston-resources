import { h } from 'preact'
import SearchResultList from './search-result-list'
import SearchFilters from './search-filters'
import Layout from './layout'

import { buildURL } from '../utils'

export default () => {
  return (
    <Layout crumbs={[
        {
          label: 'Home',
          link: buildURL(`${location.protocol}//${location.host}/index.html`)
        }, {
          label: 'Search',
        }
      ]}>
      <div className="container">
        <div className="row">
          <div className="col-8" id="search-result-container">
            <SearchResultList/>
          </div>
          <div className="col" id="search-filters-container">
            <SearchFilters/>
          </div>
        </div>
      </div>
    </Layout>
  )
}
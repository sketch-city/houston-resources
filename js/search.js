import { h, render } from 'preact'
import { Provider, connect } from 'preact-redux'

import pickBy from 'lodash/pickBy'
import isEmpty from 'lodash/isEmpty'

import { loadAllItems, mapFromMapToObject, buildURL, fixNavURL } from './utils'

import searchFilterStore from './search-filter-store'

import Search from './components/search'

const container = document.getElementById('container')

loadAllItems()
  .then(function(items) {
    searchFilterStore.dispatch({
      type: 'ITEMS_CHANGE',
      items,
    })
  })
  .then(function() {
    searchFilterStore.dispatch({
      type: 'RESULTS_LOADING_STATE',
      isLoading: false,
    })
  })
  .catch(function() {
    searchFilterStore.dispatch({
      type: 'RESULTS_LOADING_STATE',
      isLoading: false,
      isError: true,
    })
  })

function handlePageLoaded() {
  const params = new URLSearchParams(location.search)
  const filters = mapFromMapToObject(params)
  searchFilterStore.dispatch({ type: 'FILTERS_LOAD' , filters })
}

searchFilterStore.subscribe(() => {
  const filters = searchFilterStore.getState().get('filters')
  const params = new URLSearchParams(pickBy(filters, (value) => (!isEmpty(value))))

  const queryString = params.toString() && ('?' + params.toString())

  window.history.replaceState(null, null, `${ buildURL('/search.html') }${ queryString }`)
})

document.addEventListener('DOMContentLoaded', handlePageLoaded)

const ConnectedSearch = () => (
  <Provider store={ searchFilterStore }>
    <Search/>
  </Provider>
)

require('preact/devtools')

render(<ConnectedSearch/>, container)
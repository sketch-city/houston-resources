import { h, render } from 'preact'
import { Provider, connect } from 'preact-redux'

import pickBy from 'lodash/pickBy'
import isEmpty from 'lodash/isEmpty'

import { loadAllItems, mapFromMapToObject, buildURL, fixNavURL } from './utils'

import searchFilterStore from './search-filter-store'

import Search from './components/search'

const container = document.getElementById('container')

fixNavURL()
loadAllItems()

function handlePageLoaded() {
  const params = new URLSearchParams(location.search)
  const filters = mapFromMapToObject(params)
  searchFilterStore.dispatch({ type: 'FILTERS_CHANGE' , filters })
}

searchFilterStore.subscribe(() => {
  const filters = searchFilterStore.getState().get('filters')
  const params = new URLSearchParams(pickBy(filters, (value) => (!isEmpty(value))))

  const queryString = params.toString() && ('?' + params.toString())

  window.history.replaceState(null, null, `${ buildURL('/search.html') }${ queryString }`)
})

document.addEventListener('DOMContentLoaded', handlePageLoaded)

const ConnectedSearchMain = () => (
  <Provider store={ searchFilterStore }>
    <Search/>
  </Provider>
)

render(<ConnectedSearchMain/>, container)
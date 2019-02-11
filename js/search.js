import { h, render } from 'preact'
import { Provider, connect } from 'preact-redux'

import { loadAllItems, mapFromMapToObject } from './utils'

import searchFilterStore from './search-filter-store'

import Search from './components/search'

const container = document.getElementById('container')

loadAllItems()

function handlePageLoaded() {
  const params = new URLSearchParams(location.search)
  const filters = mapFromMapToObject(params)
  searchFilterStore.dispatch({ type: 'FILTERS_CHANGE' , filters })
}

document.addEventListener('DOMContentLoaded', handlePageLoaded)

const ConnectedSearchMain = () => (
  <Provider store={ searchFilterStore }>
    <Search/>
  </Provider>
)

render(<ConnectedSearchMain/>, container)
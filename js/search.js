import { searchURL } from './constants'
import axios from 'axios'

import { handleDataFromAPIToView } from './utils'
import searchFilterStore, {initialState} from './search-filter-store'

import SearchResultList from './components/search-result-list'
import SearchFilters from './components/search-filters'

const searchResultContainer = document.getElementById('search-result-container')
const searchFiltersContainer = document.getElementById('search-filters-container')

const searchResultList = new SearchResultList(initialState, searchResultContainer)
const searchFilters = new SearchFilters(initialState, searchFiltersContainer)

axios.get(`${searchURL}${(location.search || '')}`)
  .then(({data}) => {
    const dataView = data.map(handleDataFromAPIToView)
    searchFilterStore.dispatch({ type: 'ITEMS_CHANGE', items: dataView })
  })

searchFilterStore.subscribe(() => {
  searchResultList.update( searchFilterStore.getState() )
  // searchFilters.update( searchFilterStore.getState() )
})

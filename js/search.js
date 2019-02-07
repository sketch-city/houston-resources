import { searchURL } from './constants'
import axios from 'axios'

import { handleDataFromAPIToView } from './utils'

import SearchResultList from './components/search-result-list'
import SearchFilters from './components/search-filters'

const searchResultContainer = document.getElementById('search-result-container')
const searchFiltersContainer = document.getElementById('search-filters-container')

const searchResultList = new SearchResultList({ items: [] }, searchResultContainer)
const searchFilters = new SearchFilters({}, searchFiltersContainer)

axios.get(`${searchURL}${location.search}`)
  .then(({data}) => {
    const dataView = data.map(handleDataFromAPIToView)
    searchResultList.update({ items: dataView })
  })
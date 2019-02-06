import { searchURL } from './constants'
import axios from 'axios'

import { handleDataFromAPIToView } from './utils'

import SearchResultList from './components/search-result-list'

const searchResultContainer = document.getElementById('search-result-container')
const searchResultList = new SearchResultList({ items: [] }, searchResultContainer)

axios.get(`${searchURL}${location.search}`)
  .then(({data}) => {
    const hello = data.map(handleDataFromAPIToView)
    window.hello = hello
    // const listings = hello.map( ({ listing }) => {
    //   listing
    // } )
    searchResultList.update({ items: hello })
  })
import {
  googleMapsKey,
} from './constants'

import isArray from 'lodash/isArray'

import { searchURL } from './constants'
import axios from 'axios'

import { handleDataFromAPIToView } from './data-mapper'
import searchFilterStore, { initialState } from './search-filter-store'

// kinda clunky, but it'll do for now
function buildURL(pathnameWithHTML) {
  const hostnameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/
  if (location.host.search(hostnameRegex) === 0) {
    return `/${location.pathname.split('/')[1]}/${pathnameWithHTML.replace(/(^\/)/, '').replace('.html', '')}`
  }
  return pathnameWithHTML
}

function mapFromMapToObject(map) {
  const dataAsObject = {}
  map.forEach((value, key) => {
    if (dataAsObject[key]) {
      if (!isArray(dataAsObject[key])) {
        dataAsObject[key] = [dataAsObject[key]]
      }
      dataAsObject[key].push(value)
    } else {
      dataAsObject[key] = value
    }
  })
  return dataAsObject
}


function getDataFromForm(formElement) {
  const data = new FormData(formElement)
  return mapFromMapToObject(data)
}

function loadGoogleMapsAPI(mapAPILoadedHandler) {

  const mapsSrc = '//maps.googleapis.com/maps/api/js'
  const mapAPIEl = document.createElement('script')
  mapAPIEl.src = `${mapsSrc}?key=${googleMapsKey}`

  const isLoaded = document.querySelector(`script[src^="${mapsSrc}"]`)? true : false

  if (isLoaded) {
    return
  }

  mapAPIEl.addEventListener('load', mapAPILoadedHandler)

  document.body.appendChild(mapAPIEl)
}

function loadAllItems() {
  return axios.get(`${searchURL}`)
    .then(({data}) => {
      const dataView = data.map(handleDataFromAPIToView)
      searchFilterStore.dispatch({ type: 'ITEMS_CHANGE', items: dataView })
    })
}

export {
  buildURL,
  getDataFromForm,
  loadGoogleMapsAPI,
  loadAllItems,
  mapFromMapToObject,
}
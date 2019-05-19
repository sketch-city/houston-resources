import {
  googleMapsKey,
} from './constants'

import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import includes from 'lodash/includes'
import isObject from 'lodash/isObject'
import compact from 'lodash/compact'
import negate from 'lodash/negate'

import { searchURL } from './constants'
import axios from 'axios'

import { handleDataFromAPIToView } from './data-mapper'
import searchFilterStore, { initialState } from './search-filter-store'

const GOOGLE_ANALYTICS_ID = 'UA-45602300-1'

function countGroupCompleteness(data, groupName = 'immigrant-accessibility') {
  return data.filter(({item}) => !(isEmpty(item))).length
}

// kinda clunky, but it'll do for now
function buildURL(pathnameWithHTML) {
  const hostnameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/
  if (location.host.search(hostnameRegex) === 0) {
    return `${pathnameWithHTML.replace(/(^\/)/, '').replace('.html', '').replace(/index$/, '')}`
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
    } else if (includes(value, ',')) {
      dataAsObject[key] = value.split(',')
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

const mapsSrc = '//maps.googleapis.com/maps/api/js'

function isGoogleMapsAPILoaded() {
  return document.querySelector(`script[src^="${mapsSrc}"]`)? true : false
}

function loadGoogleMapsAPI(mapAPILoadedHandler) {
  const mapAPIEl = document.createElement('script')
  mapAPIEl.src = `${mapsSrc}?key=${googleMapsKey}`

  if (isGoogleMapsAPILoaded()) {
    return
  }

  mapAPIEl.addEventListener('load', mapAPILoadedHandler)

  document.body.appendChild(mapAPIEl)
}

function loadAllItems() {
  return axios.get(`${searchURL}`)
    .then((response) => {
      return response.data.map(handleDataFromAPIToView)
    })
}

function isLink(string) {
  const isLinkRegex = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
  if (!isString(string)) { return }

  return string.match(isLinkRegex)
}


function hasValues(data) {
  return data.find(({item}) => (
    !isEmpty(item) && !(isObject(item) && !hasValuesAsObject(item))
  ))
}

function hasValuesAsObject(data) {
  return !isEmpty(compact(Object.values(data).map(negate(isEmpty))))
}

export {
  GOOGLE_ANALYTICS_ID,
  countGroupCompleteness,
  buildURL,
  getDataFromForm,
  loadGoogleMapsAPI,
  loadAllItems,
  mapFromMapToObject,
  isGoogleMapsAPILoaded,
  isLink,
  hasValues,
  hasValuesAsObject,
}
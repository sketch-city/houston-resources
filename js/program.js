import { h, render } from 'preact'
import { Provider } from 'preact-redux'
import { searchURL } from './constants'
import axios from 'axios'

import { loadGoogleMapsAPI } from './utils'
import { handleDataFromAPIToView } from './data-mapper'

import searchFilterStore, { initialState } from './search-filter-store'

import ProgramDetail from './components/program-detail'

let mapObject

const programResultContainer = document.getElementById('program-result-container')

loadGoogleMapsAPI(initMap)

axios.get(`${searchURL}${(location.search || '')}`)
  .then(({ data }) => {
    searchFilterStore.dispatch({ type: 'PROGRAM_VIEW', program: { data: handleDataFromAPIToView(data[0])} })
  })

function updateMap(map, program) {
  if (program.data.location.find(({ attribute }) => attribute === 'latitude')) {
    const programLatLng = {
      lat: parseFloat(program.data.location.find(({ attribute }) => attribute === 'latitude').item),
      lng: parseFloat(program.data.location.find(({ attribute }) => attribute === 'longitude').item),
    }
    const marker = new google.maps.Marker({
      position: programLatLng,
      map,
    })

    map.panTo(programLatLng)
  }
}

searchFilterStore.subscribe(() => {
  const programState = searchFilterStore.getState().get('program')

  if (!mapObject) { return }

  updateMap(mapObject, programState)
})

function initMap() {
  const houston = { lat: 29.76, lng: -95.37 }
  const map = new google.maps.Map(
      document.getElementById('map'), {zoom: 10, center: houston})

  if (searchFilterStore.getState()) {
    const programState = searchFilterStore.getState().get('program')
    updateMap(map, programState)
  }

  mapObject = map

  return map
}

const Program = () => (
  <Provider store={ searchFilterStore }>
    <ProgramDetail/>
  </Provider>
)

render(<Program/>, programResultContainer)
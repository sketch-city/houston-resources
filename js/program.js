import { searchURL } from './constants'
import axios from 'axios'

import { handleDataFromAPIToView } from './utils'
import searchFilterStore, {initialState} from './search-filter-store'

import ProgramDetail from './components/program-detail'

const programResultContainer = document.getElementById('program-result-container')
const programDetail = new ProgramDetail(initialState.get('program').toJS(), programResultContainer)
document.addEventListener('click', (clickEvent) => {
  if (clickEvent.target.matches('#toggle-missing')) {
    if (programDetail.el.classList.contains('minimize')) {
      programDetail.el.classList.remove('minimize')
    } else {
      programDetail.el.classList.add('minimize')
    }
  }
})

axios.get(`${searchURL}${(location.search || '')}`)
  .then(({data}) => {
    searchFilterStore.dispatch({ type: 'PROGRAM_VIEW', program: { data: handleDataFromAPIToView(data[0])} })
  })

function updateMap(program) {
  if (program.data.location.find(({ attribute }) => attribute === 'latitude')) {
    const programLatLng = {
      lat: parseFloat(program.data.location.find(({ attribute }) => attribute === 'latitude').item),
      lng: parseFloat(program.data.location.find(({ attribute }) => attribute === 'longitude').item),
    }
    const marker = new google.maps.Marker({
      position: programLatLng,
      map: mapObject,
    })

    mapObject.panTo(programLatLng)
  }
}

searchFilterStore.subscribe(() => {
  const programState = searchFilterStore.getState().get('program')

  programDetail.update(programState)
  updateMap(programState)
})

window.mapped = false
function initMap() {
  window.mapped = true
  const houston = { lat: 29.76, lng: -95.37 }
  const map = new google.maps.Map(
      document.getElementById('map'), {zoom: 13, center: houston})

  return map
}

const mapAPIEl = document.createElement('script')
mapAPIEl.addEventListener('load', function (loadEvent) {
  if (mapped) {return}
  window.mapObject = initMap()
})

mapAPIEl.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDI2nDNT3z_DK6FUQhPyZ0z0ACaTXquTlw'

document.body.appendChild(mapAPIEl)

// function otherMap() {

// }

// window.otherMap = otherMap
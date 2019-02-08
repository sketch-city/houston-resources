import { searchURL } from './constants'
import axios from 'axios'

import { handleDataFromAPIToView } from './utils'

import ProgramDetail from './components/program-detail'

const programResultContainer = document.getElementById('program-result-container')
const programDetail = new ProgramDetail({ data: {} }, programResultContainer)

axios.get(`${searchURL}${(location.search || '')}`)
  .then(({data}) => {
    programDetail.update({ data: handleDataFromAPIToView(data[0])})
    document.addEventListener('click', (clickEvent) => {
      if (clickEvent.target.matches('#toggle-missing')) {
        if (programDetail.el.classList.contains('minimize')) {
          programDetail.el.classList.remove('minimize')
        } else {
          programDetail.el.classList.add('minimize')
        }
      }
    })
  })

// function otherMap() {

// }

// window.otherMap = otherMap
import { searchURL } from './constants'
import axios from 'axios'

import { handleDataFromAPIToView } from './utils'

import ProgramDetail from './components/program-detail'

const programResultContainer = document.getElementById('program-result-container')
const programDetail = new ProgramDetail({ data: {} }, programResultContainer)

axios.get(`${searchURL}?id=AVepnktME939hynCFK2AWQAlaEc`)
  .then(({data}) => {
    programDetail.update({ data: handleDataFromAPIToView(data)[0] })
  })
import { createStore } from 'redux'

const initialState = {
  items: [],
  filters: {},
}

function deepCopy(info) {
  return JSON.parse(JSON.stringify(info))
}

function filterData(info, filter) {
  
}

function filterReducer(currentState = initialState, action) {
  let upcomingState = deepCopy(currentState)



}

const store = createStore(filterReducer)

export default store
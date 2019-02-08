import { createStore } from 'redux'
import { fromJS } from 'immutable'

export const initialState = fromJS({
  items: [],
  filters: {},
  program: {
    data: {}
  },
})

function filterReducer(currentState = initialState, action) {

  switch (action.type) {
    case 'FILTERS_CHANGE':
      return currentState.set('filters', action.filters)
      break
    case 'ITEMS_CHANGE':
      return currentState.set('items', action.items)
      break
    case 'PROGRAM_VIEW':
      return currentState.set('program', action.program)
      break
  }
}

const store = createStore(filterReducer)

store.subscribe(() => {
  window.HEY = store.getState()
})

export default store
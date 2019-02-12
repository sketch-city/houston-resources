import { createStore } from 'redux'
import { fromJS, Map } from 'immutable'

import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import includes from 'lodash/includes'
import intersection from 'lodash/intersection'
import difference from 'lodash/difference'

import { countGroupCompleteness } from './utils'

export const initialState = fromJS({
  items: [],
  filters: {},
  program: {
    data: {}
  },
  filteredResults: [],
  programsByAgency: {},
})

function hasServiceCheck(serviceChecks, checks) {
  return checks.find((check) => {
      return (
        includes((serviceChecks || ''), check.label) &&
        !(
          (!isEmpty(check.item) && check.item === 'No') ||
          check.item === false
        )
      )
    })? true : false
}

function hasMatching(value, checks) {
  return checks.find((check) => includes(check.item, value))
}

function hasOther(allValues, checks) {
  return checks.find((check) => !isEmpty(difference(check.item, allValues)))
}

function filterData({ filters, items }) {
  return items.filter((item) => {
    const hasServices = isEmpty(filters['service-checks']) || hasServiceCheck(filters['service-checks'], item['service-checks'])
    const isServiceType = isEmpty(filters['service-type']) || hasMatching(filters['service-type'], item['service-type'])
    const hasLanguage = isEmpty(filters['languages']) || (
      ((filters['languages'] !== 'Other')  && hasMatching(filters['languages'], item['language-support'])) ||
      hasOther(
        ['English',
          'Spanish',
          'Vietnamese',
          'Chinese',
          'Arabic',
          'French'
        ], item['language-support'])
    )
    const passesCompleteness = isEmpty(filters['immigrant-accessibility']) || (countGroupCompleteness(item['immigrant-accessibility']) > parseInt(filters['immigrant-accessibility']))
    const isAppointmentRequired = isEmpty(filters['appointment-required']) || hasMatching(filters['appointment-required'], item['appointment-required'])
    const hasZip = isEmpty(filters['zip-code']) || hasMatching(filters['zip-code'], item['coverage'])


    return hasServices && isServiceType && hasLanguage && passesCompleteness && isAppointmentRequired && hasZip
  })
}

function filterReducer(currentState = initialState, action) {
  switch (action.type) {
    case 'FILTERS_CHANGE':
      return currentState
              .set('filters', action.filters)
              .set('filteredResults', filterData({
                                        filters: action.filters,
                                        items: currentState.get('items'),
                                      })
              )
      break
    case 'ITEMS_CHANGE':
      return currentState
              .set('items', action.items)
              .set('filteredResults', filterData({
                                        items: action.items,
                                        filters: currentState.get('filters'),
                                      })
              )
      break
    case 'PROGRAM_VIEW':
      return currentState
              .set('program', action.program)
      break
    case 'PROGRAMS_BY_AGENCY_VIEW':
      return currentState
              .mergeDeep({
                programsByAgency: action.programsByAgency,
              })
      break
  }
}

const store = createStore(filterReducer)

store.subscribe(() => {
  window.HEY = store.getState()
})

export default store
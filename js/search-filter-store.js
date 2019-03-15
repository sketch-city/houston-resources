import { createStore } from 'redux'
import { fromJS } from 'immutable'

import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import includes from 'lodash/includes'
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
  isResultsLoading: true,
  isLoaded: false,
  isError: false,
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
    const isIncomeEligible = isEmpty(filters['income-eligibility']) || (parseInt(item['eligibility'].find(({ attribute }) => (attribute === 'income-eligibility')).item.replace('%', '') || 0) < parseInt(filters['income-eligibility']))
    const isImmigrationStatus = isEmpty(filters[['immigration-status']]) || (
      (
        (filters['immigration-status'] === 'Other') &&
        (!isEqual(
          ['U.S. Citizen'],
          item['eligibility'].find(({ attribute }) => (attribute === 'immigration-status')).item
        ))
      ) ||
      isEqual(
        [filters['immigration-status']],
        item['eligibility'].find(({ attribute }) => (attribute === 'immigration-status')).item
      )
    )

    return hasServices && isServiceType && hasLanguage && passesCompleteness && isAppointmentRequired && hasZip && isIncomeEligible && isImmigrationStatus && isImmigrationStatus
  })
}

function filterReducer(currentState = initialState, action) {
  switch (action.type) {
    case 'FILTERS_LOAD':
      return currentState
            .set('isLoaded', true)
            .set('filters', action.filters)
            .set('filteredResults', filterData({
                                      filters: action.filters,
                                      items: currentState.get('items'),
                                    })
            )
      break
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

    case 'RESULTS_LOADING_STATE':
      return currentState
              .set('isResultsLoading', action.isLoading)
              .set('isError', action.isError || false)
      break
  }
}

const store = createStore(
  filterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
)

store.subscribe(() => {
  window.HEY = store.getState()
})

export default store
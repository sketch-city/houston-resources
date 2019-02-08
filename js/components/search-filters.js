import kebabCase from 'voca/kebab_case'

import { groupedSettings, getDataFromForm } from '../utils'
import { categories } from '../constants'

import searchFilterStore from '../search-filter-store'

import BaseComponent from './base'
import FormCheck from './form-check'
import FormGroupInput from './form-group-input'
import FormGroupSelect from './form-group-select'

class SearchFilters extends BaseComponent {
  addEventListeners() {
    const context = this
    const filters = getDataFromForm(context.el.children[0])
    searchFilterStore.dispatch({ type: 'FILTERS_CHANGE' , filters })
    context.el.children[0]
      .addEventListener('submit', function (submitEvent) {
        submitEvent.preventDefault()
        context.handleChange.call(this, submitEvent)
      })
    context.el.children[0]
      .addEventListener('change', context.handleChange)
  }
  handleChange(formEvent) {
    const filters = getDataFromForm(this)
    searchFilterStore.dispatch({ type: 'FILTERS_CHANGE' , filters })
  }
  static markup( properties ) {
    const filters = properties.get('filters')
    return `
<form class="card border-success" id="search-filters--form">
  <h5 class="card-header bg-transparent border-success"><strong>Filter</strong></h5>
  <div class="card-body search-filters--filters">
    <div class="form-group">
      ${
        groupedSettings['service-checks']
          .map(item => FormCheck.markup(
            Object.assign({}, item, {
              attribute: 'service-checks',
              checked: (filters['service-checks'] || '').includes(item.label)
            }))
          )
          .join('')
      }
    </div>
    <hr>
    ${
      FormGroupInput.markup({
        attribute: 'keywords',
        label: 'Keywords',
        placeholder: 'Search...',
        type: 'search',
      })
    }
    ${
      FormGroupSelect.markup({
        attribute: 'service-type',
        label: 'Service Type',
        placeholder: 'Select a Service Type',
        options: categories.map(({ name }) => ({ value: name.toLowerCase(), label: name })),
      })
    }
    <hr>
    ${
      FormGroupInput.markup({
        attribute: 'zip-code',
        label: 'Zip Code',
        placeholder: '77000',
      })
    }
    ${
      FormGroupSelect.markup({
        attribute: 'distance',
        label: 'Radius',
        placeholder: 'Select a Distance',
        options: [5, 10, 25, 50, 100].map(distance => ({ value: distance, label: `${distance} miles` })),
      })
    }
    <hr>
    ${
      FormGroupSelect.markup({
        attribute: 'income-eligibility',
        label: 'Income Eligibility',
        placeholder: 'Select an AMI',
        options: [80, 110, 140].map(percent => ({ value: percent, label: `${percent}%` })),
      })
    }
    ${
      FormGroupSelect.markup({
        attribute: 'immigration-status',
        label: 'Immigration Status',
        placeholder: 'Select an Immigration Status',
        options: ['US Citizen', 'Other'].map(label => ({ value: label, label })),
      })
    }
    ${
      FormGroupSelect.markup({
        attribute: 'immigrant-accessibility',
        label: 'Immigrant Accessibility Profile',
        placeholder: 'Select Completeness',
        options: [0,1,2,3,4,5].map(completeness => ({ value: completeness, label: `${completeness}+` })),
      })
    }
    ${
      FormGroupSelect.markup({
        attribute: 'languages',
        label: 'Program/Service Languages',
        placeholder: 'Select a Language',
        options: ['English', 'Spanish', 'Vietnamese', 'Chinese', 'Arabic', 'French', 'Other']
          .map(label => ({ value: label, label })),
      })
    }
    <hr>
    <div class="form-group">
      <p>Open</p>
      ${FormCheck.markup({ attribute: 'open', label: 'Now' })}
      <div class="form-inline">
        <input class="form-check-input"
          type="checkbox"
          value="filter-schedule"
          id="filter-schedule"
          name="open"
        >
        <label class="form-check-label" for="filter-schedule">
          <!-- <span class="form-control-label mr-2">Open at</span> -->
          <input type="time" name="filter-schedule-time" class="form-control">
          <select class="form-control" name="filter-schedule-day">
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
        </label>
      </div>
    </div>
    <div class="form-group">
      <p>Requires Appointment</p>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          value="Yes"
          id="Appointment-Yes"
          name="requires-appointment"
        >
        <label class="form-check-label" for="Appointment-Yes">
          Yes
        </label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          value="No"
          id="Appointment-No"
          name="requires-appointment"
        >
        <label class="form-check-label" for="Appointment-No">
          No
        </label>
      </div>
    </div>
  </div>
  <div class="card-footer bg-transparent border-success">
    <input type="submit" class="btn btn-success" value="Filter"/>
  </div>
</form>
      `
  }
}

export default SearchFilters
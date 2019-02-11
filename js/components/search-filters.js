import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import kebabCase from 'voca/kebab_case'
import Jets from 'jets'
import includes from 'lodash/includes'

import { getDataFromForm } from '../utils'
import { groupedSettings } from '../data-mapper'
import { categories } from '../constants'

import FormCheck from './form-check'
import FormGroupInput from './form-group-input'
import FormGroupSelect from './form-group-select'

class SearchFilters extends Component {
  constructor(props) {
    super(props)

    this.state.resultsCount = props.resultsCount
  }
  componentDidMount() {
    this.searchFiltersForm
      .addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault()
        this.handleChange(submitEvent)
      })

    this.searchFiltersForm
      .addEventListener('change', this.handleChange.bind(this))

    this.jetsSearch = new Jets({
      searchTag: '#search-filters--form [name=keywords]',
      contentTag: '.list-group',
      // didSearch: (searchTerm) => {
      //   this.state.resultsCount = (document.querySelectorAll(`[data-jets*="${searchTerm}"]`).length || this.props.resultsCount)
      // },
    })
    this.jetsSearch.search(this.props.filters.keywords)
  }

  componentWillReceiveProps(nextProps) {
    this.state.resultsCount = nextProps.resultsCount
    this.jetsSearch.search(nextProps.filters.keywords)
  }

  componentWillUnmount() {
    this.searchFiltersForm.removeEventListener('submit')
    this.searchFiltersForm.removeEventListener('change')

    this.jetsSearch.destroy()
  }

  handleChange(formEvent) {
    const filters = getDataFromForm(this.searchFiltersForm)
    this.props.updateFilters(filters)
  }

  render( { filters } ) {
    return (
<form className="card border-success" id="search-filters--form" ref={searchFiltersForm => this.searchFiltersForm = searchFiltersForm}>
  <h5 className="card-header bg-transparent border-success"><strong>Filter</strong> {this.state.resultsCount}</h5>
  <div className="card-body search-filters--filters">
    <div className="form-group">
      {
        groupedSettings['service-checks']
          .map(item => (
            <FormCheck
              {...item}
              attribute = "service-checks"
              checked = {includes(filters['service-checks'] || '', item.label)}
            />
          ))
      }
    </div>
    <hr/>
    <FormGroupInput
      attribute = "keywords"
      label = "Keywords"
      placeholder = "Search..."
      type = "search"
      value = { filters['keywords'] }
    />
    <FormGroupSelect
      attribute = "service-type"
      label = "Service Type"
      placeholder = "Select a Service Type"
      value = { filters['service-type'] }
      options = {
        categories.map(({ name }) => ({ value: name.toLowerCase(), label: name }))
      }
    />
    <hr/>
    <FormGroupInput
      attribute = "zip-code"
      label = "Zip Code"
      placeholder = "77000"
    />
    <FormGroupSelect
      attribute = "distance"
      label = "Radius"
      placeholder = "Select a Distance"
      options = {
        [5, 10, 25, 50, 100].map(distance => ({ value: distance, label: `${distance} miles` }))
      }
    />
    <hr/>
    <FormGroupSelect
      attribute = "income-eligibility"
      label = "Income Eligibility"
      placeholder = "Select an AMI"
      options = {
        [80, 110, 140].map(percent => ({ value: percent, label: `${percent}%` }))
      }
    />
    <FormGroupSelect
      attribute = "immigration-status"
      label = "Immigration Status"
      placeholder = "Select an Immigration Status"
      options = {
        ['US Citizen', 'Other'].map(label => ({ value: label, label }))
      }
    />
    <FormGroupSelect
      attribute = "immigrant-accessibility"
      label = "Immigrant Accessibility Profile"
      placeholder = "Select Completeness"
      options = {
        [0, 1, 2, 3, 4, 5].map(completeness => ({ value: completeness, label: `${completeness}+` }))
      }
    />
    <FormGroupSelect
      attribute = "languages"
      label = "Program/Service Languages"
      placeholder = "Select a Language"
      options = {
        [
          'English',
          'Spanish',
          'Vietnamese',
          'Chinese',
          'Arabic',
          'French',
          'Other',
        ].map( label => ({ value: label, label }))
      }
    />
    <hr/>
    <div className="form-group">
      <p>Open</p>
      <FormCheck attribute="open" label="Now"/>
      <div className="form-inline">
        <input className="form-check-input"
          type="checkbox"
          value="filter-schedule"
          id="filter-schedule"
          name="open"
        />
        <label className="form-check-label" for="filter-schedule">
          <input type="time" name="filter-schedule-time" className="form-control"/>
          <select className="form-control" name="filter-schedule-day">
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
    <div className="form-group">
      <p>Requires Appointment</p>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          value="Yes"
          id="Appointment-Yes"
          name="requires-appointment"
        />
        <label className="form-check-label" for="Appointment-Yes">
          Yes
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          value="No"
          id="Appointment-No"
          name="requires-appointment"
        />
        <label className="form-check-label" for="Appointment-No">
          No
        </label>
      </div>
    </div>
  </div>
  <div className="card-footer bg-transparent border-success">
    <input type="submit" className="btn btn-success" value="Filter"/>
  </div>
</form>
)
  }
}

export default connect(
  (state) => ({
    filters: ((state && state.get('filters')) || {}),
    resultsCount: ((state && state.get('filteredResults')) || []).length,
  }), {
    updateFilters: (content) => ({
      type: 'FILTERS_CHANGE',
      filters: content,
    })
  }
)( SearchFilters )
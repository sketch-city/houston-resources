import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import kebabCase from 'voca/kebab_case'
import Jets from 'jets'
import includes from 'lodash/includes'

import { getDataFromForm } from '../utils'
import { groupedSettings } from '../data-mapper'
import { categories } from '../constants'

import FormCheck, { Checkbox } from './form-check'
import FormGroupInput from './form-group-input'
import FormGroupSelect, { Select } from './form-group-select'

class SearchFilters extends Component {
  constructor(props) {
    super(props)

    // this.state.resultsCount = props.resultsCount
    this.handleChange.bind(this)
    this.clearFilters.bind(this)
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
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   resultsCount: nextProps.resultsCount
    // })
    if (!nextProps.filters.keywords) { return }
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

  clearFilters() {
    this.props.updateFilters({})
  }

  render( { filters } ) {
    return (
<form className="card border-success" id="search-filters--form" ref={searchFiltersForm => this.searchFiltersForm = searchFiltersForm}>
  <div className="card-header bg-transparent border-success">
    <h6 className="mb-0">Filters</h6>
    <div className="filter-nav">
      <a href="#services">Services</a>
      <a href="#keywords-and-categories">Keywords</a>
      <a href="#coverage">Coverage</a>
      <a href="#eligibility">Eligibility</a>
      <a href="#schedule">Schedule</a>
    </div>
  </div>
  <div className="card-body search-filters--filters">
    <a name="services">Services</a>
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
    <a name="keywords-and-categories">Keywords</a>
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
    <a name="coverage">Coverage</a>
    <FormGroupInput
      attribute = "zip-code"
      label = "Zip Code"
      placeholder = ""
      value = { filters['zip-code'] }
    />
    <FormGroupSelect
      attribute = "distance"
      label = "Radius"
      placeholder = "Select a Distance"
      value = { filters['distance'] }
      options = {
        [5, 10, 25, 50, 100].map(distance => ({ value: distance, label: `${distance} miles` }))
      }
    />
    <hr/>
    <a name="eligibility">Eligibility</a>
    <FormGroupSelect
      attribute = "income-eligibility"
      label = "Income Eligibility"
      placeholder = "Select an AMI"
      value = { filters['income-eligibility'] }
      options = {
        [80, 110, 140].map(percent => ({ value: percent, label: `< ${percent}%` }))
      }
    />
    <FormGroupSelect
      attribute = "immigration-status"
      label = "Immigration Status"
      placeholder = "Select an Immigration Status"
      value = { filters['immigration-status'] }
      options = {
        ['U.S. Citizen', 'Other'].map(label => ({ value: label, label }))
      }
    />
    <FormGroupSelect
      attribute = "immigrant-accessibility"
      label = "Immigrant Accessibility Profile"
      placeholder = "Select Completeness"
      value = { `${filters['immigrant-accessibility']}` }
      options = {
        ['0', '1', '2', '3', '4', '5'].map(completeness => ({ value: completeness, label: `${completeness}+` }))
      }
    />
    <FormGroupSelect
      attribute = "languages"
      label = "Program/Service Languages"
      placeholder = "Select a Language"
      value = { filters['languages'] }
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
    <a name="schedule">Schedule</a>
    <div className="form-group">
      <label className="d-block">Open</label>
      <FormCheck
        attribute="open"
        label="Now"
        value = "now"
        checked = { includes(filters['open'], "now") }
      />
      <div className="form-inline">
        <Checkbox
          attribute = "open"
          value = "filter-schedule"
          checked = { includes(filters['open'], "filter-schedule") }
        />
        <label className="form-check-label" for="filter-schedule">
          <input type="time" name="filter-schedule-time" className="form-control"/>
          <FormGroupSelect
            attribute = "filter-schedule-day"
            placeholder = "Day of Week"
            value = { filters['filter-schedule-day'] }
            options = {
              [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ].map( label => ({ value: label.toLowerCase(), label }))
            }
          />
        </label>
      </div>
    </div>
    <div className="form-group">
      <label className="d-block">Requires Appointment</label>
      <div className="form-check form-check-inline">
        <Checkbox
          value = "Yes"
          attribute = "requires-appointment"
          checked = { includes(filters['requires-appointment'], "Yes") }
        />
        <label className="form-check-label" for="filter-requires-appointment-yes">
          Yes
        </label>
      </div>
      <div className="form-check form-check-inline">
        <Checkbox
          value = "No"
          attribute = "requires-appointment"
          checked = { includes(filters['requires-appointment'], "No") }
        />
        <label className="form-check-label" for="filter-requires-appointment-no">
          No
        </label>
      </div>
    </div>
  </div>
  <div className="card-footer bg-transparent border-success">
    <input type="submit" className="btn btn-success" value="Filter" hidden/>
    <input
      type="button"
      className="btn btn-outline-success btn-sm float-right"
      value="Clear Filters"
      onClick={this.clearFilters.bind(this)}
    />
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
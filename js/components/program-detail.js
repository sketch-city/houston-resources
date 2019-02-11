import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import LabelledItem from './labelled-item'

import AgencyPhone from './agency-phone'
import Name from './name'
import AgencyName from './agency-name'
import LabelledInlineList from './labelled-inline-list'

import isEmpty from 'lodash/isEmpty'

const customRenders = {
  'agency-phone': AgencyPhone,
  'name': Name,
  'agency-name': AgencyName,
  'language-arr': LabelledInlineList,
}

function renderProperty(property) {
  const Component = customRenders[property.attribute] || LabelledItem

  return <Component {...property}/>
}

function hasValues(data) {
  return data.find(({item}) => !(isEmpty(item)))? true : false
}

function countGroupCompleteness(data, groupName = 'immigrant-accessibility') {
  return data.filter(({item}) => !(isEmpty(item))).length
}

const CompletenessMarkup = ({ data }) => {
  const options = [
    'Unknown',
    'Partial',
    'Complete',
  ]

  const count = countGroupCompleteness(data['immigrant-accessibility'])

  const threshholdForCompleteness = 15
  const completeness = ((count === 0) && 'Unknown') || ((count > threshholdForCompleteness) && 'Complete') || 'Partial'

  const immigrantAccessibilityCompleteness = {
    attribute: 'immigrant-accessiblity-completeness',
    label: 'Immigrant Accessibility Completeness',
    item: completeness,
  }

  return renderProperty(immigrantAccessibilityCompleteness)
}

class DetailsMarkup extends Component {
  constructor(props) {
    super(props)
    this.state.minimize = true

    this.toggleMinize.bind(this)
  }
  toggleMinize() {
    const { minimize } = this.state
    this.setState({ minimize: !minimize })
  }
  render({ data }) {
    return (
      <div className={this.state.minimize? 'minimize' : ''}>
        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id="toggle-missing" onClick={this.toggleMinize.bind(this)}/>
          <label className="custom-control-label float-right" for="toggle-missing">Show Missing Data</label>
        </div>
        <div className="list-group">
          { data.summary.map(renderProperty) }
          <CompletenessMarkup data = {data} />
        </div>
        <div className="list-group">
          <h4 className={ hasValues(data['eligibility'])? '':'hideable' }>Eligibility</h4>
          { data['eligibility'].map(renderProperty) }
        </div>
        <div className="list-group">
          <h4 className={ hasValues(data['id-details'])? '':'hideable' }>Identification Details</h4>
          { data['id-details'].map(renderProperty) }
        </div>
        <div className="list-group ">
          <h4 className={ hasValues(data['requirements'])? '':'hideable' }>Requirements</h4>
          { data['requirements'].map(renderProperty) }
        </div>
        <div className="list-group">
          <h4 className={ hasValues(data['service-intake-details'])? '':'hideable' }>Sevice Intake</h4>
          { data['service-intake-details'].map(renderProperty) }
        </div>
        <div className="list-group">
          <h4 className={ hasValues(data['contact'])? '':'hideable' }>Contact Information</h4>
          { data.contact.map(renderProperty) }
        </div>
        <div className="list-group">
          <h4 className={ hasValues(data['language-support'])? '':'hideable' }>Language Support</h4>
          { data['language-support'].map(renderProperty) }
        </div>
        <div className="list-group">
          <h4 className={ hasValues(data['services-provided'])? '':'hideable' }>Services Provided</h4>
          { data['services-provided'].map(renderProperty) }
        </div>
        <div className="list-group">
          <h4 className={ hasValues(data['services-offered'])? '':'hideable' }>Services Offered</h4>
          { data['services-offered'].map(renderProperty) }
        </div>
        <div className="list-group">
          <h4>Schedule</h4>
          { data['schedule'].map(renderProperty) }
        </div>
        <div className="list-group">
          <h4 className={ hasValues(data['services-and-policies'])? '':'hideable' }>Additional Services and Policies</h4>
          { data['services-and-policies'].map(renderProperty) }
        </div>
      </div>
    )
  }
}

const ProgramDetail = ({ program: data }) => {
  if (!data.summary) { return }
  return <DetailsMarkup data={ data }/>
}

export default connect((state) => ({
  program: ((state && state.get('program').data) || { data: {} })
}))( ProgramDetail )

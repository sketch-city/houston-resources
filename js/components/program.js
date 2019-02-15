import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import LabelledItem from './labelled-item'
import LabelledLink from './labelled-link'
import Layout from './layout'
import Schedule from './schedule'

import AgencyPhone from './agency-phone'
import Name from './name'
import AgencyName from './agency-name'
import { SearchResultList } from './search-result-list'

import {
  countGroupCompleteness,
  buildURL, 
  hasValues,
  hasValuesAsObject,
} from '../utils'

const customRenders = {
  'agency-phone': AgencyPhone,
  'name': Name,
  'agency-name': AgencyName,
  'transportation': LabelledLink,
  'schedule': Schedule,
}

function renderProperty(property) {
  const Component = customRenders[property.attribute] || LabelledItem

  return <Component {...property}/>
}


const CompletenessMarkup = ({ data }) => {
  const options = [
    'Unknown',
    'Partial',
    'Complete',
  ]

  const count = countGroupCompleteness(data['immigrant-accessibility'])

  const threshholdForCompleteness = 10
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
      <div>
        <div className="text-right profile-tools">
          <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" id="toggle-missing" onClick={this.toggleMinize.bind(this)}/>
            <label className="custom-control-label float-right" for="toggle-missing">Show Missing Data</label>
          </div>
          <p className="text-muted">
            <i>Last updated { (data['edit-details'] && data['edit-details'][0].item) || 'n/a' }</i>
          </p>
          <div>
            <a
              className="btn btn-outline-success btn-sm"
              target="_blank"
              href = {`https://needhou-data-cleaner.herokuapp.com/#!/selectprogram/${data.identifiers.find(({attribute}) => attribute === 'id').item}`}>
                Help complete this profile
              </a>
          </div>
        </div>
      <div className={this.state.minimize? 'minimize' : ''}>
        <div className="list-group" name="summary">
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
          <div className="row">
            <div className="col-md-6">
              { data.contact.map(renderProperty) }
              <LabelledLink
                label=""
                item={`http://google.com/maps/dir//${(data.contact.find(({ attribute }) => attribute === 'physical-address') || {}).item}`}
                attribute = "directions"
                groups = {['contact']}
              >
                Directions
              </LabelledLink>
            </div>
            <div className="col-md-6">
              <div id="map"></div>
            </div>
          </div>
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
          <h4 className={ hasValues(data['schedule'])? '':'hideable' }>Schedule</h4>
          { data['schedule'].map(renderProperty) }
        </div>
        <div className="list-group">
          <h4 className={ hasValues(data['services-and-policies'])? '':'hideable' }>Additional Services and Policies</h4>
          { data['services-and-policies'].map(renderProperty) }
        </div>
      </div>
    </div>)
  }
}

const ProgramDetail = ({ program: data, programsByAgency }) => {
  if (!data.summary) { return }
  return (
    <div>
      <DetailsMarkup data={ data }/>
      <h4 className="mt-4">All Programs</h4>
      <h6>by <strong>{ data.summary.find(({ attribute }) => attribute === 'agency-name').item }</strong></h6>
      <SearchResultList results={ programsByAgency }/>
    </div>
  )
}

const Program = (props) => (
  <Layout crumbs={[
        {
          label: 'Home',
          link: buildURL(`${location.protocol}//${location.host}/index.html`),
        }, {
          label: 'Search',
          link: buildURL(`${location.protocol}//${location.host}/search.html?service-checks=A2S+Verified`),
        }, {
          label: 'Program',
        }
      ]}>
    <div className="container">
      <div className="row">
        <div className="col">
          <ProgramDetail {...props}/>
        </div>
      </div>
    </div>
  </Layout>
)

export default connect((state) => {
  const agencyId = (state && state.get('program').data.identifiers.find(({ attribute }) => attribute === 'agency-id').item)
  return {
    program: ((state && state.get('program').data) || { data: {} }),
    programsByAgency: ((state && state.get('programsByAgency').get(agencyId)) || []),
  }
})( Program )

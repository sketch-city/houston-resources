import BaseComponent from './base'
import LabelledItem from './labelled-item'

import AgencyPhone from './agency-phone'
import Name from './name'
import AgencyName from './agency-name'
import LabelledInlineList from './labelled-inline-list'

const customRenders = {
  'agency-phone': AgencyPhone,
  'name': Name,
  'agency-name': AgencyName,
  'language-arr': LabelledInlineList,
}

function renderProperty(property) {
  const Component = customRenders[property.attribute] || LabelledItem

  return Component.markup(property)
}

function hasValues(data) {
  return data.find(({item}) => item.length > 0)? true : false
}

class ProgramDetail extends BaseComponent {
  static detailsMarkup({data}) {
    return `
<div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="toggle-missing">
  <label class="custom-control-label float-right" for="toggle-missing">Show Missing Data</label>
</div>
<div class="list-group">
  ${ data.summary.map(renderProperty).join('') }
</div>
<div class="list-group">
  <h4 class="${hasValues(data['eligibility'])? '':'hideable'}">Eligibility</h4>
  ${ data['eligibility'].map(renderProperty).join('') }
</div>
<div class="list-group">
  <h4 class="${hasValues(data['id-details'])? '':'hideable'}">Identification Details</h4>
  ${ data['id-details'].map(renderProperty).join('') }
</div>
<div class="list-group ">
  <h4 class="${hasValues(data['requirements'])? '':'hideable'}">Requirements</h4>
  ${ data['requirements'].map(renderProperty).join('') }
</div>
<div class="list-group">
  <h4 class="${hasValues(data['service-intake-details'])? '':'hideable'}">Sevice Intake</h4>
  ${ data['service-intake-details'].map(renderProperty).join('') }
</div>
<div class="list-group">
  <h4 class="${hasValues(data['contact'])? '':'hideable'}">Contact Information</h4>
  ${ data.contact.map(renderProperty).join('') }
</div>
<div class="list-group">
  <h4 class="${hasValues(data['language-support'])? '':'hideable'}">Language Support</h4>
  ${ data['language-support'].map(renderProperty).join('') }
</div>
<div class="list-group">
  <h4 class="${hasValues(data['services-provided'])? '':'hideable'}">Services Provided</h4>
  ${ data['services-provided'].map(renderProperty).join('') }
</div>
<div class="list-group">
  <h4 class="${hasValues(data['services-offered'])? '':'hideable'}">Services Offered</h4>
  ${ data['services-offered'].map(renderProperty).join('') }
</div>
<div class="list-group">
  <h4>Schedule</h4>
  ${ data['schedule'].map(renderProperty).join('') }
</div>
<div class="list-group">
  <h4 class="${hasValues(data['services-and-policies'])? '':'hideable'}">Additional Services and Policies</h4>
  ${ data['services-and-policies'].map(renderProperty).join('') }
</div>
    `
  }

  static markup(properties) {

    if (!properties.data.summary) { return ``}

    return `
  ${this.detailsMarkup(properties)}
    `
  }
}

export default ProgramDetail
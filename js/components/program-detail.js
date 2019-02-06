import BaseComponent from './base'
import LabelledItem from './labelled-item'

import AgencyPhone from './agency-phone'
import Name from './name'
import AgencyName from './agency-name'

const customRenders = {
  'agency-phone': AgencyPhone,
  'name': Name,
  'agency-name': AgencyName,
}

function renderProperty(property) {
  const Component = customRenders[property.attribute] || LabelledItem

  return Component.markup(property)
}

class ProgramDetail extends BaseComponent {
  static markup({data}) {
    return `
<div class="list-group">
  ${ data.summary.map(renderProperty).join('') }
</div>
    `
  }
}

export default ProgramDetail
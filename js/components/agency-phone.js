import BaseComponent from './base'
import LabelledItem from './labelled-item'

class AgencyPhone extends BaseComponent {
  static markup(properties) {
    if (!properties.item || !properties.item.length) {
      return ``
    }

    return `
${ properties.item.map(LabelledItem.markup).join('') }
    `
  }
}

export default AgencyPhone
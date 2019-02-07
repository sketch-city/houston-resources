import LabelledItem from './labelled-item'

class LabelledInlineList extends LabelledItem {
  static renderItem(item) {
    return `
${item.join(', ')}
    `
  }
}

export default LabelledInlineList
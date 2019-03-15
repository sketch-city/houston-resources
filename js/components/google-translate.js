import { h, Component } from 'preact'

export class GoogleTranslateButton extends Component {
  shouldComponentUpdate() {
    // do not re-render via diff:
    return false
  }
  componentDidMount() {
    window.googleTranslateElementInit = this.googleTranslateElementInit
  }
  componentShouldUpdate() {
    return false
  }
  googleTranslateElementInit () {
    new window.google.translate.TranslateElement({
      pageLanguage: 'en',
      layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
    }, 'google_translate_element')
  }
  render() {
    return (<span className="float-left">
      <script type='text/javascript' src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit' />
      <span
        id="google_translate_element"
        ref={translateEl => this.translateEl = translateEl}/>
    </span>)
  }
}
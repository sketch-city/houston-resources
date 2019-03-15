import { h, Component } from 'preact'

export class GoogleTranslateButton extends Component {
  shouldComponentUpdate() {
    // do not re-render via diff:
    return false
  }
  componentDidMount() {
    window.googleTranslateElementInit = this.googleTranslateElementInit
  }
  googleTranslateElementInit () {
    new window.google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element')
  }
  render() {
    return (<div>
    <script type='text/javascript' src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit' />
    <div id="google_translate_element"></div>
    </div>)
  }
}
import { h, Component } from 'preact'

export class GoogleTranslateButton extends Component {
  componentDidMount() {
    window.googleTranslateElementInit = this.googleTranslateElementInit
  }
  googleTranslateElementInit () {
    new window.google.translate.TranslateElement({pageLanguage: 'pt', layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT}, 'google_translate_element')
  }
  render() {
    return (<div>
    <script type='text/javascript' src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit' />
    <div id="google_translate_element"></div>
    </div>)
  }
}
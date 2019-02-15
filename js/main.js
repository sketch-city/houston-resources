import { render, h } from 'preact'
import { loadAllItems } from './utils'

import Main from './components/main'

const container = document.getElementById('container')

render(<Main/>, container)
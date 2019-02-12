import { categories } from './constants'
import Category from './components/category'
import { render, h } from 'preact'
import { loadAllItems, buildURL, fixNavURL } from './utils'

loadAllItems()
fixNavURL()

const categoryList = document.getElementById('category-list')
render((<div className="row">{categories.map(Category)}</div>), categoryList)

document.querySelector('form').action = buildURL('/search.html')
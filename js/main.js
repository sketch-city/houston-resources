import { categories } from './constants'
import Catergory from './components/category'

const categoryList = document.getElementById('category-list')

const categoriesHTML = categories.map(Catergory.markup)

categoryList.innerHTML = categoriesHTML.join('')
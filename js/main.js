import { categories } from './constants'
import Catergory from './components/category'

const categoryList = document.getElementById('category-list')

const categoriesHTML = categories.map(Catergory.markup)

categoriesHTML.splice(4, 0, '<div class="w-100 mt-4"></div>')

categoryList.innerHTML = categoriesHTML.join('')
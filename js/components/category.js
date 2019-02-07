import { buildURL } from '../utils'
import BaseComponent from './base'

class Category extends BaseComponent {
  static markup({ name, icon, description }) {
    return `
<div class="
  col-lg-3
  col-md-3
  col-sm-6
  col-6 py-3
">
<a
  href="${buildURL('/search.html')}?service_type=${name.toLowerCase()}"
  class="card category"
  data-toggle="tooltip"
  title="${description}">
  <div class="card-body text-center">
    <h5>${name}</h5>
    ${icon}
  </div>
</a>
</div>
    `
  }
}

export default Category
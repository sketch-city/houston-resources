import { h } from 'preact'
import Category from './category'
import Layout from './layout'
import { categories } from '../constants'
import { buildURL } from '../utils'

const Main = () => (
  <Layout>
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">What kind of help do you need?</h1>
        <p className="lead">Search through hundreds of agencies and programs that are ready to help you.</p>
        <form
          className="form-inline"
          action={ buildURL(`${location.protocol}//${location.host}/search.html`) }>
          <div className="input-group input-group-lg">
            <input
              type="hidden"
              name="service-checks"
              value="HILSC Verified"
            />
            <input
              className="form-control form-success"
              name="keywords"
              type="search"
              placeholder="Search with keywords..."
              ariaLabel="Search"/>
            <div className="input-group-append">
              <button className="btn btn-success" type="submit">Find Help</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div className="container">
      <h3>...or choose a category</h3>
      <div className="row">{ categories.map((props) => <Category {...props}/>) }</div>
    </div>
  </Layout>
)

export default Main
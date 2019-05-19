import { h } from 'preact'
import Layout from './layout'

import { buildURL } from '../utils'

export default () => {
  return (
    <Layout crumbs={[
      {
        label: 'Home',
        link: buildURL(`${location.protocol}//${location.host}/index.html`)
      }, {
        label: 'Analytics',
      }
    ]}>
      <div className="container" id="analytics-container">
        <div className="row">
          <div className="col">
            <label>Interesting Chart #1</label>
            <div className="chart-placeholder"></div>
          </div>
          <div className="col">
            <label>Interesting Chart #2</label>
            <div className="chart-placeholder"></div>
          </div>
          <div className="col">
            <label>Interesting Chart #3</label>
            <div className="chart-placeholder"></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

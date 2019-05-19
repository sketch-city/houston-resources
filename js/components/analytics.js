import { h } from 'preact'
import Layout from './layout'

import { buildURL } from '../utils'

gapi.analytics.ready(function() {

  /**
   * Authorize the user with an access token obtained server side.
   */
  gapi.analytics.auth.authorize({
    'serverAuth': {
      'access_token': process.env.GA_ACCESS_TOKEN
    }
  });

  /**
   * Creates a new DataChart instance showing sessions over the past 30 days.
   * It will be rendered inside an element with the id "chart-1-container".
   */
  var dataChart1 = new gapi.analytics.googleCharts.DataChart({
    query: {
      'ids': 'ga:78880644',
      'start-date': '30daysAgo',
      'end-date': 'yesterday',
      'metrics': 'ga:sessions,ga:users',
      'dimensions': 'ga:date'
    },
    chart: {
      'container': 'chart-1-container',
      'type': 'LINE',
      'options': {
        'width': '100%'
      }
    }
  });
  dataChart1.execute();
});

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
          <div id="chart-1-container"></div>
        </div>
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

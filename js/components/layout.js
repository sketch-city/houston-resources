import { buildURL } from '../utils'
import { h } from 'preact'
import isEmpty from 'lodash/isEmpty'

const Crumbs = ({ crumbs }) => {
  if (!crumbs) {
    return null
  }

  return (
    <nav ariaLabel="breadcrumb">
      <ol className="breadcrumb">
        {crumbs.map(({ label, link }, index) => {
          const isCurrent = index === crumbs.length - 1
          let crumbProps = {
            className: 'breadcrumb-item',
          }

          if (isCurrent) {
            crumbProps = {
              className: 'breadcrumb-item active',
              ariaCurrent: 'page',
            }
          }

          return (<li {...crumbProps}>
              {
                (!isCurrent && (
                  <a href={ link }>{label}</a>
                )) || label
              }
            </li>)
        })}
      </ol>
    </nav>
  )
}

const Layout = ({ crumbs, children }) => {
  let wrapperProps = {
    className: 'has-navbar'
  }

  if (!isEmpty(crumbs)) {
    wrapperProps = {
      className: 'has-navbar has-crumbs'
    }
  }

  return (
    <div {...wrapperProps}>
      <header className="fixed-top">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href={ buildURL(`${location.protocol}//${location.host}/index.html`) }>A database of resources for agencies working with immigrants in Greater Houston</a>
        </nav>
        <Crumbs crumbs={ crumbs }/>
      </header>
      <main role="main">
        { children }
      </main>
      <footer className="container">
        <p className="mb-0">
          <small>
            The NeedHou Houston Social Services Database is a product of <a
              href="https://www.houstonimmigration.org/"
              target="_blank">
                <abbr title="Houston Immigration Legal Services Collaborative">
                  HILSC
                </abbr>
              </a> in partnership with <a
              href="https://www.januaryadvisors.com/"
              target="_blank">January Advisors</a>.  Only <abbr title="Access to Services Verified">A2S Verified</abbr> data has been accounted for by HILSC.
          </small>
        </p>
        <p><small>Have a feature request?  Found a bug?  Contact us <a href="https://www.januaryadvisors.com/submit-feedback-or-report-a-bug" target="_blank">here</a>.</small></p>
      </footer>
    </div>
  )
}

export default Layout
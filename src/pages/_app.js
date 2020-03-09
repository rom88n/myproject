// base
import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import PropTypes from 'prop-types'

// redux
import withRedux from 'next-redux-wrapper'
import configureStore from '../redux'
import { Provider } from 'react-redux'

// material-ui
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

// components
import Header from './components/Header'
import Search from './components/Search'

import 'bootstrap/dist/css/bootstrap.min.css'

const styles = {
  root: {
    marginTop: '2rem'
  }
}
@withRedux(configureStore)
@withStyles(styles)
export default class _App extends App {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  static async getInitialProps({ Component, ctx }) {
    const server = !!ctx.req
    const { store } = ctx
    const state = store.getState().state

    const out = { state, server }

    if (Component.getInitialProps) {
      out.pageProps = { ...await Component.getInitialProps(ctx) }
    }

    return out
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, router, classes, store } = this.props

    return (
      <Provider store={store}>
        <Head>123</Head>
        <div className="container">
          <Paper className={classes.root} elevation={18}>
            <Header/>
            <Search />
            <Component router={router} {...pageProps} />
          </Paper>
        </div>
      </Provider>
    )
  }
}
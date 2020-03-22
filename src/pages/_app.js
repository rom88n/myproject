// base
import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// redux
import withRedux from 'next-redux-wrapper'
import configureStore from '../redux'
import { Provider } from 'react-redux'

// material-ui
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

// components
import Header from '../components/Header'
import Search from '../components/Search'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import 'bootstrap/dist/css/bootstrap.min.css'

const client = new ApolloClient({
  uri: 'http://localhost:3000/admin/api'
})


const styles = {
  root: {
    marginTop: '2rem',
    '@media screen and (max-width: 500px)': {
      marginTop: '.1rem'
    }
  },
  container: {
    '@media screen and (max-width: 500px)': {
      paddingRight: 0,
      paddingLeft: 0
    }
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
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Head>123</Head>
          <div className={classNames('container', classes.container)}>
            <Paper className={classes.root} elevation={18}>
              <Header/>
              <Query
                query={gql`
      query {
        allPosts {
          name
        }
      }
    `}
              >
                {({ loading, error, data }) => {
                  console.log('data', data)
                  if (loading) return <p>Loading...</p>
                  if (error) return <p>Error :(</p>

                  return (
                    <ul key="allPosts">
                      {data.allPosts.map(({ name }) => (
                        <li key={name}>{name || 'incognoito'}</li>
                      ))}
                    </ul>
                  )
                }}
              </Query>
              <Search/>
              <Component router={router} {...pageProps} />
            </Paper>
          </div>
        </Provider>
      </ApolloProvider>
    )
  }
}

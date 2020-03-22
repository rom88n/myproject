// base
import React from 'react'
import VideoContainer from '../components/VideoContainer'
import Filter from '../components/Filter'

// graphql
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export default function index() {
  return (
    <div>
      <Filter/>
      <Query
        query={gql`
      query {
        allPosts {
          name
        }
      }
    `}
      >
        {({ loading, error, data = {} }) => {
          return (<VideoContainer data={data.allPosts}/>)
        }}
      </Query>
    </div>
  )
}

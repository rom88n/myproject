// base
import React from 'react'
import VideoContainer from '../components/VideoContainer'
import Filter from '../components/Filter'

// graphql
import { Query } from 'react-apollo'
import { withApollo } from '../graphql/apollo'
import { allPosts } from '../graphql/queries'

// material-ui
import { withStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'

const styles = {
  pagination: {
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'center'
  }
}

@withApollo({ ssr: true })
@withStyles(styles)
export default class index extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Filter/>
        <Query query={allPosts}>
          {({ loading, error, data = {} }) => (<VideoContainer data={data.allPosts}/>)}
        </Query>
        <div className={classes.pagination}>
          <Pagination count={10} variant="outlined" shape="rounded"/>
        </div>
      </div>
    )
  }
}

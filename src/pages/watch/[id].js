// base
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { withApollo } from '../../graphql/apollo'

// material-ui
import { withStyles } from '@material-ui/core/styles'

// components
import VideoPage from '../../components/VideoPage'

const styles = {
  root: {}
}

@withApollo({ ssr: true })
@withRouter
@withStyles(styles)
export default class Watch extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }

  render() {
    const { classes, router } = this.props
    const { id } = router.query

    return (
      <div className={classes.root}>
        <VideoPage id={id}/>
      </div>
    )
  }
}

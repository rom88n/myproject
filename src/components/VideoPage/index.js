// base
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Head from 'next/head'
import { compose } from 'redux'
import { Player } from 'video-react'

//graphql
import { Query } from 'react-apollo'
import { postById } from '../../graphql/queries'

// material-ui
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import DateRange from '@material-ui/icons/DateRange'
import Skeleton from '@material-ui/lab/Skeleton'

// components
import VideoContainer from '../VideoContainer'

const VideoPage = ({ classes, id }) => {
  return (
    <Query
      query={postById(id)}
    >
      {({ loading, data = {} }) => {
        const item = _.get(data, 'Post', {})
        return (
          <React.Fragment>
            <Head>
              <title>{item.title}</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
                key="viewport"
              />
            </Head>
            <div className={classes.header}>
              <Typography variant="h6" className={classes.title}>
                {item.title}
              </Typography>
              <div className={classes.dateContainer}>
                <div><DateRange className={classes.viewIcon}/></div>
                <Typography component="div" variant="caption" className={classes.postDate}>2020-02-02</Typography>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-8">
                {loading
                  ? (
                    <Skeleton animation="wave" variant="rect" className={classes.player}/>
                  ) : (
                    <Player>
                      <source src={item.videoUrl} />
                    </Player>
                  )}
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4"/>
            </div>
            <Typography variant="h6" className={classes.title}>Похожие видео</Typography>
            <div className={classes.related}>
              <VideoContainer/>
            </div>
          </React.Fragment>
        )
      }
      }
    </Query>
  )
}

VideoPage.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = {
  root: {},
  title: {
    margin: '1rem'
  },
  player: {
    margin: '1rem',
    height: '350px'
  },
  header: {
    display: 'flex',
    margin: '0 1rem',
    justifyContent: 'space-between'
  },
  dateContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  related: {
    padding: '1rem 0'
  }
}

export default compose(
  withStyles(styles)
)(VideoPage)

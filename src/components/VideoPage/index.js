// base
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Head from 'next/head'
import { compose } from 'redux'

//graphql
import { Query } from 'react-apollo'
import { useQuery } from '@apollo/react-hooks'
import { postById } from '../../graphql/queries'

// material-ui
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import DateRange from '@material-ui/icons/DateRange'
import Skeleton from '@material-ui/lab/Skeleton'

// components
import VideoContainer from '../VideoContainer'
import Link from '../Link'

const VideoPage = ({ classes, id }) => {
  const { loading, error, data } = useQuery(postById, {
    variables: { id: id }
  })
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const item = data.Post
  console.log(item)
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
              <div>
                <video controls="controls" className={classes.iframe} autoPlay={false}>
                  <source src={item.videoUrl} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
                </video>
              </div>
            )}
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4"/>
      </div>
      <div className={classes.categories}>
        <Typography variant="body2" className={classes.catTitle}>Categories</Typography>
        {item.categories.map(category => (
          <Chip
            variant="outlined"
            color="secondary"
            size="small"
            label={category.title}
            className={classes.chip}
            component={Link}
            href={category.url}
            clickable
          />
        ))}
      </div>
      <div className={classes.related}>
        <VideoContainer/>
      </div>
    </React.Fragment>
  )
}

VideoPage.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}

const styles = {
  '-webkit-full-page-media': {
    backgroundColor: '#fff !important'
  },
  iframe: {
    border: 'none',
    width: '100%',
    margin: '.5rem',
    '&:focus': {
      outline: 'none'
    }
  },
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
  },
  categories: {
    margin: '1rem',
  },
  catTitle: {
    marginBottom: '.5rem'
  },
  chip: {
    marginRight: '.2rem'
  }
}

export default compose(
  withStyles(styles)
)(VideoPage)

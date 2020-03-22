// base
import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// components
import CardItem from '../CardItem/index'

// material-ui
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles({
  container: {
    padding: '0 1rem'
  },
  media: {
    width: '100%',
    height: '200px',
    maxWidth: '345px',
    margin: '1rem 0'
  },
  mediaLine: {
    marginBottom: '6px',
    height: '10px'
  }
})

export default function VideoContainer({ data }) {
  const classes = useStyles()

  if (!data.length) {
    return (
      <div className={classNames(classes.container, 'row')}>
        {_.range(0, 10).map((item, index) => (
          <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
            <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" className={classes.mediaLine} />
            <Skeleton animation="wave" className={classes.mediaLine} width="40%"/>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={classNames(classes.container, 'row')}>
      {data.map((item, index) => (
        <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
          <CardItem item={item}/>
        </div>
      ))}
    </div>
  )
}

VideoContainer.propTypes = {
  data: PropTypes.array
}

VideoContainer.defaultProps = {
  data: []
}

// base
import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

// components
import CardItem from '../CardItem/index'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    padding: '0 1rem'
  }
})

export default function VideoContainer() {
  const classes = useStyles()
  return (
    <div className={classNames(classes.container, 'row')}>
      {
        _.range(0, 12)
          .map((item, index) => (
            <div className="col-sm-12 col-md-6 col-lg-3" key={index}>
              <CardItem item={item}/>
            </div>)
          )}
    </div>
  )
}

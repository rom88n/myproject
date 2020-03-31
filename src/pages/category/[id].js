// base
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import _ from 'lodash'

// material-ui
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// components
import CardItem from '../../components/CardItem'

const styles = {
  root: {},
  title: {
    margin: '1rem'
  },
  player: {
    padding: '1rem',
    width: '100%',
    height: 'auto'
  }
}

@withRouter
@withStyles(styles)
export default class Watch extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>Videos By Current Category</Typography>
        <div className={classes.related}>
          <div className="row">
            {_.range(0, 12)
              .map((item, index) => (
                <div className="col-sm-12 col-md-6 col-lg-3" key={index}>
                  <CardItem item={item}/>
                </div>)
              )}
          </div>
        </div>
      </div>
    )
  }
}

// base
import React from 'react'

// material-ui
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center'
  }
}

@withStyles(styles)
export default class Error extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        404 NOT FOUND
      </div>
    )
  }
}

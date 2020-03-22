// base
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'

// material-ui
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// components
import VideoContainer from '../../components/VideoContainer'

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
    // router: PropTypes.object.isRequired
  }

  // static async getInitialProps() {
  // const res = await fetch('https://api.github.com/repos/zeit/next.js')
  // const json = await res.json()
  // return { stars: json.stargazers_count }
  // }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>Name name name name</Typography>
        <div className="row">
          <div className="col-sm-12 col-md-8 col-lg-8">
            <img src="/blank.png" alt="" className={classes.player}/>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4"/>
        </div>
        <Typography variant="h6" className={classes.title}>Похожие видео</Typography>
        <VideoContainer/>
      </div>
    )
  }
}

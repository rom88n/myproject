// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import VideoCam from '@material-ui/icons/videoCam'

// components
import Link from '../../components/Link'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  root: {
    width: '100%',
    maxWidth: 345,
    margin: '1rem 0'
  },
  img: {
    width: '100%',
    height: 300,
    position: 'relative'
  },
  disableFocus: {
    '&:focus': {
      outline: 'none'
    }
  },
  description: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: 10
  },
  viewIcon: {
    width: '1rem',
    height: '1rem',
    bottom: 0,
    left: 0,
    marginBottom: '0.5rem',
    marginLeft: '0.5rem'
  },
  viewContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(43, 43, 43, .5)',
    color: '#fff',
    borderRadius: '2px',
    width: '3rem',
    height: '1rem',
    bottom: 0,
    left: 0,
    position: 'absolute',
    margin: '0.5rem'
  },
  postDate: {
    lineHeight: 1.85,
    marginLeft: '0.25rem'
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center'
  }
})

export default function MediaCard({ category }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Card className={classes.root} square>
        <CardActionArea className={classes.disableFocus}>
          <CardMedia
            classes={{ root: classes.img }}
            image={category.img}
            title={category.name}
            component={Link}
            href={category.link}
          />
        </CardActionArea>
        <CardContent>
          <Typography variant="h6" className={classes.description}>
            {category.name}
          </Typography>
        </CardContent>
        <div className={classes.dateContainer}>
          <div><VideoCam className={classes.viewIcon}/></div>
          <Typography component="div" variant="caption" className={classes.postDate}>{category.amountVideos}</Typography>
        </div>
      </Card>
    </div>
  )
}

MediaCard.propTypes = {
  category: PropTypes.object.isRequired
}


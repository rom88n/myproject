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
import DateRange from '@material-ui/icons/DateRange'
import RemoveRedEye from '@material-ui/icons/removeRedEye'
import HD from '@material-ui/icons/hd'

// components
import Link from '../Link'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  root: {
    width: '100%',
    maxWidth: '345px',
    margin: '1rem 0'
  },
  img: {
    width: '100%',
    height: '200px',
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
  iconEye: {
    bottom: 0,
    left: 0,
    width: '1rem',
    height: '1rem',
    margin: '0.2rem'
  },
  iconHD: {
    top: 0,
    right: 0,
    position: 'absolute',
    width: '2rem',
    height: '2rem',
    margin: '0.5rem',
    color: 'orange'
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

export default function MediaCard({ item }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Card className={classes.root} square>
        <CardActionArea className={classes.disableFocus}>
          <CardMedia
            classes={{ root: classes.img }}
            image={item.image}
            title={item.title}
            component={Link}
            href={`/watch/${item.id}`}
          >
            <div className={classes.viewContainer}>
              <RemoveRedEye className={classes.iconEye}/>
              <Typography component="div" variant="caption">777</Typography>
            </div>
            {!!item.hd && (<HD className={classes.iconHD}/>)}
          </CardMedia>
        </CardActionArea>
        <CardContent>
          <Typography variant="subtitle1" className={classes.description}>
            {item.title}
          </Typography>
        </CardContent>
        <div className={classes.dateContainer}>
          <div><DateRange className={classes.viewIcon}/></div>
          <Typography component="div" variant="caption" className={classes.postDate}>2020-02-02</Typography>
        </div>
      </Card>
    </div>
  )
}

MediaCard.propTypes = {
  item: PropTypes.object.isRequired
}


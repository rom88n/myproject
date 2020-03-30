// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import HomeIcon from '@material-ui/icons/Home'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'

const useStyles = makeStyles({
  root: {
    '@media only screen and (min-width: 770px)': {
      display: 'none'
    }
  },
  drawer: {
    width: '100%'
  },
  header: {
    display: 'flex',
    padding: '0 1rem',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    '&:focus': {
      outline: 0
    }
  },
  nested: {
    marginLeft: '15%',
    width: '85%'
  }
})

function ListItemDropDown(props) {
  const [open, setOpen] = React.useState(false)
  const { item, classes } = props
  return (
    <React.Fragment>
      <ListItem onClick={() => setOpen(!open)} button>
        <ListItemIcon><HomeIcon/></ListItemIcon>
        <ListItemText primary={item.title}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open}>
        <List component="div" disablePadding>
          {item.items.map(item => (
            <ListItem button className={classes.nested} key={item.title}>
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary={item.title}/>
            </ListItem>)
          )}
        </List>
      </Collapse>
    </React.Fragment>
  )
}

ListItemDropDown.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
}

export default function MobileDrawer(props) {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  const { data } = props

  return (
    <div className={classes.root}>
      <IconButton className={classes.button} onClick={() => setOpen(true)}>
        <MenuIcon/>
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)} classes={{ paper: classes.drawer }}>
        <div className={classes.header}>
          <Typography component="div" variant="h6">
            HDKino
          </Typography>
          <div>
            <IconButton className={classes.button} onClick={() => setOpen(false)}>
              <CloseIcon/>
            </IconButton>
          </div>
        </div>
        <Divider/>
        <List>
          {data.map((item, index) => {
            if (item.items) return <ListItemDropDown classes={classes} item={item} key={item.title}/>
            return (
              <ListItem button key={index}>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary={item.title}/>
              </ListItem>
            )
          })}
        </List>
      </Drawer>
    </div>
  )
}

MobileDrawer.propTypes = {
  data: PropTypes.array.isRequired
}

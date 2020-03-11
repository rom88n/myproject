// base
import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

// material-ui
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Hidden from '@material-ui/core/Hidden'
import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'row'
  },
  dropdownList: {
    padding: '.5rem',
    overflow: 'auto',
    height: '300px'
  }
})

function ListItemDropDown({ item, classes }) {
  const [state, setState] = React.useState({
    open: false,
    anchorEl: null
  })

  const handleClickDropDown = (event) => {
    const { anchorEl } = state
    event.persist()

    setState(prev => ({
      open: anchorEl !== event.currentTarget || !prev,
      anchorEl: event.currentTarget
    }))
  }

  const handleClickAway = () => {
    const { open } = state
    if (!open) return false

    return setState({ open: false, anchorEl: null })
  }


  const { open, anchorEl } = state

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <ListItem onClick={handleClickDropDown} button>
          <ListItemText
            primary={item.title}
          />
        </ListItem>
        <Popper open={open} anchorEl={anchorEl} placement="bottom-start" transition keepMounted>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.dropdownList}>
                <List disablePadding dense>
                  {item.items.map(item => (
                    <ListItem key={item.title} button>
                      <ListItemText
                        primary={item.title}
                      />
                    </ListItem>)
                  )}
                </List>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  )
}

ListItemDropDown.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
}

export default function DesktopMenu({ data }) {
  const classes = useStyles()
  const router = useRouter()

  const handleRoute = (str) => () => {
    router.push(`/${str}`)
  }

  return (
    <Hidden smDown>
      <List classes={{ root: classes.list }} dense>
        {data.map((item) => {
          if (item.items) return (<ListItemDropDown classes={classes} item={item} key={item.title}/>)
          return (
            <ListItem key={item.title} onClick={handleRoute('')} button>
              <ListItemText
                primary={item.title}
              />
            </ListItem>)
        })}
      </List>
    </Hidden>
  )
}

DesktopMenu.propTypes = {
  data: PropTypes.array.isRequired,
}

// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Hidden from '@material-ui/core/Hidden'

// components
import Link from '../Link'

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'row',
    '@media only screen and (max-width: 769px)': {
      display: 'none'
    }
  },
  dropdownList: {
    padding: '.5rem',
    overflow: 'auto',
    height: '300px'
  },
  listItem: {
    color: 'inherit',
    '&:hover': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  link: {
    whiteSpace: 'nowrap',
    color: '#000000bf',
    '&:hover': {
      color: '#00000096',
      textDecoration: 'none'
    }
  }
})

const ListItemLink = React.forwardRef((props, ref) => (
  <ListItem ref={ref} {...props}>
    {props.children}
  </ListItem>
))

ListItemLink.propTypes = {
  children: PropTypes.any
}

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
        <ListItem
          onClick={handleClickDropDown}
          button
        >
          <ListItemText
            primary={item.title}
          />
        </ListItem>
        <Popper open={open} anchorEl={anchorEl} placement="bottom-start" transition keepMounted>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.dropdownList}>
                <List disablePadding dense>
                  {item.items.map(child => {
                    const ref = React.createRef()
                    return (
                      <ListItemLink
                        button
                        ref={ref}
                        component={Link}
                        key={child.title}
                        href={`/${child.href}`}
                        className={classes.link}
                      >
                        <ListItemText
                          primary={child.title}
                        />
                      </ListItemLink>)
                  })}
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

  return (
    <Hidden smDown>
      <List classes={{ root: classes.list }} dense>
        {data.map((item) => {
          if (item.items) return (<ListItemDropDown classes={classes} item={item} key={item.title}/>)

          const ref = React.createRef()
          return (
            <ListItemLink
              button
              ref={ref}
              key={item.title}
              component={Link}
              href={item.href}
              className={classes.link}
            >
              <ListItemText
                primary={item.title}
              />
            </ListItemLink>)
        })}
      </List>
    </Hidden>
  )
}

DesktopMenu.propTypes = {
  data: PropTypes.array.isRequired
}

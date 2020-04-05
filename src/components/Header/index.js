// base
import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// components
import DesktopMenu from './DesktopMenu'
import MobileDrawer from './MobileDrawer'

// components
import Link from '../Link'

const useStyles = makeStyles({
  root: {
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: '4px',
    borderTopLEftRadius: '4px',
    padding: '0 1rem'
  },
  text: {
    color: '#000000bf',
    '&:hover': {
      color: '#00000096',
      textDecoration: 'none'
    }
  }
})

export default function Header() {
  const classes = useStyles()

  const menuItems = [
    {
      title: 'Videos',
      href: '/'
    },
    {
      title: 'Categories',
      href: '/categories'
    },
    {
      title: 'Top Rating',
      href: ''
    },
    {
      title: 'About us',
      href: ''
    }
  ]

  return (
    <div className={classes.root}>
      <div><Typography component={Link} href="/" variant="button" className={classes.text}>HDKino</Typography></div>
      <div>
        <DesktopMenu data={menuItems}/>
        <MobileDrawer data={menuItems}/>
      </div>
    </div>
  )
}

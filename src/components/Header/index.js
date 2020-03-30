// base
import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/core/styles'

// components
import DesktopMenu from './DesktopMenu'
import MobileDrawer from './MobileDrawer'

const useStyles = makeStyles({
  root: {
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: '4px',
    borderTopLEftRadius: '4px',
    padding: '0 1rem'
  }
})

export default function Header() {
  const classes = useStyles()

  const menuItems = [
    {
      title: 'Главная',
      href: ''
    },
    {
      title: 'Категории',
      href: '',
      items: [
        { title: '111111111', href: '' },
        { title: '222222222', href: '' },
        { title: '33333333333', href: '' },
        { title: '4444', href: '' },
        { title: '5555555555555', href: '' },
        { title: '1111111111', href: '' },
        { title: '2222222222', href: '' },
        { title: '333333333333', href: '' },
        { title: '44444', href: '' },
        { title: '55555555555555', href: '' }
      ]
    },
    {
      title: 'Рейтинг',
      href: ''
    },
    {
      title: 'Регистрация',
      href: ''
    },
    {
      title: 'Вход',
      href: ''
    }
  ]

  return (
    <div className={classes.root}>
      <div>HDKino</div>
      <div>
        <DesktopMenu data={menuItems}/>
        <MobileDrawer data={menuItems}/>
      </div>
    </div>
  )
}

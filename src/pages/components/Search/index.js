// base
import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    background: '#f3f2ef',
    minHeight: '80px',
    padding: '0 1rem'
  }
})

export default function Search() {
  const classes = useStyles()
  return (
    <div className={classes.root}/>
  )
}

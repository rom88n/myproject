// base
import React from 'react'

// material-ui
import { makeStyles, styled } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MuiIconButton from '@material-ui/core/IconButton'
import Search from '@material-ui/icons/Search'

const useStyles = makeStyles({
  root: {
    background: '#f3f2ef',
    minHeight: '80px',
    padding: '1rem'
  },
  background: {
    background: '#fff'
  }
})

const IconButton = styled(MuiIconButton)({
  backgroundColor: 'inherit',
  outline: 0,
  '&:hover, &:focus': {
    outline: 0
  }
})

export default function SearchComponent() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TextField
        fullWidth
        className={classes.margin}
        variant="outlined"
        InputProps={{
          classes: {
            root: classes.background
          },
          startAdornment: (
            <IconButton>
              <Search/>
            </IconButton>
          )
        }}
      />
    </div>
  )
}

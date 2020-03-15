// base
import React, { useState } from 'react'

// material-ui
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  selectContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  selectStyles: {
    minWidth: '300px',
    height: '30px'
  },
  formControl: {
    margin: '1rem'
  }
})

export default function Filter() {
  const classes = useStyles()
  const [currentFilter, setCurrentFilter] = useState(10)
  const handleChange = (event) => {
    setCurrentFilter(event.target.value)
  }

  return (
    <div className={classes.selectContainer}>
      <FormControl className={classes.formControl}>
        <InputLabel shrink>Sort By</InputLabel>
        <Select
          value={currentFilter}
          onChange={handleChange}
          className={classes.selectStyles}
          displayEmpty
        >
          <MenuItem value={10}>Date</MenuItem>
          <MenuItem value={20}>Alphabet</MenuItem>
          <MenuItem value={30}>Popularity</MenuItem>
          <MenuItem value={40}>Attendance</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

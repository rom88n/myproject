// base
import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

// material-ui
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'

const useStyles = makeStyles({
  selectContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  selectStyles: {
    minWidth: '250px',
    height: '30px'
  },
  formControl: {
    margin: '1rem'
  },
  arrowContainer: {
    marginRight: '20px'
  },
  arrow: {
    marginRight: '10px',
    cursor: 'pointer'
  },
  notActive: {
    opacity: 0.5
  }
})

export default function Filter() {
  const classes = useStyles()
  const [activeArrow, setActiveArrow] = useState(1)
  const [currentFilter, setCurrentFilter] = useState(10)
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])
  const handleChange = (event) => {
    setCurrentFilter(event.target.value)
  }

  return (
    <div className={classes.selectContainer}>
      <div className={classes.arrowContainer}>
        <ArrowDownwardIcon
          className={classNames(classes.arrow, activeArrow===2 && classes.notActive)}
          onClick={()=> setActiveArrow(1)}
        />
        <ArrowUpwardIcon
          style={{ cursor: 'pointer' }}
          onClick={()=> setActiveArrow(2)}
          className={activeArrow === 1 && classes.notActive}
        />
      </div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel}>Sort By</InputLabel>
        <Select
          value={currentFilter}
          onChange={handleChange}
          className={classes.selectStyles}
          labelWidth={labelWidth}
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

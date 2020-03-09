// base
import React from 'react'
import _ from 'lodash'

// material-ui
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles({
  root: {
    // border: '1px solid #00000030',
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: '4px',
    borderTopLEftRadius: '4px',
    padding: '0 1rem'
  },
  list: {
    display: 'flex',
    flexDirection: 'row'
  }
})

export default function Header() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div>HDKino</div>
      <div>
        <List classes={{ root: classes.list }} dense>
          {_.range(1, 6)
            .map(() => (
              <ListItem>
                <ListItemText
                  primary="Menu item"
                />
              </ListItem>)
            )}
        </List>
      </div>
    </div>
  )
}

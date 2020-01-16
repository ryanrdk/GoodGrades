import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

export default function CenteredTabs() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Tabs textColor='primary' centered>
        <Tab value='bookings' label='Bookings' component={Link} to='/bookings' />
        <Tab value='home' label='Home' component={Link} to='/' />
        <Tab value='scheduler' label='Scheduler' component={Link} to='/scheduler' />
      </Tabs>
    </Paper>
  );
}

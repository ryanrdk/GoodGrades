import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  root: {
    flexGrow: 1
  }
};

class TopNavigation extends React.Component {
  state = {
    value: null
  };

  componentWillReceiveProps() {
    setTimeout(() => {
      this.setState({ value: this.props.tab });
    }, 1);
  }

  render() {
    const { classes, tab } = this.props;
    const { value } = this.state;
    return (
      <Paper className={classes.root}>
        <Tabs value={value === null ? tab : value} textColor='primary' centered>
          <Tab
            value='bookings'
            label='Bookings'
            component={Link}
            to='/bookings'
          />
          <Tab value='' label='Home' component={Link} to='/' />
          <Tab
            value='scheduler'
            label='Scheduler'
            component={Link}
            to='/scheduler'
          />
        </Tabs>
      </Paper>
    );
  }
}

TopNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopNavigation);

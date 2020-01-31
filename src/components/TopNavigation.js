import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoutButton from '../components/LogoutButton';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Popper,
  Tab,
  Tabs
} from '@material-ui/core';
import { AccountCircleOutlined } from '@material-ui/icons';

const styles = theme => ({
  menuArea: {
    zIndex: 100,
    width: 120,
    height: 64,
    justifyContent: 'center'
  },
  menuList: { paddingLeft: 16, paddingTop: 6, paddingBottom: 0 },
  paper: {
    marginRight: theme.spacing * 2
  },
  profileButton: { right: 0, position: 'absolute', zIndex: 200, marginTop: 6 },
  root: {
    display: 'flex',
    width: 120,
    height: 64
  },
  tabRoot: {
    flexGrow: 1
  }
});

class TopNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: null
    };
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  componentWillReceiveProps() {
    setTimeout(() => {
      this.setState({ value: this.props.tab });
    }, 1);
  }

  render() {
    const { classes, tab } = this.props;
    const { open, value } = this.state;
    return (
      <div>
        <Button
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup='true'
          className={classes.profileButton}
          onClick={this.handleToggle}>
          <AccountCircleOutlined />
        </Button>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          className={classes.menuArea}
          transition
          disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id='menu-list-grow'
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}>
              <Paper className={classes.root}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList className={classes.menuList} disableListWrap={true}>
                    <LogoutButton
                      socket={this.props.socket}
                      setUser={this.props.setUser}
                      setSocket={this.props.setSocket}
                      onClick={this.handleClose}
                    />
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Paper className={classes.tabRoot}>
          <Tabs
            value={value === 'login' ? '' : value === null ? tab : value}
            textColor='primary'
            centered>
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
      </div>
    );
  }
}

TopNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopNavigation);

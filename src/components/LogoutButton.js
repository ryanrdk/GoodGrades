import React, { Component } from 'react';
import { LOGOUT } from '../socketEvents';
import { Button } from '@material-ui/core';

export default class LogoutButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const logout = () => {
      this.props.socket.emit(LOGOUT);
      this.props.setSocket(null);
      localStorage.removeItem('user');
      this.props.setUser(null);
    };

    return (
      <Button
        variant='contained'
        style={{
          backgroundColor: '#f50057',
          color: '#fff',
          bottom: 32,
          position: 'absolute'
        }}
        onClick={logout}>
        Logout
      </Button>
    );
  }
}

import React, { Component } from 'react';
import { LOGOUT } from '../socketEvents';
import { Button } from '@material-ui/core';

export default class LogoutButton extends Component {
  render() {
    const logout = () => {
      this.props.socket.emit(LOGOUT);
      this.props.setSocket(null);
      localStorage.removeItem('user');
      this.props.setUser(null);
    };
    return (
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    );
  }
}

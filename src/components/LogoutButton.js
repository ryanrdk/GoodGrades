import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export default class LogoutButton extends Component {
  render() {
    return (
      <Button
        variant='contained'
        style={{
          backgroundColor: '#f50057',
          color: '#fff',
          marginTop: 8
        }}
        onClick={this.props.logout}>
        Logout
      </Button>
    );
  }
}

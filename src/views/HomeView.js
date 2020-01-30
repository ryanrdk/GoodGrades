import React, { useState, useEffect } from 'react';
import JoinModalButton from '../components/JoinModalButton';
import IconTextField from '../components/IconTextField';
import LogoutButton from '../components/LogoutButton';
import { Button } from '@material-ui/core';

//Makes API call to GoodGradesServer to create a new room object

export const HomeView = props => {
  const [room, setRoom] = useState(null);
  const [redirect, setRedirect] = React.useState(false);

  const handleRedirect = () => {
    console.log({ redirect });
    setRedirect(!redirect);
  };

  useEffect(() => {
    if (!room && props.user && props.user.type === 'tutor') {
      var targetUrl =
        'https://good-grades-server.herokuapp.com/api/users/' +
        props.user.unique_id +
        '/room';
      fetch(targetUrl)
        .then(blob => blob.json())
        .then(data => {
          setRoom(data);
          props.user.room_code = data.room_code;
          return data;
        })
        .catch(e => {
          return e;
        });
    }
    if (redirect) {
      // do something meaningful, Promises, if/else, whatever, and then
      // console.log("room.sh/go/" + roomCode)
      window.location.assign('//room.sh/go/' + room.room_code);
    }
  });

  return (
    <div>
      <div className='App'>
        <header className='App-header'>
          <h1>Welcome {props.user ? props.user.givenName : 'Guest'}</h1>
          {room ? (
            <div>
              <IconTextField value={room.room_code}></IconTextField>
            </div>
          ) : null}
          <br></br>
          {props.user.type === 'student' ? (
            <JoinModalButton socket={props.socket} user={props.user} />
          ) : (
            <Button
              variant='contained'
              color='primary'
              onClick={handleRedirect}>
              Join Room
            </Button>
          )}
          <LogoutButton
            socket={props.socket}
            setUser={props.setUser}
            setSocket={props.setSocket}
          />
        </header>
      </div>
    </div>
  );
};

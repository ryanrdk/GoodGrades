import React, { useState, useEffect } from 'react';
import JoinModalButton from '../components/JoinModalButton';
import IconTextField from '../components/IconTextField';
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
        'http://localhost:5000/api/users/' +
        props.user.unique_id +
        '/room';
      fetch(targetUrl)
        .then(blob => blob.json())
        .then(data => {
          console.table(data);
          setRoom(data);
          return data;
        })
        .catch(e => {
          console.log(e);
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
          <h1>Welcome {props.user ? props.user.givenName : 'huest'}</h1>
          {room ? (
            <div>
              <IconTextField value={room.room_code}></IconTextField>
            </div>
          ) : null}
          <br></br>
          {props.user.type === 'student' ? (
            <JoinModalButton />
          ) : (
            <Button
              variant='contained'
              color='primary'
              onClick={handleRedirect}>
              Join Room
            </Button>
          )}
        </header>
      </div>
    </div>
  );
};

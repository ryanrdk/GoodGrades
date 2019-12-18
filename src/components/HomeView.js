import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import Button from '@material-ui/core/Button';
import JoinModalButton from '../components/JoinModalButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';

//Makes API call to GoodGradesServer to create a new room object

export const HomeView = props => {
  const [room, setRoom] = useState(null);

  const createRoom = () => {
    var targetUrl = 'https://good-grades-server.herokuapp.com/api/rooms';
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
  };

  useEffect(() => {
    if (!room && props.user.type == 'tutor'){
      var targetUrl = 'http://localhost:5000/api/users/' + props.user.email + '/room';
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
    
  });

  return (
    <div>
      <div className='App'>
        <header className='App-header'>
          <h1>Welcome {props.user.name}</h1>
          {room ? <h2>{room.room_code}</h2> : null}
          {room ? (
            <CopyToClipboard text={room.room_code}>
              <button>Copy to Clipboard</button>
            </CopyToClipboard>
          ) : null}
          <img src={logo} className='App-logo' alt='logo' />
          <Button variant='contained' color='primary' onClick={createRoom}>
            Create Room
          </Button>
          <br></br>
          <JoinModalButton />
        </header>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import logo from '../logo.svg';
import Button from '@material-ui/core/Button';
import JoinModalButton from '../components/JoinModalButton';

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

  return (
    <div>
      <div className='App'>
        <header className='App-header'>
          {room ? <h2>{room.room_code}</h2> : <></>}
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

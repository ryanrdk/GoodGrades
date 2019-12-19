import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import JoinModalButton from '../components/JoinModalButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import { Button } from '@material-ui/core';


//Makes API call to GoodGradesServer to create a new room object

export const HomeView = props => {
  const [room, setRoom] = useState(null);
  const [redirect, setRedirect] = React.useState(false);

  const handleRedirect = () => {
    console.log({redirect});
    setRedirect(!redirect);
  }

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
    if (!room && props.user.type === 'tutor'){
      var targetUrl = 'https://good-grades-server.herokuapp.com/api/users/' + props.user.email + '/room';
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
      window.location.assign("//room.sh/go/" + room.room_code);
    }
  });

  return (
    <div>
      <div className='App'>
        <header className='App-header'>
          <h1>Welcome {props.user.givenName}</h1>
          {room ? <h2>{room.room_code}</h2> : null}
          {room ? (
            <div>
              <WhatsappShareButton title='Room Code:' url={room.room_code}>
                <WhatsappIcon round={true} />
              </WhatsappShareButton>
              <CopyToClipboard text={room.room_code}>
                <button>Copy to Clipboard</button>
              </CopyToClipboard>
            </div>
          ) : null}
          <img src={logo} className='App-logo' alt='logo' />
          <br></br>
          {props.user.type === "student" ? <JoinModalButton /> : 
          
            <Button variant='contained' color='secondary' onClick={handleRedirect}>
              Join Room
            </Button>}
          
          
        </header>
      </div>
    </div>
  );
};

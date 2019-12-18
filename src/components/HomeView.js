import React, { useState } from 'react';
import logo from '../logo.svg';
import JoinModalButton from '../components/JoinModalButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';

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
          <JoinModalButton />
          <button onClick={createRoom}>Butt</button>
        </header>
      </div>
    </div>
  );
};

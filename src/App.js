import React, {useState} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Modal from './components/Modal';

//Makes API call to GoodGradesServer to create a new room object


const NavBar = () => (
  <div className='navbar'>
    <h3>Task Manager</h3>
    <Link to='/'>Current Tasks</Link>
    <Link to='/completed'>Completed Tasks</Link>
  </div>
);

const Template = props => {

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
  }

  return (
    <div>
      <NavBar />
      <div className='App'>
        <header className='App-header'>
          {room ? <h2>{room.room_code}</h2> : <></>}
          <img src={logo} className='App-logo' alt='logo' />
          <Button variant='contained' color='primary' onClick={createRoom}>
            Create Room
          </Button>
          <br></br>
          <Modal />
        </header>
      </div>
    </div>
  )
};

function CurrentTasks () {
  return (
    <Template title='Current Tasks' status='Current' />
  );
}

function CompletedTasks () {
  return (
    <Template title='Completed Tasks' status='Completed' />
  );
}

function App() {
  return (
    <BrowserRouter>
        <div>
          <Route exact path='/' component={CurrentTasks} />
          <Route path='/completed' component={CompletedTasks} />
        </div>
    </BrowserRouter>
  );
}

export default App;

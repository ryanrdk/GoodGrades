import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Modal from './components/Modal';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Button variant='contained' color='primary'>
          Create Room
        </Button>
        <br></br>
        <Modal />
      </header>
    </div>
  );
}

export default App;

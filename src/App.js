import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Modal from './components/Modal';

const NavBar = () => (
  <div className='navbar'>
    <h3>Task Manager</h3>
    <Link to='/'>Current Tasks</Link>
    <Link to='/completed'>Completed Tasks</Link>
  </div>
);

const Template = props => (
  <div>
    <NavBar />
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
  </div>
);

const CurrentTasks = () => <Template title='Current Tasks' status='Current' />;

const CompletedTasks = () => (
  <Template title='Completed Tasks' status='Completed' />
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={CurrentTasks} />
          <Route path='/completed' component={CompletedTasks} />
        </div>
      </BrowserRouter>
    );
  }
}

// function App() {
//   return (
//     <div className='App'>
//       <header className='App-header'>
//         <img src={logo} className='App-logo' alt='logo' />
//         <Button variant='contained' color='primary'>
//           Create Room
//         </Button>
//         <br></br>
//         <Modal />
//       </header>
//     </div>
//   );
// }

export default App;

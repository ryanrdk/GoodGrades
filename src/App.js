import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'typeface-roboto';
import './App.css';
import TopNavigation from './components/TopNavigation';
import Login from './authentication/Login';
import { PrivateRoute } from './authentication/Login';
import { BookingsView } from './views/BookingsView';
import { HomeView } from './views/HomeView';
import SchedulerView from './views/SchedulerView';
import SwipeableRoutes from 'react-swipeable-routes';
import { Button } from '@material-ui/core';
import socketIOClient from "socket.io-client";
import {USER_CONNECTED, LOGOUT, RECEIVEQUICKHELP, QUICKHELPRESPONSE, NOTIFICATION} from './socketEvents';

// import useStateWithLocalStorage from './components/UseStateWithLocalStorage.js';

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
      JSON.parse(localStorage.getItem(localStorageKey)) || {}
  );
  React.useEffect(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};

const socketEndpoint = 'http://localhost:5000';

function App() {
  const [user, setUser] = useStateWithLocalStorage('user');
  const [booked, setBooked] = useState(null);
  const [quickHelp, setQuickHelp] = useState([]);
  const [socket, setSocket] = useState(null);

  const getBookings = () => {
    var targetUrl = user.type === "tutor" ?
    'https://good-grades-server.herokuapp.com/api/events/byTutor/' + user.unique_id + '/booked'
    :
    'https://good-grades-server.herokuapp.com/api/events/byStudent/' + user.unique_id
    fetch(targetUrl)
      .then(blob => blob.json())
      .then(data => {
        console.log({data})
        setBooked(data);
        return data;
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  }

  const getQuickHelp = () => {
    var targetUrl = 'https://good-grades-server.herokuapp.com/api/quickHelp'
    fetch(targetUrl)
    .then(blob => blob.json())
    .then(data => {
      setQuickHelp(data);
      return data;
    })
    .catch(e => {
      return e;
    });
  }

  useEffect(()=>{
    // localStorage.removeItem('user');
    if (!socket && user && user.unique_id){
      setSocket(sok => {
        sok = socketIOClient(socketEndpoint);
        sok.emit(USER_CONNECTED, user);
        if (user.type === "tutor"){
          sok.on(RECEIVEQUICKHELP, data => {
            setQuickHelp([...quickHelp, data])
          });
          getQuickHelp();
        }
        else {
          sok.on(QUICKHELPRESPONSE, data => {
            console.log(data)
          })
        }
        return sok;
      });
    }
    if (!booked && user.unique_id) {
      getBookings()
    }
  })

  const logout = () => {
    socket.emit(LOGOUT);
    setSocket(null)
    localStorage.removeItem('user');
    setUser(null)
  }

  return (
    <BrowserRouter>
      <div>
        <Route
          path='/login'
          render={props => <Login {...props} handleSetUser={setUser} />}
        />
        <PrivateRoute user={user}>
          <Button onClick={logout}>Logout</Button>
          <TopNavigation />
          <SwipeableRoutes>
            <Route
              exact
              path='/bookings'
              render={props => <BookingsView {...props} user={user} booked={booked} socket={socket} refreshBookings={getBookings} quickHelp={quickHelp}/>}
            />
            <Route
              exact
              path='/'
              render={props => <HomeView {...props} user={user} socket={socket}/>}
            />
            <Route
              exact
              path='/scheduler'
              render={props => <SchedulerView {...props} user={user} refreshBookings={getBookings}/>}
            />
          </SwipeableRoutes>
        </PrivateRoute>
      </div>
    </BrowserRouter>
  );
}

export default App;

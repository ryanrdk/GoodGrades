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


function App() {
  const [user, setUser] = useStateWithLocalStorage('user');
  const [booked, setBooked] = useState(null);

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

  useEffect(()=>{
    // localStorage.removeItem('user');

    if (!booked && user.unique_id) {
      getBookings()
    }
  })

  const logout = () => {
    localStorage.removeItem('user');
    setUser({})
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
              render={props => <BookingsView {...props} user={user} booked={booked} refreshBookings={getBookings}/>}
            />
            <Route
              exact
              path='/'
              render={props => <HomeView {...props} user={user} />}
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

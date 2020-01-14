import React, { useState } from 'react';
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

function App() {
  const [user, setUser] = useState({});
  const [room, setRoom] = useState({});

  const handleSetUser = data => {
    setUser(data);
  };

  return (
    <BrowserRouter>
      <div>
        <Route
          path='/login'
          render={props => <Login {...props} handleSetUser={handleSetUser} />}
        />
        <PrivateRoute>
          <TopNavigation />
          <SwipeableRoutes>
            <Route
              exact
              path='/bookings'
              render={props => <BookingsView {...props} user={user} room={room}/>}
            />
            <Route
              exact
              path='/'
              render={props => <HomeView {...props} user={user} />}
            />
            <Route
              exact
              path='/scheduler'
              render={props => <SchedulerView {...props} user={user} />}
            />
          </SwipeableRoutes>
        </PrivateRoute>
      </div>
    </BrowserRouter>
  );
}

export default App;

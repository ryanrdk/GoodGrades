import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'typeface-roboto';
import './App.css';
import Login from './authentication/Login';
import { PrivateRoute } from './authentication/Login';
import { BookingsView } from './views/BookingsView';
import { HomeView } from './views/HomeView';
import { SchedulerView } from './views/SchedulerView';
import SwipeableRoutes from 'react-swipeable-routes';

function App() {
  const [user, setUser] = useState({});

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
        <SwipeableRoutes>
          <PrivateRoute
            exact
            path='/bookings'
            render={props => <BookingsView {...props} user={user} />}
          />
          <PrivateRoute
            exact
            path='/'
            render={props => <HomeView {...props} user={user} />}
          />
          <PrivateRoute
            exact
            path='/scheduler'
            render={props => <SchedulerView {...props} user={user} />}
          />
        </SwipeableRoutes>
      </div>
    </BrowserRouter>
  );
}

export default App;

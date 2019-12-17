import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Login from './authentication/Login';
import { PrivateRoute } from './authentication/Login';
import { HomeView } from './components/HomeView';

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
        <PrivateRoute exact path='/' component={HomeView} />
      </div>
    </BrowserRouter>
  );
}

export default App;

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
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isMobile } from 'react-device-detect';

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
  const [notifications] = useState([]);

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
        data.forEach(elem => {
          let isDuplicateNotification = notifications.some(elem2 => {
            return (elem.tutor === elem2.booking.tutor && elem.start_time === elem2.booking.start_time)
          });
          if (!isDuplicateNotification) {
            notifications.push({ time_type: 1, booking: elem })
          }
        })
        return data;
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  }

  const sendNotification = (elem, time_diff) => {
    toast(<div>
      {time_diff + 1} min till session starts<br/>
      {user.type === "tutor" ? `Student : ${elem.booking.students[0].username}` : `Tutor : ${elem.booking.tutor_username}`}<br/>
      {/* Tutor : {elem.booking.tutor_username}<br/> */}
      {/* Student : { elem.booking.students[0].username }<br/> */}
      {/* Date : { moment(elem.booking.start_time).format("dddd, MMM DD") }<br/> */}
      Time : { moment(elem.booking.start_time).format("hh:mm a") } - { moment(elem.booking.end_time).format("hh:mm a") }<br/>
      </div>
      , {
        autoClose: 10000,
        type: toast.TYPE.INFO,
      })
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
    const interval = setInterval(() => {
      notifications.forEach((elem, indx, arr) => {
        let time_diff = moment(elem.booking.start_time).diff(Date.now(), 'minutes')
        if (elem.time_type !== 2 && time_diff > 30 && time_diff < 60) {
          sendNotification(elem, time_diff);
          arr[indx].time_type = 2;
        } else if (elem.time_type !== 3 && time_diff > 15 && time_diff < 30) {
          sendNotification(elem, time_diff);
          arr[indx].time_type = 3;
        } else if (elem.time_type !== 4 && time_diff > 0 && time_diff < 15) {
          sendNotification(elem, time_diff);
          arr[indx].time_type = 4;
        }
      });
      }, 5000);
    return () => clearInterval(interval);
  })

  const logout = () => {
    socket.emit(LOGOUT);
    setSocket(null)
    localStorage.removeItem('user');
    setUser(null)
  }

  return (
    <BrowserRouter>
     <ToastContainer position={isMobile ? "top-center" : "bottom-left"}/>
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

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
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isMobile } from 'react-device-detect';

function App() {
  const [user, setUser] = useState({});
  const [booked, setBooked] = useState(null);
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

  useEffect(()=>{
    if (!booked && user.unique_id) {
      getBookings()
    }
    const interval = setInterval(() => {
      console.log("Notifs", notifications, user)
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

  return (
    <BrowserRouter>
    <ToastContainer position={isMobile ? "top-center" : "bottom-left"}/>
      <div>
        <Route
          path='/login'
          render={props => <Login {...props} handleSetUser={setUser} />}
        />
        <PrivateRoute>
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

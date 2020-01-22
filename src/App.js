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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

function App() {
  const [user, setUser] = useState({});
  const [booked, setBooked] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const getBookings = () => {
    if (user.unique_id) {
      var targetUrl = user.type === "tutor" ?
      'https://good-grades-server.herokuapp.com/api/events/byTutor/' + user.unique_id + '/booked'
      :
      'https://good-grades-server.herokuapp.com/api/events/byStudent/' + user.unique_id
      fetch(targetUrl)
        .then(blob => blob.json())
        .then(data => {
          console.log({data})
          // toast(`Ello ${data[0].tutor_username}`, {
          //   autoClose: false
          // })
          // data.foreach(elem => {
          //   toast(`Tutor : {elem.tutor_username} <br></br>
          //   Student : { elem.students[0].username } <br></br>
          //   Date : { moment(elem.start_time).format("dddd, MMM DD") } <br></br>
          //   Time : { moment(elem.start_time).format("hh:mm a") } - { moment(elem.end_time).format("hh:mm a") } <br></br>`, {
          //     autoClose: false
          //   })
          // })
          data.forEach(elem => {
            // console.log("Happy")
            // toast(<div>Tutor : {elem.tutor_username}<br/>
            // Student : { elem.students[0].username }<br/>
            // Date : { moment(elem.start_time).format("dddd, MMM DD") }<br/>
            // Time : { moment(elem.start_time).format("hh:mm a") } - { moment(elem.end_time).format("hh:mm a") }<br/></div>, {
            //   autoClose: false,
            //   type: toast.TYPE.INFO,
            // })
            let isDuplicateNotification = notifications.some(elem2 => {
              console.log("Notifs elem", elem, elem2)
              return (elem.tutor === elem2.booking.tutor && elem.start_time === elem2.booking.start_time)
            });
            console.log("Notifs comp",isDuplicateNotification)
            if (!isDuplicateNotification) {
              // setNotifications([...notifications, elem]);
              notifications.push({ time_type: 1, booking: elem }) //time_type=1 -> initial, time_type=2 -> 1 hour before, time_type=3 -> 30min before
              // toast(<div>Tutor : {elem.tutor_username}<br/>
              //   Student : { elem.students[0].username }<br/>
              //   Date : { moment(elem.start_time).format("dddd, MMM DD") }<br/>
              //   Time : { moment(elem.start_time).format("hh:mm a") } - { moment(elem.end_time).format("hh:mm a") }<br/></div>, {
              //     autoClose: false,
              //     type: toast.TYPE.INFO,
              //   })
            }
            // console.log("Notifs", notifications)
          })
          // toast
          console.log("NOtIfs", notifications)
          notifications.forEach((elem, indx, arr) => {
            console.log("TIME DIFF", (new Date(elem.booking.start_time) - Date.now())/(60*1000))
            let time_diff = moment(elem.booking.start_time).diff(Date.now(), 'minutes')
            // console.log("Time comp", time_diff < 30)
            if (elem.time_type !== 2 && time_diff > 30 && time_diff <= 60) {
              console.log("Time 1 hour be4!")
              toast(<div>
              1 hour or less till session starts<br/>
              {/* Tutor : {elem.booking.tutor_username}<br/> */}
              Student : { elem.booking.students[0].username }<br/>
              {/* Date : { moment(elem.booking.start_time).format("dddd, MMM DD") }<br/> */}
              Time : { moment(elem.booking.start_time).format("hh:mm a") } - { moment(elem.booking.end_time).format("hh:mm a") }<br/>
              </div>
              , {
                autoClose: false,
                type: toast.TYPE.INFO,
              })
              arr[indx].time_type = 2;
            } else if (elem.time_type !== 3 && time_diff > 15 && time_diff <= 30) {
              console.log("Time 30 min be4!")
              toast(<div>
              30 min or less till session starts<br/>
              {/* Tutor : {elem.booking.tutor_username}<br/> */}
              Student : { elem.booking.students[0].username }<br/>
              {/* Date : { moment(elem.booking.start_time).format("dddd, MMM DD") }<br/> */}
              Time : { moment(elem.booking.start_time).format("hh:mm a") } - { moment(elem.booking.end_time).format("hh:mm a") }<br/>
              </div>
              , {
                autoClose: false,
                type: toast.TYPE.INFO,
              })
              arr[indx].time_type = 3;
            } else if (elem.time_type !== 4 && time_diff > 0 && time_diff <= 15) {
              console.log("Time 15 min be4!")
              toast(<div>
              15 min or less till session starts<br/>
              {/* Tutor : {elem.booking.tutor_username}<br/> */}
              Student : { elem.booking.students[0].username }<br/>
              {/* Date : { moment(elem.booking.start_time).format("dddd, MMM DD") }<br/> */}
              Time : { moment(elem.booking.start_time).format("hh:mm a") } - { moment(elem.booking.end_time).format("hh:mm a") }<br/>
              </div>
              , {
                autoClose: false,
                type: toast.TYPE.INFO,
              })
              arr[indx].time_type = 4;
            }
            
            // if (elem.time_type != 2 && time_diff < 30) {
            //   toast(<div>
            //     30 min or less till session starts
            //     {/* Tutor : {elem.tutor_username}<br/> */}
            //     Student : { elem.students[0].username }<br/>
            //     {/* Date : { moment(elem.start_time).format("dddd, MMM DD") }<br/> */}
            //     Time : { moment(elem.start_time).format("hh:mm a") } - { moment(elem.end_time).format("hh:mm a") }<br/>
            //     </div>
            //     , {
            //       autoClose: false,
            //       type: toast.TYPE.INFO,
            //     })
            //     arr[indx].time_type = 2;
            // }
          });
          setBooked(data);
          return data;
        })
        .catch(e => {
          console.log(e);
          return e;
        });

    }
  }

  useEffect(()=>{
    // if (user.unique_id) {
      const interval = setInterval(() => {
        // () => {
        //   if (user.unique_id) {
        //     getBookings()
        //     if (!booked) {
        //       console.log("Fetched Nothing");
        //     } else {
        //       console.log("Fetched data for booking", {booked});
        //     }
        //     // console.log("Fetched Data", booked)
        //   } else {
        //     console.log("Fetched Nothing 2.0", booked)
        //   }
        // }
        // if (!booked && user.unique_id) {
        //   // if (!booked) {
        //   //   console.log("Fetched Nothing");
        //   // } else {
        //   //   console.log("Fetched data for booking", {booked});
        //   // }
        //   getBookings()
        //   console.log("Fetched Data", booked)
        // } else {
        //   console.log("Fetched Nothing 2.0", booked)
        // }
        // if (!booked && user.unique_id) {
        //   getBookings()
        //   console.log("Fetched data for booking", {booked});
        // }
        // else console.log("Fetched nothing")
        // else if (booked) {
        //   booked.forEach(elem => {
        //     console.log("Happy")
        //     toast(<div>Tutor : {elem.tutor_username}<br/>
        //     Student : { elem.students[0].username }<br/>
        //     Date : { moment(elem.start_time).format("dddd, MMM DD") }<br/>
        //     Time : { moment(elem.start_time).format("hh:mm a") } - { moment(elem.end_time).format("hh:mm a") }<br/></div>, {
        //       autoClose: false,
        //       type: toast.TYPE.INFO,
        //     })
        //   })
        // }
        getBookings();
        // if (booked) console.log("Fetched ", booked)
        // else console.log("Fetched Nothing 4.0")
        }, 5000);
        return () => clearInterval(interval);
      // }
    }, [])

  return (
    <BrowserRouter>
    <ToastContainer position="bottom-left"/>
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

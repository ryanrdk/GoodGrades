import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ONE_HOUR = 60 * 60 * 1000;


const checkIfHourBeforeSession = (start_time) => {
  let curDate = new Date();
  let curStart = moment(start_time);
  return (curStart - curDate <= ONE_HOUR) ? true : false; //eveny start time - date.now()
}

export const BookingsView = props => {
  const [redirect, setRedirect] = useState(false);

  const handleRedirect = () => {
    setRedirect(!redirect);
  };

  useEffect(() => {
    if (!props.booked){
      props.refreshBookings();
    }
    if (redirect) {
      // do something meaningful, Promises, if/else, whatever, and then
      // console.log("room.sh/go/" + roomCode)
      window.location.assign('//room.sh/go/' + props.user.room_code);
    }
  });

  

  return (
    <div>
      <div className='App'>
        <header className='App-header'>
          <h3>Bookings</h3>
          {/* {props.user.type === 'student'
            ? 'student bookings'
            : 'tutor bookings'}
          <br></br><br></br> */}
          {props.booked && props.booked.length > 0 ? 
                <div>
                <h4>Upcoming Bookings</h4> 
                <br></br></div> : <div>
                    <h4>No Bookings</h4>
                    {props.user.type === 'tutor' ? <h5>Go to the Scheduler to put up appointments</h5> : <h5>Go to the Scheduler to book appointments</h5>}
                </div>}
          {
            props.booked ? props.booked.map((elem, index) => {
              return (
                <div key={index}>
                  <Card>
                    <CardContent>
                      <Typography>
                        Tutor : {elem.tutor_username} <br></br>
                        Student : { elem.students[0].username } <br></br>
                        Date : { moment(elem.start_time).format("dddd, MMM DD") } <br></br>
                        Time : { moment(elem.start_time).format("hh:mm a") } - { moment(elem.end_time).format("hh:mm a") } <br></br>
                      </Typography>
                    </CardContent>
                      { checkIfHourBeforeSession(elem.start_time) ? 
                      <CardActions>
                        <Button size="small" onClick={handleRedirect}>Go To Room</Button>
                      </CardActions> : null }
                  </Card> 
                  <br></br>
                </div>
              )
            }) : <div>
                </div>
          }
        </header>
      </div>
    </div>
  );
};

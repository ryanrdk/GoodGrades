import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from '@material-ui/core';
import { NOTIFICATION } from '../socketEvents';

const ONE_HOUR = 60 * 60 * 1000;

const checkIfHourBeforeSession = start_time => {
  let curDate = new Date();
  let curStart = moment(start_time);
  return curStart - curDate <= ONE_HOUR ? true : false; //eveny start time - date.now()
};

export const BookingsView = props => {
  const [redirect, setRedirect] = useState(false);
  const [roomCode, setRoomCode] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleRedirect = roomCode => {
    setRedirect(!redirect);
    setRoomCode(roomCode);
  };

  const getQuickHelpResponse = student => {
    let targetUrl =
      'https://good-grades-server.herokuapp.com/api/quickHelp/addTutorToQuickHelp';
    fetch(targetUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        tutor_id: props.user.unique_id,
        student_id: student.unique_id
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Rsponding to quickhelp', data);

        props.socket.emit(NOTIFICATION, data, student);
        return data;
      })
      .catch(() => console.log('Error'));
  };

  useEffect(() => {
    if (!props.booked) {
      props.refreshBookings();
    } else {
      setLoading(false);
    }
    if (redirect && roomCode) {
      // do something meaningful, Promises, if/else, whatever, and then
      // console.log("room.sh/go/" + roomCode)
      window.location.assign('//room.sh/go/' + roomCode);
    }
  }, [props, redirect, roomCode]);

  return (
    <div>
      <div className='App'>
        <header className='App-header'>
          {props.quickHelp.length ? (
            props.quickHelp.map((elem, index) => {
              console.log(elem);
              return (
                <div key={index}>
                  <h3>Quick Help</h3>
                  <Card>
                    <CardHeader
                      style={{ textAlign: 'left' }}
                      subheader={`Student : ${elem.student_username}`}
                    />
                    <Divider variant='middle' />
                    <CardActions>
                      <Button
                        size='small'
                        variant='contained'
                        color='primary'
                        onClick={() =>
                          getQuickHelpResponse({
                            username: elem.student_username,
                            unique_id: elem.student_id
                          })
                        }>
                        Help
                      </Button>
                    </CardActions>
                  </Card>
                  <br></br>
                </div>
              );
            })
          ) : (
            <div></div>
          )}

          {loading ? (
            <CircularProgress size={40} />
          ) : (
            <div>
              {/* {props.user.type === 'student'
            ? 'student bookings'
            : 'tutor bookings'}
          <br></br><br></br> */}
              {props.booked && props.booked.length > 0 ? (
                <div>
                  <h4>Upcoming Bookings</h4>
                  <br></br>
                </div>
              ) : (
                <div>
                  <h4>No Bookings</h4>
                  {props.user.type === 'tutor' ? (
                    <Link to='/scheduler'>
                      Go to the Scheduler to put up appointments
                    </Link>
                  ) : (
                    <Link to='/scheduler'>
                      Go to the Scheduler to book appointments
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
          {props.booked ? (
            props.booked.map((elem, index) => {
              return (
                <div key={index}>
                  <Card>
                    <CardHeader
                      style={{ textAlign: 'left' }}
                      title={`Tutor : ${elem.tutor_username}`}
                      subheader={`Student : ${elem.students[0].username}`}
                    />
                    <Divider variant='middle' />
                    <CardContent>
                      <Typography>
                        Date : {moment(elem.start_time).format('dddd, MMM DD')}{' '}
                        <br></br>
                        Time : {moment(elem.start_time).format(
                          'hh:mm a'
                        )} - {moment(elem.end_time).format('hh:mm a')} <br></br>
                      </Typography>
                    </CardContent>
                    {checkIfHourBeforeSession(elem.start_time) ? (
                      <CardActions>
                        <Button
                          variant='contained'
                          size='small'
                          color='primary'
                          onClick={() => handleRedirect(elem.room_code)}>
                          Go To Class
                        </Button>
                      </CardActions>
                    ) : null}
                  </Card>
                  <br></br>
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </header>
      </div>
    </div>
  );
};

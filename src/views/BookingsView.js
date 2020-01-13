import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { tsConstructorType } from '@babel/types';

const ONE_HOUR = 60 * 60 * 1000;

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const checkIfHourBeforeSession = (start_time) => {
  let curDate = new Date();
  let curStart = moment(start_time);
  // console.log("Starting ", curStart.date(), curStart.hour(), curStart.month());
  // console.log("New Date", curDate.getDate(), curDate.getHours(), curDate.getMonth());
  // console.log("DIff", curStart - curDate, "\nHOURS", ONE_HOUR);
  return (curStart - curDate <= ONE_HOUR) ? true : false; //eveny start time - date.now()
}

export const BookingsView = props => {
  const [booked, setBooked] = useState(null);
  const [redirect, setRedirect] = React.useState(false);

  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  console.log("propers", props)

  const handleRedirect = () => {
    console.log({ redirect });
    setRedirect(!redirect);
  };

  useEffect(() => {
    if (!booked) {
      var targetUrl =
        'http://localhost:5000/api/events/byTutor/' + props.user.unique_id + '/booked';
      fetch(targetUrl)
        .then(blob => blob.json())
        .then(data => {
          console.table("booked", data);
          setBooked(data);
          return data;
        })
        .catch(e => {
          console.log(e);
          return e;
        });
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
          <h1>Bookings</h1>
          <br></br>
          {props.user.type === 'student'
            ? 'student bookings'
            : 'tutor bookings'}
          <br></br><br></br>
          {
            booked ? booked.map(elem => {
              return (
                <div>
                  <Card>
                    <CardContent>
                      <Typography>
                        Student : { elem.students[0].username } <br></br>
                        Date : { moment(elem.start_time).format("dddd, MMM DD") } <br></br>
                        Session : { moment(elem.start_time).format("hh:mm a") } - { moment(elem.end_time).format("hh:mm a") } <br></br>
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
            }) : console.log("empteee")
          }
        </header>
      </div>
    </div>
  );
};

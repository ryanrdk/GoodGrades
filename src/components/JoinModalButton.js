import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Backdrop,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Modal
} from '@material-ui/core';
import { School } from '@material-ui/icons';
import { isMobile } from 'react-device-detect';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { NOTIFICATION } from '../socketEvents.js';

var colors = ['#f50057', '#1de9b6', '#00b0ff'];
var random_color = colors[Math.floor(Math.random() * colors.length)];

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 180
  },
  cardStudent: {
    maxWidth: 480,
    marginBottom: 32
  },
  cardMobileStudent: { maxWidth: '80vw', marginBottom: 32 },
  media: {
    height: '30vh !important',
    maxWidth: '80vw',
    backgroundSize: 'contain'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    backgroundColor: random_color
  },
  title: {
    fontVariant: 'h3',
    textAlign: 'center'
  }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func
};

export default function SpringModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [roomCode, setRoomCode] = React.useState(null);

  useEffect(() => {
    if (redirect) {
      // do something meaningful, Promises, if/else, whatever, and then
      // console.log("room.sh/go/" + roomCode)
      window.location.assign('//room.sh/go/' + roomCode);
    }
  });

  const handleRedirect = () => {
    console.log({ redirect });
    setRedirect(!redirect);
  };

  const handleChange = event => {
    setRoomCode(event.target.value);
    console.log({ roomCode });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const notifyTutors = () => {
    let targetUrl =
      'https://good-grades-server.herokuapp.com/api/quickHelp/createQuickHelp';
    fetch(targetUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        student_id: props.user.unique_id
      })
    })
      .then(response => response.json())
      .then(data => {
        // props.socket.emit(NOTIFICATION, {student_id: , student_username: , tutor_id: , tutor_username: , createAt: }, "tutors");
        props.socket.emit(NOTIFICATION, data, 'tutor');
        return data;
      })
      .catch(() => console.log('Error'));
  };

  return (
    <div>
      <Card
        className={isMobile ? classes.cardMobileStudent : classes.cardStudent}>
        <CardHeader
          avatar={
            <Avatar
              style={{ marginRight: 8 }}
              aria-label='avatar'
              className={classes.avatar}>
              {props.user.givenName.charAt(0)}
            </Avatar>
          }
          style={{ textAlign: 'left' }}
          title={`Welcome ${props.user ? props.user.givenName : 'Guest'}`}
          titleTypographyProps={{ variant: 'overline' }}
        />
        <CardMedia
          className={classes.media}
          image='/img/logo.png'
          title='Good Grades Logo'
        />
        <Divider variant='middle' />
        <CardActions className={classes.actions}>
          <Button
            style={{ margin: 14 }}
            variant='contained'
            color='primary'
            onClick={handleOpen}>
            Join Room
          </Button>
          <Button
            style={{ margin: 14, backgroundColor: '#f50057', color: '#fff' }}
            variant='contained'
            onClick={notifyTutors}>
            Quick Help
          </Button>
        </CardActions>
      </Card>
      <Modal
        aria-labelledby='spring-modal-title'
        aria-describedby='spring-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={open}>
          <Card className={classes.card}>
            <CardContent>
              <FormControl className={classes.margin}>
                <form onSubmit={handleRedirect}>
                  <InputLabel htmlFor='input-with-icon-adornment'>
                    Unique Room Code
                  </InputLabel>
                  <Input
                    id='input-with-icon-adornment'
                    type='text'
                    name='name'
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position='start'>
                        <School />
                      </InputAdornment>
                    }
                    fullWidth='true'
                  />
                  <Button type='submit' value='Submit'></Button>
                </form>
              </FormControl>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}

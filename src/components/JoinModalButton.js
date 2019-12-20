import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Backdrop,
  Card,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Modal
} from '@material-ui/core';
import School from '@material-ui/icons/School';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

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

export default function SpringModal() {
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

  return (
    <div>
      <Button variant='contained' color='secondary' onClick={handleOpen}>
        Join Room
      </Button>
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

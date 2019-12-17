import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { Backdrop } from '@material-ui/core';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
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

  const handleRedirect = () => {
    console.log({redirect});
    setRedirect(!redirect);
  }

  const renderRedirect = () => {
    console.log({roomCode})
    if (redirect) {
      return <Route path='/privacy-policy' component={() => { 
                    window.location.href = 'https://room.sh/go' + roomCode; 
                    return null;
              }}/>
    }
  }

  const handleChange = (event) => {
    setRoomCode(event.target.value)
    console.log({roomCode});
  }

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
      {redirect ? renderRedirect : <></>}
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
          <div className={classes.paper}>
            <form onSubmit = {handleRedirect}>
              <label>
                Unique Code
                <input type="text" name="name" onChange={handleChange}/>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

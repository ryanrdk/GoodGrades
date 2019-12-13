import React, {useState} from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Modal from './components/Modal';
import { GoogleLogin } from 'react-google-login';

//Makes API call to GoodGradesServer to create a new room object


const NavBar = () => (
  <div className='navbar'>
    <h3>Task Manager</h3>
    <Link to='/'>Current Tasks</Link>
    <Link to='/completed'>Completed Tasks</Link>
  </div>
);

const Template = props => {

  const [room, setRoom] = useState(null);

  const createRoom = () => {
    var targetUrl = 'https://good-grades-server.herokuapp.com/api/rooms';
    fetch(targetUrl)
      .then(blob => blob.json())
      .then(data => {
        console.table(data);
        setRoom(data);
        return data;
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  }

  return (
    <div>
      <NavBar />
      <div className='App'>
        <header className='App-header'>
          {room ? <h2>{room.room_code}</h2> : <></>}
          <img src={logo} className='App-logo' alt='logo' />
          <Button variant='contained' color='primary' onClick={createRoom}>
            Create Room
          </Button>
          <br></br>
          <Modal />
        </header>
      </div>
    </div>
  )
};

function CurrentTasks () {
  return (
    <Template title='Current Tasks' status='Current' />
  );
}

function CompletedTasks () {
  return (
    <Template title='Completed Tasks' status='Completed' />
  );
}

const responseGoogle = (response) => {
  console.log(response);
}

function LoginButton (props) {
  return (
    <div>
      <NavBar />
      <div className='App'>
        <header className='App-header'>
          <GoogleLogin
            clientId="198987621325-8mjc0d3e410b1lt5goj0hj81qmrni2bk.apps.googleusercontent.com"
            buttonText="Continue with Google"
            onSuccess={props.login}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </header>
      </div>
    </div>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = (response) => {
    this.props.handleSetUser(response)
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <LoginButton login={this.login} />
      </div>
    )
  }
}

function App() {
  const [user, setUser] = useState({});

  const handleSetUser = (data) => {
    setUser(data);
  }

  return (
    <BrowserRouter>
        <div>
          <Route path='/login' render={(props) => <Login {...props} handleSetUser={handleSetUser} />}/>
          <PrivateRoute exact path='/' component={CurrentTasks} />
          <PrivateRoute path='/completed' component={CompletedTasks} />
        </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import ReactLoading from 'react-loading';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import LoginCard from '../components/LoginCard';

const responseGoogle = response => {
  console.log(response);
};

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    redirectToUserType: false,
    user: {},
    profileObj: {},
    loading: false
  }

  login = response => {
    var targetUrl =
      'https://good-grades-server.herokuapp.com/api/users/' +
      response.profileObj.email;
    console.log(targetUrl);
    fetch(targetUrl)
      .then(blob => blob.json())
      .then(data => {
        if (data.email && data.type) {
          //continue to login
          fakeAuth.authenticate(() => {
            this.setState(() => ({
              redirectToReferrer: true
            }));
          });
          this.props.handleSetUser({ ...response.profileObj, type: data.type });
        } else {
          this.setState(() => ({
            profileObj: response.profileObj,
            redirectToUserType: true,
            user: {
              email: response.profileObj.email,
              username: response.profileObj.name
            }
          }));
        }

        console.log(data);
        return data;
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  };

  createUser = (response) => {

    let tmp = {...this.state.user, type: response};
    this.setState({user: tmp, loading: true});
    var targetUrl = 'https://good-grades-server.herokuapp.com/api/users/createUser'
    fetch(targetUrl, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ ...this.state.user, type: response }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(blob => {
        return blob.json();
      })
      .then(data => {
        console.log(data);
        if (data.email && data.type) {
          //continue to login
          fakeAuth.authenticate(() => {
            this.setState(() => ({
              redirectToUserType: false,
              redirectToReferrer: true,
              loading: false,
            }))
          })
          console.log({data, response});
          this.props.handleSetUser({...this.state.profileObj, type: data.type})
        }
        return data;
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer, redirectToUserType, loading } = this.state

    if (loading === true){
      return <div>
              <div className='App'>
                <header className='App-header'>
                <ReactLoading height={'20%'} width={'20%'} />
                </header>
              </div>
            </div>
    }

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    if (redirectToUserType === true) {
      return (
        <div>
          <div className='App'>
            <header className='App-header'>
              <Card raised='true' style={{ width: 320 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h4'
                    color='textSecondary'
                    component='h2'>
                    Are you a
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant='contained'
                    color='primary'
                    value='student'
                    fullWidth='true'
                    onClick={() => this.createUser('student')}>
                    Student
                  </Button>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'>
                    or
                    <Divider orientation='vertical' />
                  </Typography>
                  <Button
                    variant='contained'
                    color='primary'
                    value='tutor'
                    fullWidth='true'
                    onClick={() => this.createUser('tutor')}>
                    Tutor
                  </Button>
                </CardActions>
              </Card>
            </header>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className='App'>
          <header className='App-header'>
            <LoginCard />
            <GoogleLogin
              clientId="198987621325-9g2b66kr257qqep3dk5vn9ovmlg22q2m.apps.googleusercontent.com"
              buttonText='Continue with Google'
              onSuccess={this.login}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </header>
        </div>
      </div>
    );
  }
}

export default Login;

import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
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
import './GoogleButton.css';
import './FacebookButton.css';

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

export const PrivateRoute = props => {
  //let test = localStorage.getItem('user');
  //console.log(test);
  return (
    <Fragment>
      {props.user && props.user.unique_id ? (
        props.children
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )}
    </Fragment>
  );
};

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    redirectToUserType: false,
    user: {},
    profileObj: {},
    loading: false
  };

  login = response => {
    let { profileObj } = this.state;
    if (!response.profileObj) {
      let names = response.name;
      if (names === undefined) {
        return 'error';
      }
      names = names.split(' ');
      profileObj.givenName = names[0];
      profileObj.familyName = names[names.length - 1];
      profileObj.unique_id = response.userID;
      profileObj = { ...profileObj, ...response };
    } else {
      profileObj = response.profileObj;
      profileObj.unique_id = response.profileObj.googleId;
    }
    var targetUrl =
      'https://good-grades-server.herokuapp.com/api/users/' +
      profileObj.unique_id;
    this.setState({ loading: true });
    fetch(targetUrl)
      .then(blob => blob.json())
      .then(data => {
        if (data.type) {
          //continue to login
          fakeAuth.authenticate(() => {
            this.setState(() => ({
              loading: false,
              redirectToReferrer: true
            }));
          });
          this.props.handleSetUser({ ...profileObj, type: data.type });
        } else {
          this.setState(() => ({
            loading: false,
            profileObj: profileObj,
            redirectToUserType: true,
            user: {
              unique_id: profileObj.unique_id,
              email: profileObj.email,
              username: profileObj.name
            }
          }));
          console.log(`Proffesor Object: ${this.state.profileObj}`);
          console.log(this.state.profileObj);
          try {
            let undf = this.state.profileObj;
            if (undf) {
              console.log('not undefined');
            } else {
              undf.split();
            }
          } catch (error) {
            console.log(`HEYEEYEYE: ${error}`);
            console.log(error);
            return error;
          }
        }
        return data;
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  };

  createUser = response => {
    let tmp = { ...this.state.user, type: response };
    this.setState({ user: tmp, loading: true });
    var targetUrl =
      'https://good-grades-server.herokuapp.com/api/users/createUser';
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
        // console.log(data);
        if (data.unique_id && data.type) {
          //continue to login
          fakeAuth.authenticate(() => {
            this.setState(() => ({
              redirectToUserType: false,
              redirectToReferrer: true,
              loading: false
            }));
          });
          // console.log({ data, response });
          this.props.handleSetUser({
            ...this.state.profileObj,
            type: data.type
          });
        }
        return data;
      })
      .catch(e => {
        // console.log(e);
        return e;
      });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer, redirectToUserType, loading } = this.state;

    if (loading === true) {
      return (
        <div>
          <div className='App'>
            <header className='App-header'>
              {/* <ReactLoading height={'20%'} width={'20%'} /> */}
              <ReactLoading
                type={'spinningBubbles'}
                height={'10%'}
                width={'10%'}
              />
            </header>
          </div>
        </div>
      );
    }

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    if (redirectToUserType === true) {
      return (
        <div>
          <div className='App'>
            <header className='Login-header'>
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
          <header className='Login-header'>
            <LoginCard />
            <GoogleLogin
              clientId='198987621325-9g2b66kr257qqep3dk5vn9ovmlg22q2m.apps.googleusercontent.com'
              buttonText='Login with Google'
              onSuccess={this.login}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <button
                  type='button'
                  className='google-button'
                  onClick={renderProps.onClick}>
                  <span className='google-button__icon'>
                    <svg
                      viewBox='0 0 366 372'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z'
                        id='Shape'
                        fill='#EA4335'
                      />
                      <path
                        d='M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z'
                        id='Shape'
                        fill='#FBBC05'
                      />
                      <path
                        d='M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z'
                        id='Shape'
                        fill='#4285F4'
                      />
                      <path
                        d='M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z'
                        fill='#34A853'
                      />
                    </svg>
                  </span>
                  <span className='google-button__text'>
                    Sign in with Google
                  </span>
                </button>
              )}
            />
            <FacebookLogin
              appId='473647886861679'
              autoLoad={false}
              fields='name,email,picture'
              callback={this.login}
              disableMobileRedirect={true}
              redirectUri={window.location.href}
              render={renderProps => (
                <button className='btn-fb' onClick={renderProps.onClick}>
                  <div className='fb-content'>
                    <div className='logo'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='32'
                        height='32'
                        viewBox='0 0 32 32'
                        version='1'>
                        <path
                          fill='#FFFFFF'
                          d='M32 30a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v28z'
                        />
                        <path
                          fill='#4267b2'
                          d='M22 32V20h4l1-5h-5v-2c0-2 1.002-3 3-3h2V5h-4c-3.675 0-6 2.881-6 7v3h-4v5h4v12h5z'
                        />
                      </svg>
                    </div>
                    <p>Sign in with Facebook</p>
                  </div>
                </button>
              )}
            />
          </header>
        </div>
      </div>
    );
  }
}

export default Login;

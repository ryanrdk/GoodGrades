import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Button from '@material-ui/core/Button';

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
        <Component {...props} {...rest}/>
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
    profileObj: {}
  }

  login = (response) => {
    var targetUrl = 'https://good-grades-server.herokuapp.com/api/users/' + response.profileObj.email;
    console.log(targetUrl)
    fetch(targetUrl)
      .then(blob => blob.json())
      .then(data => {
        if (data.email && data.type){
          //continue to login
          fakeAuth.authenticate(() => {
            this.setState(() => ({
              redirectToReferrer: true,
            }))
          })
          this.props.handleSetUser({...response.profileObj, type: data.type})
          
        }
        else {
          this.setState(() => ({
            profileObj: response.profileObj,
            redirectToUserType: true,
            user: {
              email: response.profileObj.email,
              username: response.profileObj.name
            }
          }))
        }
        
        console.log(data);
        return data;
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  }

  createUser = (response) => {

    let tmp = {...this.state.user, type: response};
    this.setState({user: tmp});
    var targetUrl = 'https://good-grades-server.herokuapp.com/api/users/createUser'
    fetch(targetUrl, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({...this.state.user, type: response}), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(blob => {
        return blob.json()
    })
    .then(data => {
        console.log(data);
        if (data.email && data.type){
          //continue to login
          fakeAuth.authenticate(() => {
            this.setState(() => ({
              redirectToUserType: false,
              redirectToReferrer: true,
            }))
          })
          console.log({data, response});
          this.props.handleSetUser({...this.state.profileObj, type: data.type})
        }
        return data})
    .catch(e => {
        console.log(e)
        return e
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer, redirectToUserType } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    if (redirectToUserType === true) {
      return <div>
              <div className='App'>
                <header className='App-header'>
                  Are you a
                  <Button variant='contained' color='primary' value="student" onClick = {()=> this.createUser("student")}>
                    Student
                  </Button>
                  or 
                  <Button variant='contained' color='primary' value="tutor"onClick = {()=> this.createUser("tutor")}>
                    Tutor
                  </Button>
                  ?
                </header>
              </div>
            </div>
    }

    return (
      <div>
      <div className='App'>
        <header className='App-header'>
          <GoogleLogin
            clientId="198987621325-8mjc0d3e410b1lt5goj0hj81qmrni2bk.apps.googleusercontent.com"
            buttonText="Continue with Google"
            onSuccess={this.login}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </header>
      </div>
    </div>
    )
  }
}

export default Login;

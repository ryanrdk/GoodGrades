import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

const responseGoogle = response => {
  console.log(response);
};

function LoginButton(props) {
  return (
    <div>
      <div className='App'>
        <header className='App-header'>
          <GoogleLogin
            clientId='198987621325-8mjc0d3e410b1lt5goj0hj81qmrni2bk.apps.googleusercontent.com'
            buttonText='Continue with Google'
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
        <Component {...props} />
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
    redirectToReferrer: false
  };
  login = response => {
    this.props.handleSetUser(response);
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  };
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <LoginButton login={this.login} />
      </div>
    );
  }
}

export default Login;

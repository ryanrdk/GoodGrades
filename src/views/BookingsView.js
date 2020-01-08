import React from 'react';

export const BookingsView = props => {
  const [redirect, setRedirect] = React.useState(false);

  const handleRedirect = () => {
    setRedirect(!redirect);
  };

  return (
    <div>
      <div className='App'>
        <header className='App-header'>
          <h1>Bookings</h1>
          <br></br>
          {props.user.type === 'student'
            ? 'student bookings'
            : 'tutor bookings'}
        </header>
      </div>
    </div>
  );
};

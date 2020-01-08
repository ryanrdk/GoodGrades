import React from 'react';

export const SchedulerView = props => {
  const [redirect, setRedirect] = React.useState(false);

  const handleRedirect = () => {
    setRedirect(!redirect);
  };

  return (
    <div>
      <div className='App'>
        <header className='App-header'>
          <h1>Scheduler</h1>
          <br></br>
          {props.user.type === 'student'
            ? 'student calendar'
            : 'tutor calendar'}
        </header>
      </div>
    </div>
  );
};

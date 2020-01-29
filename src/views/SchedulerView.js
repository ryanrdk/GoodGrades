import React from 'react';
import TutorSchedulerView from './TutorSchedulerView'
import StudentSchedulerView from './StudentSchedulerView'

export default class SchedulerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {user, refreshBookings} = this.props;
    return (
      <div>
        <div className='App'>
          <header className='App-header'>
            {
              (this.props.socket) ? (
                (user.type === "tutor" ? 
                  <TutorSchedulerView user={user} socket={this.props.socket} refreshBookings={refreshBookings}/>
                : <StudentSchedulerView user={user} socket={this.props.socket} refreshBookings={refreshBookings}/>)) : console.log("Socket not ready")
            }
          </header>
        </div>
      </div>
    );
  }
}
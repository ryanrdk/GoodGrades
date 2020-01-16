import React, { Component } from 'react'

export default class SchedulerToolTip extends Component {
    
    bookSession(appointmentData){
        console.log({appointmentData})
        fetch(
          `https://good-grades-server.herokuapp.com/api/events/addStudentToEvent`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              ...appointmentData,
              student_id: this.props.user.unique_id
            })
          }
        )
          .then(response => response.json())
          .then(data =>
            console.log("Complete")
          )
          .catch(() => this.setState({ loading: false }));
      }
    
      header = withStyles(style, { name: 'Header' })(({
        children, appointmentData, classes, ...restProps
      }) => (
        <AppointmentTooltip.Header
          {...restProps}
          appointmentData={appointmentData}
        >
          <IconButton
            /* eslint-disable-next-line no-alert */
            onClick={() => alert(JSON.stringify(appointmentData))}
            className={classes.commandButton}
          >
            <MoreIcon />
          </IconButton>
          <Button onClick={() => this.bookSession(appointmentData)} className={classes.commandButton}>
            Book Session
          </Button>
        </AppointmentTooltip.Header>
      ));
      
      content = withStyles(style, { name: 'Content' })(({
        children, appointmentData, classes, ...restProps
      }) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
          <Grid container alignItems="center">
            <Grid item xs={2} className={classes.textCenter}>
              <Room className={classes.icon} />
            </Grid>
            <Grid item xs={10}>
              <span>{appointmentData.location}</span>
            </Grid>
          </Grid>
        </AppointmentTooltip.Content>
      ));
      
      commandButton = withStyles(style, { name: 'CommandButton' })(({
        classes, ...restProps
      }) => (
        <AppointmentTooltip.CommandButton {...restProps} className={classes.commandButton} />
      ));
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

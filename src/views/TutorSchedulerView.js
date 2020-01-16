import React from 'react';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { ViewState, EditingState } from '../components/dx-react-scheduler';
import {
  AllDayPanel,
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  CurrentTimeIndicator,
  DateNavigator,
  DayView,
  DragDropProvider,
  EditRecurrenceMenu,
  Scheduler,
  Toolbar,
  WeekView,
  ViewSwitcher,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import classNames from 'clsx';
import { Grid } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';


const useStyles = makeStyles(theme => ({
  line: {
    height: '2px',
    borderTop: `2px ${theme.palette.primary.main} dotted`,
    width: '100%',
    transform: 'translate(0, -1px)'
  },
  circle: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    background: theme.palette.primary.main
  },
  nowIndicator: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: ({ top }) => top
  },
  shadedCell: {
    backgroundColor: fade(theme.palette.primary.main, 0.08),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.12)
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.2),
      outline: 0
    }
  },
  shadedPart: {
    backgroundColor: fade(theme.palette.primary.main, 0.08),
    position: 'absolute',
    height: ({ shadedHeight }) => shadedHeight,
    width: '100%',
    left: 0,
    top: 0,
    'td:focus &': {
      backgroundColor: fade(theme.palette.primary.main, 0.12)
    }
  },
  appointment: {
    backgroundColor: teal[300],
    '&:hover': {
      backgroundColor: teal[400]
    }
  },
  shadedAppointment: {
    backgroundColor: teal[200],
    '&:hover': {
      backgroundColor: teal[300]
    }
  }
}));

const styles = {
  toolbarRoot: {
    position: 'relative'
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0
  }
};

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
  firstRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
  },
  secondRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
  },
  thirdRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
  },
  header: {
    height: '260px',
    backgroundSize: 'cover',
  },
  commandButton: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});

const TimeIndicator = ({ top, ...restProps }) => {
  const classes = useStyles({ top });
  return (
    <div {...restProps}>
      <div className={classNames(classes.nowIndicator, classes.circle)} />
      <div className={classNames(classes.nowIndicator, classes.line)} />
    </div>
  );
};

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  )
);

const Appointment = withStyles(styles, { name: 'Appointment' })(
  ({ classes, data, ...restProps }) => {
    let style = data.booked ? {background: '#ff8a65', hover:'#f4511e'} : {background: '#4fc3f7', hover:'#039be5'}
    return (
      <Appointments.Appointment
        {...restProps}
        data={data}
        style={style}
      />
    );
  },
);


const mapAppointmentData = (dataToMap, index) => ({
  id: index,
  startDate: dataToMap.start_time,
  endDate: dataToMap.end_time,
  old_start_time: dataToMap.start_time,
  ...dataToMap,
});

export default class TutorSchedulerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      currentDate: Date.now(),
      currentViewName: 'Week',
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointmentId: undefined
    };

    this.loadData = this.loadData.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointmentId = this.changeEditingAppointmentId.bind(this);
    this.currentDateChange = currentDate => {
      this.setState({ currentDate });
    };
    this.currentViewNameChange = currentViewName => {
      this.setState({ currentViewName });
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    console.log('fetchin frahm api');
    fetch(
      `https://good-grades-server.herokuapp.com/api/events/byTutor/${this.props.user.unique_id}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }
    )
    .then(response => response.json())
    .then(data =>
        this.setState({
          data: data ? data.map(mapAppointmentData) : [],
          loading: false
        })
    )
    .catch(() => this.setState({ loading: false }));
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointmentId(editingAppointmentId) {
    this.setState({ editingAppointmentId });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState(state => {
      let { data } = state;
      if (added && (added.startDate > Date.now())) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
          let newAppointment = { id: startingAddedId, ...added, tutor: this.props.user.unique_id, old_start_time: added.startDate, start_time: added.startDate, end_time: added.endDate};
          data = [...data, newAppointment];
          let test = 
          fetch(
            'https://good-grades-server.herokuapp.com/api/events/createEvent',
            {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body:JSON.stringify({
                ...newAppointment
              })
            }
          )
            .then(response => response.json())
            .then(data => data)
            .catch(() => console.log("Error"));
          console.log({test})
      }
      if (changed) {
        console.log(changed)
        data = data.map(appointment => {
          if (changed[appointment.id]){
            let changedAppointment = { ...appointment, ...changed[appointment.id], new_start_time: changed[appointment.id].startDate, new_end_time: changed[appointment.id].endDate};
            fetch(
              'https://good-grades-server.herokuapp.com/api/events/updateEvent',
              {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body:JSON.stringify({
                  ...changedAppointment
                })
              }
            )
              .then(response => response.json())
              .then(data => data)
              .catch(() => console.log("Error"));
            changedAppointment.old_start_time = changedAppointment.new_start_time;
            return changedAppointment
          }
          else{
            return appointment;
          }
        }
        );
      }
      if (deleted !== undefined) {
        fetch(
          'https://good-grades-server.herokuapp.com/api/events/deleteEvent',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body:JSON.stringify({
              ...data[deleted]
            })
          }
        )
          .then(response => response.json())
          .then(data => data)
          .catch(() => console.log("Error"));
        console.log(data[deleted])
        data = data.filter(appointment => {return appointment.id !== deleted});
      }
      return { data };
    });
  }

  ToolTipHeader = withStyles(style, { name: 'Header' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <AppointmentTooltip.Header
      {...restProps}
      appointmentData={appointmentData}
    >
      {/* <IconButton
        onClick={() => alert(JSON.stringify(appointmentData))}
        className={classes.commandButton}>
        <MoreIcon /></IconButton> */}

      {/* <Button onClick={() => this.bookSession(appointmentData)} className={classes.commandButton}>
        Book Session
      </Button> */}
    </AppointmentTooltip.Header>
  ));
  
  ToolTipContent = withStyles(style, { name: 'Content' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Grid container alignItems="center">
        <Grid item xs={2} className={classes.textCenter}>
          <PeopleAltIcon className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.students.length > 0 ? appointmentData.students[0].username : 'Not Booked'}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  ));
  
  ToolTipCommandButton = withStyles(style, { name: 'CommandButton' })(({classes, ...restProps}) => (
    <AppointmentTooltip.CommandButton {...restProps} className={classes.commandButton} />
  ));

getEventById = eventId => this.state.data.find(({ id }) => id === eventId);




  render() {
    const {
      currentDate,
      currentViewName,
      data,
      loading,
      addedAppointment,
      appointmentChanges,
      editingAppointmentId
    } = this.state;

    return (
    <Paper>
        <Scheduler data={data} height={700}>
        <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentDateChange={this.currentDateChange}
            onCurrentViewNameChange = {this.currentViewNameChange}
        />
        <EditingState
            onCommitChanges={this.commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointmentId={editingAppointmentId}
            onEditingAppointmentIdChange={this.changeEditingAppointmentId}
        />
        
        <WeekView startDayHour={5} endDayHour={23} />
        <DayView startDayHour={0} endDayHour={23} />
        <AllDayPanel />
        <Toolbar
            {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
        />
        <ViewSwitcher />
        <EditRecurrenceMenu />
        <Appointments appointmentComponent={Appointment} />
        <AppointmentTooltip 
            headerComponent={this.ToolTipHeader}
            contentComponent={this.ToolTipContent}
            commandButtonComponent={this.ToolTipCommandButton}
            showOpenButton
            showDeleteButton
            showCloseButton
        />
        <AppointmentForm />
        <ConfirmationDialog ignoreDelete />
        <DragDropProvider />
        <DateNavigator />
        <TodayButton />
        <CurrentTimeIndicator
            indicatorComponent={TimeIndicator}
            shadePreviousCells
            shadePreviousAppointments
        />
        </Scheduler>
    </Paper>
    );
  }
}
import React from 'react';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  AllDayPanel,
  Appointments,
  AppointmentTooltip,
  CurrentTimeIndicator,
  DateNavigator,
  DayView,
  Resources,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView
} from '@devexpress/dx-react-scheduler-material-ui';
import classNames from 'clsx';
import { Grid, Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { isMobile } from 'react-device-detect';

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
    color: palette.action.active
  },
  textCenter: {
    textAlign: 'center'
  },
  header: {
    height: '260px',
    backgroundSize: 'cover'
  },
  commandButton: {
    backgroundColor: 'rgba(255,255,255,0.65)'
  }
});

const styles2 = theme => ({
  container: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'flex-end'
  },
  text: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2)
  }
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
    let style = data.booked
      ? { background: '#ff8a65', hover: '#f4511e' }
      : { background: '#4fc3f7', hover: '#039be5' };
    return (
      <Appointments.Appointment {...restProps} data={data} style={style} />
    );
  }
);

const mapAppointmentData = (dataToMap, index) => ({
  id: index,
  startDate: dataToMap.start_time,
  endDate: dataToMap.end_time,
  old_start_time: dataToMap.start_time,
  ...dataToMap
});

const ResourceSwitcher = withStyles(styles2, { name: 'ResourceSwitcher' })(
  ({ mainResourceName, onChange, classes, resources }) => (
    <div className={classes.container}>
      <div className={classes.text}>Tutor:</div>
      <Select value={mainResourceName} onChange={e => onChange(e.target.value)}>
        {resources.map(resource => (
          <MenuItem key={resource.fieldName} value={resource.fieldName}>
            {resource.title}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
);

const mapTutorData = dataToMap => ({
  tutor: {
    fieldName: dataToMap.unique_id,
    title: dataToMap.username,
    instances: []
  },
  events:
    dataToMap.events.length > 0 ? dataToMap.events.map(mapAppointmentData) : []
});

export default class StudentSchedulerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      currentDate: Date.now(),
      currentViewName: 'Week',
      initialData: [],
      mainResourceName: 'selectTutor',
      resources: [
        {
          fieldName: 'selectTutor',
          title: 'Select Tutor',
          instances: []
        }
      ],
      startDayHour: 5,
      endDayHour: 20
    };

    this.loadAllTutorsData = this.loadAllTutorsData.bind(this);
    this.changeMainResource = this.changeMainResource.bind(this);
    this.loadData = this.loadData.bind(this);
    this.currentDateChange = currentDate => {
      this.setState({ currentDate });
    };
    this.currentViewNameChange = currentViewName => {
      this.setState({ currentViewName });
    };
  }

  changeMainResource(mainResourceName) {
    let excludedEvents = [];
    if (this.state.allEvents) {
      const newEvents = this.state.allEvents.filter(
        elem => elem.tutor === mainResourceName
      );
      newEvents.map(elem => {
        const ans = this.state.initialData.filter(elem2 => {
          // filtering what data is already showing for tutor initially and removing from currently selected data
          return (
            elem2.tutor === elem.tutor && elem2.startDate === elem.startDate
          );
        });
        if (ans.length === 0 && new Date(elem.startDate) > Date.now()) {
          excludedEvents.push(elem);
        } // if no matching event found in initial data, it is added to excludedEvents array
      });

      console.log(
        'Changed',
        this.state,
        newEvents,
        mainResourceName,
        excludedEvents
      );
    }
    this.setState({
      mainResourceName,
      data: [...this.state.initialData, ...excludedEvents]
    });
  }

  componentDidMount() {
    let view = isMobile ? 'Day' : 'Week';
    this.setState({ currentViewName: view });
    this.loadData();
    this.loadAllTutorsData();
  }

  loadData() {
    console.log('fetchin frahm api');
    fetch(
      `https://good-grades-server.herokuapp.com/api/events/byStudent/${this.props.user.unique_id}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data =>
        setTimeout(() => {
          this.setState({
            data: data ? data.map(mapAppointmentData) : [],
            initialData: data ? data.map(mapAppointmentData) : [], //using to store tutors initial events and compare to selected tutor's events
            loading: false
          });
          console.log('Appoint', this.state.data);
        }, 2200)
      )
      .catch(() => this.setState({ loading: false }));
  }

  loadAllTutorsData() {
    console.log('fetching all tutors and their events');
    fetch(
      `https://good-grades-server.herokuapp.com/api/users/tutor/getAllTutors/events`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data =>
        setTimeout(() => {
          // console.log("Before", data)
          const toMapTutor = data ? data.map(mapTutorData) : [];
          let onlyEvents = [];
          let onlyTutors = toMapTutor.map(element => {
            element.events.map(element2 => {
              if (element2.booked === false) onlyEvents.push(element2);
            });
            element = element.tutor;
            return element;
          });
          //   onlyTutors.unshift(...this.state.resources)
          onlyTutors.unshift(this.state.resources[0]);
          // console.log("DOne", toMapTutor, onlyTutors, onlyEvents)
          this.setState({
            resources: onlyTutors,
            allEvents: onlyEvents,
            // data: onlyEvents,
            loading: false
          });
          this.changeMainResource(this.state.mainResourceName);
          console.log('Mapped', this.state);
        }, 2200)
      )
      .catch(() => this.setState({ loading: false }));
  }

  bookSession(appointmentData) {
    console.log({ appointmentData });
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
      .then(data => {
        data
          ? this.setState({
              loading: true,
              initialData: [...this.state.initialData, mapAppointmentData(data)]
            })
          : this.setState({ loading: true });
        this.loadAllTutorsData();
        this.props.refreshBookings();
      })
      .catch(() => this.setState({ loading: false }));
  }

  ToolTipHeader = withStyles(style, { name: 'Header' })(
    ({ children, appointmentData, classes, ...restProps }) => (
      <AppointmentTooltip.Header
        {...restProps}
        appointmentData={appointmentData}>
        {appointmentData.booked === false ? (
          <Button
            onClick={() => this.bookSession(appointmentData)}
            className={classes.commandButton}>
            Book Session
          </Button>
        ) : null}
      </AppointmentTooltip.Header>
    )
  );

  ToolTipContent = withStyles(style, { name: 'Content' })(
    ({ children, appointmentData, classes, ...restProps }) => (
      <AppointmentTooltip.Content
        {...restProps}
        appointmentData={appointmentData}>
        <Grid container alignItems='center'>
          <Grid item xs={2} className={classes.textCenter}>
            <PeopleAltIcon className={classes.icon} />
          </Grid>
          <Grid item xs={10}>
            <span>
              {appointmentData.students.length > 0
                ? appointmentData.students[0].username
                : 'Not Booked'}
            </span>
          </Grid>
        </Grid>
      </AppointmentTooltip.Content>
    )
  );
  ToolTipCommandButton = withStyles(style, { name: 'CommandButton' })(
    ({ classes, ...restProps }) => (
      <AppointmentTooltip.CommandButton
        {...restProps}
        className={classes.commandButton}
      />
    )
  );

  render() {
    const {
      currentDate,
      currentViewName,
      data,
      loading,
      resources,
      mainResourceName,
      startDayHour,
      endDayHour
    } = this.state;

    return (
      <div>
        <div className='App'>
          <header className='App-header'>
            <ResourceSwitcher
              resources={resources}
              mainResourceName={mainResourceName}
              onChange={this.changeMainResource}
            />
            <Paper>
              <Scheduler data={data} height={680}>
                <ViewState
                  currentDate={currentDate}
                  currentViewName={currentViewName}
                  onCurrentDateChange={this.currentDateChange}
                  onCurrentViewNameChange={this.currentViewNameChange}
                />
                <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
                <DayView startDayHour={startDayHour} endDayHour={endDayHour} />
                <AllDayPanel />
                <Toolbar
                  {...(loading
                    ? { rootComponent: ToolbarWithLoading }
                    : null)}></Toolbar>
                <ViewSwitcher />

                <Appointments appointmentComponent={Appointment} />
                <AppointmentTooltip
                  headerComponent={this.ToolTipHeader}
                  contentComponent={this.ToolTipContent}
                  commandButtonComponent={this.ToolTipCommandButton}
                  showCloseButton
                />
                <Resources
                  data={resources}
                  mainResourceName={mainResourceName}
                />
                <DateNavigator />
                <TodayButton />
                <CurrentTimeIndicator
                  indicatorComponent={TimeIndicator}
                  shadePreviousCells
                  shadePreviousAppointments
                />
              </Scheduler>
            </Paper>
          </header>
        </div>
      </div>
    );
  }
}

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
  DragDropProvider,
  EditRecurrenceMenu,
  Scheduler,
  Toolbar,
  WeekView
} from '@devexpress/dx-react-scheduler-material-ui';
import classNames from 'clsx';

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

const mapAppointmentData = (dataToMap, index) => ({
  id: index,
  startDate: dataToMap.start_time,
  endDate: dataToMap.end_time
});

export default class SchedulerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      currentDate: Date.now(),

      addedAppointment: {},
      appointmentChanges: {},
      editingAppointmentId: undefined
    };

    this.loadData = this.loadData.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointmentId = this.changeEditingAppointmentId.bind(
      this
    );
    this.currentDateChange = currentDate => {
      this.setState({ currentDate });
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    console.log('fetchin frahm api');
    fetch(
      'https://good-grades-server.herokuapp.com/api/events/byTutor/3325863450774184',
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
            loading: false
          });
        }, 2200)
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
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const {
      currentDate,
      data,
      loading,
      addedAppointment,
      appointmentChanges,
      editingAppointmentId
    } = this.state;

    return (
      <div>
        <div className='App'>
          <header className='App-header'>
            <Paper>
              <Scheduler data={data} height={700}>
                <ViewState
                  currentDate={currentDate}
                  onCurrentDateChange={this.currentDateChange}
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
                <AllDayPanel />
                <Toolbar
                  {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
                />
                {this.props.user.type === 'tutor' ? (
                  <EditRecurrenceMenu />
                ) : null}
                <Appointments />
                <AppointmentTooltip showOpenButton showDeleteButton />
                {this.props.user.type === 'tutor' ? <AppointmentForm /> : null}
                {this.props.user.type === 'tutor' ? (
                  <ConfirmationDialog />
                ) : null}
                <DragDropProvider />
                <DateNavigator />
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

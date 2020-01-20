/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
  DayView,
  DateNavigator,
  CurrentTimeIndicator,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import classNames from 'clsx';
import { isMobile } from 'react-device-detect';

import { LinearProgress, Grid } from '@material-ui/core';

const containerStyles = theme => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5)
  },
  closeButton: {
    float: 'right'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2)
  },
  button: {
    marginLeft: theme.spacing(2)
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0
    },
    width: '50%'
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0)
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2)
  },
  textField: {
    width: '100%'
  }
});

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {}
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes
    };
    this.setState({
      appointmentChanges: nextChanges
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges()
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {}
    });
  }

  render() {
    const {
      classes,
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide
    } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment('added')
      : () => this.commitAppointment('changed');

    const pickerEditorProps = field => ({
      className: classes.picker,
      // keyboard: true,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: date =>
        this.changeAppointment({
          field: [field],
          changes: date
            ? date.toDate()
            : new Date(displayAppointmentData[field])
        }),
      inputVariant: 'outlined',
      format: 'DD/MM/YYYY HH:mm',
      onError: () => null
    });

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {}
      });
      visibleChange();
      cancelAppointment();
    };

    return (
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize
        onHide={onHide}>
        <div>
          <div className={classes.header}>
            <IconButton className={classes.closeButton} onClick={cancelChanges}>
              <Close color='action' />
            </IconButton>
          </div>
          <div className={classes.content}>
            {/* <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('title')}
              />
            </div> */}
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color='action' />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  label='Start Date'
                  {...pickerEditorProps('startDate')}
                />
                <KeyboardDateTimePicker
                  label='End Date'
                  {...pickerEditorProps('endDate')}
                />
              </MuiPickersUtilsProvider>
            </div>
            {/* <div className={classes.wrapper}>
              <LocationOn className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('location')}
              />
            </div> */}
            {/* <div className={classes.wrapper}>
              <Notes className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('notes')}
                multiline
                rows="6"
              />
            </div> */}
          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant='outlined'
                color='secondary'
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment('deleted');
                }}>
                Delete
              </Button>
            )}
            <Button
              variant='outlined'
              color='primary'
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}>
              {isNewAppointment ? 'Create' : 'Save'}
            </Button>
          </div>
        </div>
      </AppointmentForm.Overlay>
    );
  }
}

const AppointmentFormContainer = withStyles(containerStyles, {
  name: 'AppointmentFormContainer'
})(AppointmentFormContainerBasic);

const mapAppointmentData = (dataToMap, index) => ({
  id: index,
  startDate: dataToMap.start_time,
  endDate: dataToMap.end_time,
  old_start_time: dataToMap.start_time,
  ...dataToMap
});

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

const styles = theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4
  }
});

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

const TimeIndicator = ({ top, ...restProps }) => {
  const classes = useStyles({ top });
  return (
    <div {...restProps}>
      <div className={classNames(classes.nowIndicator, classes.circle)} />
      <div className={classNames(classes.nowIndicator, classes.line)} />
    </div>
  );
};

/* eslint-disable-next-line react/no-multi-comp */
class TutorSchedulerView2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentDate: Date.now(),
      loading: true,
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 5,
      endDayHour: 20,
      isNewAppointment: false,
      appointmentChanges: {},
      editingAppointmentId: undefined,
      currentViewName: 'Week'
    };

    this.getAppointments = this.getAppointments.bind(this);
    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(
      this
    );
    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(
      this
    );
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment
      } = this.state;

      const currentAppointment =
        data.filter(
          appointment =>
            editingAppointment && appointment.id === editingAppointment.id
        )[0] || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment
      };
    });

    this.currentDateChange = currentDate => {
      this.setState({ currentDate });
    };
    this.currentViewNameChange = currentViewName => {
      this.setState({ currentViewName });
    };
  }

  componentDidUpdate() {
    this.appointmentForm.update();
  }

  componentDidMount() {
    let view = isMobile ? 'Day' : 'Week';
    this.setState({ currentViewName: view });
    this.getAppointments(this.props.user.unique_id);
    // console.log("Device", window.screen.availHeight, window.screen.availWidth, window.screen.height, window.screen.width)
  }

  getAppointments = unique_id => {
    fetch(
      `https://good-grades-server.herokuapp.com/api/events/byTutor/${unique_id}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        //   appointments = data ? data.map(mapAppointmentData) : [];
        this.setState({
          data: data ? data.map(mapAppointmentData) : [],
          loading: false
        });
      })
      .catch(() => this.setState({ loading: false }));
  };

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState(state => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(
        appointment => appointment.id !== deletedAppointmentId
      );

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState(state => {
      let { data } = state;
      if (added && added.startDate > Date.now()) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        let newAppointment = {
          id: startingAddedId,
          ...added,
          tutor: this.props.user.unique_id,
          old_start_time: added.startDate,
          start_time: added.startDate,
          end_time: added.endDate
        };
        data = [...data, newAppointment];
        let test = fetch(
          'https://good-grades-server.herokuapp.com/api/events/createEvent',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              ...newAppointment
            })
          }
        )
          .then(response => response.json())
          .then(data => data)
          .catch(() => console.log('Error'));
        console.log({ test });
      }
      if (changed) {
        console.log(changed);
        data = data.map(appointment => {
          if (
            changed[appointment.id] &&
            changed[appointment.id].startDate > Date.now()
          ) {
            let changedAppointment = {
              ...appointment,
              ...changed[appointment.id],
              new_start_time: changed[appointment.id].startDate,
              new_end_time: changed[appointment.id].endDate
            };
            fetch(
              'https://good-grades-server.herokuapp.com/api/events/updateEvent',
              {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({
                  ...changedAppointment
                })
              }
            )
              .then(response => response.json())
              .then(data => data)
              .catch(() => console.log('Error'));
            changedAppointment.old_start_time =
              changedAppointment.new_start_time;
            return changedAppointment;
          } else {
            return appointment;
          }
        });
      }
      if (deleted !== undefined) {
        fetch(
          'https://good-grades-server.herokuapp.com/api/events/deleteEvent',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              ...data[deleted]
            })
          }
        )
          .then(response => response.json())
          .then(() => {
            this.setDeletedAppointmentId(deleted);
            this.toggleConfirmationVisible();
          })
          .catch(() => console.log('Error'));
      }
      return { data, addedAppointment: {} };
    });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointmentId(editingAppointmentId) {
    this.setState({ editingAppointmentId });
  }

  ToolTipHeader = withStyles(style, { name: 'Header' })(
    ({ children, appointmentData, classes, ...restProps }) => (
      <AppointmentTooltip.Header
        {...restProps}
        appointmentData={appointmentData}></AppointmentTooltip.Header>
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
              {appointmentData.students && appointmentData.students.length > 0
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
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
      currentViewName,
      editingAppointmentId,
      addedAppointment,
      appointmentChanges,
      loading
    } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={`${isMobile ? window.screen.height * 0.75 : 680}`}>
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentDateChange={this.currentDateChange}
            onCurrentViewNameChange={this.currentViewNameChange}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            onEditingAppointmentChange={this.onEditingAppointmentChange}
            onAddedAppointmentChange={this.onAddedAppointmentChange}
            addedAppointment={addedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointmentId={editingAppointmentId}
            onEditingAppointmentIdChange={this.changeEditingAppointmentId}
          />
          <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
          <DayView startDayHour={startDayHour} endDayHour={endDayHour} />
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
          <AppointmentForm
            overlayComponent={this.appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
          />
          <DragDropProvider />
          <DateNavigator />
          <TodayButton />
          <CurrentTimeIndicator
            indicatorComponent={TimeIndicator}
            shadePreviousCells
            shadePreviousAppointments
          />
          <Fab
            color='secondary'
            style={{
              right: '32px',
              bottom: '24px',
              position: 'absolute'
            }}
            onClick={() => {
              this.setState({ editingFormVisible: true });
              this.onEditingAppointmentChange(undefined);
              this.onAddedAppointmentChange({
                startDate: new Date(currentDate).setHours(startDayHour),
                endDate: new Date(currentDate).setHours(startDayHour + 1)
              });
            }}>
            <AddIcon />
          </Fab>
        </Scheduler>

        <Dialog open={confirmationVisible} onClose={this.cancelDelete}>
          <DialogTitle>Delete Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.toggleConfirmationVisible}
              color='primary'
              variant='outlined'>
              Cancel
            </Button>
            <Button
              onClick={this.commitDeletedAppointment}
              color='secondary'
              variant='outlined'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Fab
          color='secondary'
          style={
            isMobile
              ? {
                  position: 'relative',
                  float: 'right',
                  bottom: `${Math.round(window.screen.height * 0.08)}px`,
                  right: `${Math.round(window.screen.width * 0.13)}px`
                }
              : {
                  margin: '10px',
                  float: 'right'
                }
          }
          onClick={() => {
            this.setState({ editingFormVisible: true });
            this.onEditingAppointmentChange(undefined);
            this.onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1)
            });
          }}>
          <AddIcon />
        </Fab>
      </Paper>
    );
  }
}

export default withStyles(styles, { name: 'TutorSchedulerView2' })(
  TutorSchedulerView2
);

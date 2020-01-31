import * as React from 'react';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AllDayPanel,
  AppointmentTooltip,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';
import Room from '@material-ui/icons/Room';

let tutors = [];
let events = [];

const filterTasks = (items, tutorId) =>
  items.filter(task => {
    if (task.booked === false && (!tutorId || task.tutor === tutorId)) {
      console.log(task);
      return task;
    }
  });
const getTutorById = tutorId => tutors.find(({ id }) => id === tutorId);

const getShortTutorById = tutorId =>
  tutors.find(({ id }) => id === tutorId).shortTitle;

const createClassesByTutorId = (
  tutorId,
  classes,
  { background = false, color = false, hover = false }
) => {
  const tutor = getTutorById(tutorId);
  const result = [];
  if (background) result.push(classes[`${tutor}TutorBackground`]);
  if (color) result.push(classes[`${tutor}TutorColor`]);
  if (hover) result.push(classes[`${tutor}TutorHover`]);
  return result.join(' ');
};
const styles = theme => ({
  // ...tutors.reduce((acc, { title, color, activeColor }) => {
  //   acc[`${title}TutorBackground`] = { background: color, '& button.edit-button': { background: lighten(color, 0.15) } };
  //   acc[`${title}TutorColor`] = { color };
  //   acc[`${title}TutorHover`] = { '&:hover': { background: activeColor } };
  //   return acc;
  // }, {}),
  contentItemValue: {
    padding: 0
  },
  contentItemIcon: {
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  flexibleSpace: {
    margin: '0 auto 0 0'
  },
  tutorSelector: {
    marginLeft: theme.spacing(2),
    minWidth: 140,
    '@media (max-width: 500px)': {
      minWidth: 0,
      fontSize: '0.75rem',
      marginLeft: theme.spacing(0.5)
    }
  },
  tutorSelectorItem: {
    display: 'flex',
    alignItems: 'center'
  },
  tutorBullet: {
    borderRadius: '50%',
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'inline-block'
  },
  tutorText: {
    '@media (max-width: 500px)': {
      display: 'none'
    }
  },
  tutorShortText: {
    '@media (min-width: 500px)': {
      display: 'none'
    }
  },
  defaultBullet: {
    background: theme.palette.divider
  },
  titleNoWrap: {
    '& div > div > div': {
      whiteSpace: 'normal'
    }
  },
  content: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px'
  },
  text: {
    ...theme.typography.body2,
    display: 'inline-block'
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  icon: {
    verticalAlign: 'middle'
  },
  grayIcon: {
    color: theme.palette.action.active
  },
  lens: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super'
  },
  textCenter: {
    textAlign: 'center'
  },
  dateAndTitle: {
    lineHeight: 1.1
  },
  titleContainer: {
    paddingBottom: theme.spacing(2)
  },
  container: {
    paddingBottom: theme.spacing(1.5)
  }
});

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active
  },
  textCenter: {
    textAlign: 'center'
  },
  firstRoom: {
    background:
      'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)'
  },
  secondRoom: {
    background:
      'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)'
  },
  thirdRoom: {
    background:
      'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)'
  },
  header: {
    height: '260px',
    backgroundSize: 'cover'
  },
  commandButton: {
    backgroundColor: 'rgba(255,255,255,0.65)'
  }
});

const TutorSelectorItem = ({ id, classes }) => {
  let bulletClass = classes.defaultBullet;
  let text = 'All Sessions';
  let shortText = 'All';
  if (id) {
    // bulletClass = createClassesByTutorId(id, classes, { background: true });
    text = getTutorById(id).username;
    shortText = getShortTutorById(id);
  }
  return (
    <div className={classes.tutorSelectorItem}>
      <span className={`${classes.tutorBullet} ${bulletClass}`} />
      <span className={classes.tutorText}>{text}</span>
      <span className={classes.tutorShortText}>{shortText}</span>
    </div>
  );
};

const TutorSelector = withStyles(styles, { name: 'TutorSelector' })(
  ({ classes, tutorChange, tutor }) => (
    <FormControl className={classes.tutorSelector}>
      <Select
        disableUnderline
        value={tutor}
        onChange={e => {
          tutorChange(e.target.value);
        }}
        renderValue={value => (
          <TutorSelectorItem id={value} classes={classes} />
        )}>
        <MenuItem value={0}>
          <TutorSelectorItem id={0} classes={classes} />
        </MenuItem>
        {tutors.map(({ id }) => (
          <MenuItem value={id} key={id.toString()}>
            <TutorSelectorItem id={id} classes={classes} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
);

const FlexibleSpace = withStyles(styles, { name: 'FlexibleSpace' })(
  ({ classes, tutor, tutorChange, ...restProps }) => (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
      <TutorSelector tutor={tutor} tutorChange={tutorChange} />
    </Toolbar.FlexibleSpace>
  )
);

const Appointment = withStyles(styles, { name: 'Appointment' })(
  ({ classes, data, ...restProps }) => {
    const tutorClasses = createClassesByTutorId(data.tutorId, classes, {
      background: true,
      hover: true
    });
    return (
      <Appointments.Appointment
        {...restProps}
        data={data}
        className={tutorClasses}
      />
    );
  }
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: Date.now(),
      currentViewName: 'Week',
      data: [],
      currentTutor: 0
    };
    this.currentViewNameChange = currentViewName => {
      this.setState({ currentViewName });
    };
    this.currentDateChange = currentDate => {
      this.setState({ currentDate });
    };
    this.tutorChange = value => {
      this.setState({ currentTutor: value });
    };
    this.flexibleSpace = connectProps(FlexibleSpace, () => {
      const { currentTutor } = this.state;
      return {
        tutor: currentTutor,
        tutorChange: this.tutorChange
      };
    });
  }

  getEvents() {
    fetch(`https://good-grades-server.herokuapp.com/api/events`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        events = data.map((dataToMap, index) => ({
          id: index,
          startDate: dataToMap.start_time,
          endDate: dataToMap.end_time,
          old_start_time: dataToMap.start_time,
          ...dataToMap
        }));
        this.setState({ data: events });
      })
      .catch(() => this.setState({ loading: false }));
  }

  async componentDidMount() {
    await fetch(
      `https://good-grades-server.herokuapp.com/api/users/tutor/getAllTutors`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        tutors = data.map(dataToMap => ({
          id: dataToMap.unique_id,
          ...dataToMap
        }));
      })
      .catch(() => this.setState({ loading: false }));

    this.getEvents();
  }

  componentDidUpdate() {
    if (tutors && this.state.data) this.flexibleSpace.update();
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
      .then(() => {
        console.log('Complete');
        this.getEvents();
        this.props.refreshBookings();
      })
      .catch(() => this.setState({ loading: false }));
  }

  ToolTipHeader = withStyles(style, { name: 'Header' })(
    ({ children, appointmentData, classes, ...restProps }) => (
      <AppointmentTooltip.Header
        {...restProps}
        appointmentData={appointmentData}>
        <Button
          onClick={() => this.bookSession(appointmentData)}
          className={classes.commandButton}>
          Book Session
        </Button>
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
            <Room className={classes.icon} />
          </Grid>
          <Grid item xs={10}>
            <span>{appointmentData.location}</span>
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
    const { data, currentDate, currentViewName, currentTutor } = this.state;
    console.log({ data, currentTutor });
    return (
      <Paper>
        <Scheduler data={filterTasks(data, currentTutor)} height={660}>
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />
          <WeekView startDayHour={9} endDayHour={19} excludedDays={[0, 6]} />
          <DayView startDayHour={9} endDayHour={19} />
          <Appointments appointmentComponent={Appointment} />

          <Toolbar flexibleSpaceComponent={this.flexibleSpace} />
          <DateNavigator />
          <ViewSwitcher />
          <AllDayPanel />
          {/* <AppointmentTooltip
            contentComponent={TooltipContent}
            commandButtonComponent={EditButton}
            showOpenButton
            showCloseButton
          /> */}
          <AppointmentTooltip
            headerComponent={this.ToolTipHeader}
            contentComponent={this.ToolTipContent}
            commandButtonComponent={this.ToolTipCommandButton}
            showCloseButton
          />
          <TodayButton />
        </Scheduler>
      </Paper>
    );
  }
}

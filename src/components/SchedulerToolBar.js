import React from 'react';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import { connectProps } from '@devexpress/dx-react-core';
import { FormControl, Select, MenuItem } from '@material-ui/core';


const styles = theme => ({
    // ...this.tutors.reduce((acc, { title, color, activeColor }) => {
    //   acc[`${title}TutorBackground`] = { background: color, '& button.edit-button': { background: lighten(color, 0.15) } };
    //   acc[`${title}TutorColor`] = { color };
    //   acc[`${title}TutorHover`] = { '&:hover': { background: activeColor } };
    //   return acc;
    // }, {}),
    contentItemValue: {
      padding: 0,
    },
    contentItemIcon: {
      textAlign: 'center',
      verticalAlign: 'middle',
    },
    flexibleSpace: {
      margin: '0 auto 0 0',
    },
    tutorSelector: {
      marginLeft: theme.spacing(2),
      minWidth: 140,
      '@media (max-width: 500px)': {
        minWidth: 0,
        fontSize: '0.75rem',
        marginLeft: theme.spacing(0.5),
      },
    },
    tutorSelectorItem: {
      display: 'flex',
      alignItems: 'center',
    },
    tutorBullet: {
      borderRadius: '50%',
      width: theme.spacing(2),
      height: theme.spacing(2),
      marginRight: theme.spacing(2),
      display: 'inline-block',
    },
    tutorText: {
      '@media (max-width: 500px)': {
        display: 'none',
      },
    },
    tutorShortText: {
      '@media (min-width: 500px)': {
        display: 'none',
      },
    },
    defaultBullet: {
      background: theme.palette.divider,
    },
    titleNoWrap: {
      '& div > div > div': {
        whiteSpace: 'normal',
      },
    },
    content: {
      padding: theme.spacing(3, 1),
      paddingTop: 0,
      backgroundColor: theme.palette.background.paper,
      boxSizing: 'border-box',
      width: '400px',
    },
    text: {
      ...theme.typography.body2,
      display: 'inline-block',
    },
    title: {
      ...theme.typography.h6,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightBold,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    icon: {
      verticalAlign: 'middle',
    },
    grayIcon: {
      color: theme.palette.action.active,
    },
    lens: {
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
      verticalAlign: 'super',
    },
    textCenter: {
      textAlign: 'center',
    },
    dateAndTitle: {
      lineHeight: 1.1,
    },
    titleContainer: {
      paddingBottom: theme.spacing(2),
    },
    container: {
      paddingBottom: theme.spacing(1.5),
    },
  });

  const TutorSelectorItem = ({ id, classes }) => {
    let bulletClass = classes.defaultBullet;
    let text = 'All Tasks';
    let shortText = 'All';
    if (id) {
      bulletClass = this.createClassesByTutorId(id, classes, { background: true });
      text = this.getTutorById(id);
      shortText = this.getShortTutorById(id);
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
    ({ classes, tutorChange, tutor, tutors }) => (
      <FormControl className={classes.tutorSelector}>
        <Select
          disableUnderline
          value={tutor}
          onChange={(e) => {
            tutorChange(e.target.value);
          }}
          renderValue={value => <TutorSelectorItem id={value} classes={classes} />}
        >
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
    ),
  );

export default class SchedulerToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      currentDate: Date.now(),
      currentViewName: 'Week',
    //   addedAppointment: {},
    //   appointmentChanges: {},
      tutors: [],
      editingAppointmentId: undefined,
      currentTutor: 0,
    };

    // this.loadData = this.loadData.bind(this);
    // this.commitChanges = this.commitChanges.bind(this);
    // this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    // this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    // this.changeEditingAppointmentId = this.changeEditingAppointmentId.bind(this);

    this.currentDateChange = currentDate => {
      this.setState({ currentDate });
    };
    this.currentViewNameChange = currentViewName => {
      this.setState({ currentViewName });
    };
    this.tutorChange = (value) => {
      this.setState({ currentTutor: value });
    };

    this.flexibleSpace = connectProps(this.FlexibleSpace, () => {
        const { currentTutor } = this.state;
        console.log("felexibile Space")
        return {
        tutor: currentTutor,
        tutorChange: this.tutorChange,
        };
    });
    
  }
  
  ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
    ({ children, classes, ...restProps }) => (
      <div className={classes.toolbarRoot}>
        <Toolbar.Root {...restProps} flexibleSpaceComponent={this.flexibleSpace}>{children}</Toolbar.Root>
        <LinearProgress className={classes.progress} />
      </div>
    )
  );
  
  filterTasks = (items, tutorId) => items.filter(task => (
    !tutorId || task.tutorId === tutorId
  ));
  getTutorById = tutorId => this.tutors.find(({ id }) => id === tutorId).title;
  getShortTutorById = tutorId => this.tutors
    .find(({ id }) => id === tutorId).shortTitle;
  
  createClassesByTutorId = (
    tutorId, classes,
    { background = false, color = false, hover = false },
  ) => {
    const tutor = this.getTutorById(tutorId);
    const result = [];
    if (background) result.push(classes[`${tutor}TutorBackground`]);
    if (color) result.push(classes[`${tutor}TutorColor`]);
    if (hover) result.push(classes[`${tutor}TutorHover`]);
    return result.join(' ');
  };
  
  FlexibleSpace = withStyles(styles, { name: 'FlexibleSpace' })(
    ({
      classes, tutor, tutors, tutorChange, ...restProps
    }) => (
      <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
        {console.log({tutor, tutors})}
        <TutorSelector tutor={tutor} tutors={tutors} tutorChange={tutorChange} />
      </Toolbar.FlexibleSpace>
    ),
  );

  componentWillMount() {
    this.getTutors();
  }

  componentDidUpdate() {
    //   console.log(this.flexibleSpace)
    if (this.flexibleSpace)
        this.flexibleSpace.update();
  }

  getTutors() {
    console.log('fetchin frahm api');
    let url = `https://good-grades-server.herokuapp.com/api/users/tutor/getAllTutors`
    fetch(
      url,
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
          console.log(data)
          this.setState({
            tutors: data.map((elm, index) => ({id: index, ...elm}))
          });
        }, 2200)
      )
      .catch(() => this.props.setLoading(false));
  }


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
        <Toolbar
            {...(this.props.loading ? { rootComponent: this.ToolbarWithLoading } : null)}
        />
    );
  }
}

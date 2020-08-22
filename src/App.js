import React, { useState } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  CssBaseline,
  Typography,
  Paper,
  Box,
  Button,
} from '@material-ui/core';
import ProfileView from './components/ProfileView';
import ProfileForm from './components/ProfileForm';
import { connect } from 'react-redux';
import { changeInputValue, changeDatePickerValue } from './actions';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: `600px`,
  },
  paper: {
  },
  welcomeText: {
    marginBottom: theme.spacing(2),
  },
  welcomeContent: {
    textAlign: `center`,
  },
}));

const mockData = {
  name: "Jane Whites",
  age: 28,
  avatarImg: "https://source.unsplash.com/300x300/?person",
  jobList: [
    {
      jobTitle: "Project Manager",
      company: "Google",
      companyLogo: "https://source.unsplash.com/random/400x300",
      startDate: "2016/3/1",
      endDate: "2019/5/26",
      isCurrentJob: false,
      jobDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum ipsam obcaecati perferendis porro provident quam, velit voluptate voluptatibus."
    },
    {
      jobTitle: "Data Analyst",
      company: "Verizon Media",
      companyLogo: "https://source.unsplash.com/random/400x300",
      startDate: "2019/6/1",
      endDate: "",
      isCurrentJob: true,
      jobDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet architecto at dolor ea iste nam quo similique vitae voluptas? Eum ipsam obcaecati perferendis porro provident quam, velit voluptate voluptatibus perferendis porro provident quam, velit voluptate voluptatibus."
    }
  ]
};

function App(props) {
  console.log(props);
  const classes = useStyles();
  const [ isEditing, setIsEditing ] = useState(false);
  const { store, changeInputValue, changeDatePickerValue } = props;
  const { personalForm, jobForm, jobList } = store;

  const handleClickStartEdit = () => {
    setIsEditing(isEditing => !isEditing);
  };

  const renderWelcomeContent = () => (
    <div className={classes.welcomeContent}>
      <Typography variant="body1" gutterBottom align="center" className={classes.welcomeText}>
        You haven't input your profile yet.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickStartEdit}
      >
        Let's create one!
      </Button>
    </div>
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CssBaseline/>
      <Container maxWidth="md">
        <Box marginTop={5}>
          <Typography variant="h4" component="h2" gutterBottom>
            My Profile
          </Typography>
        </Box>
        <Box paddingY={5} paddingX={4} clone>
          <Paper className={classes.paper}>
            {/* fordev */}
            <button onClick={() => { setIsEditing(isEditing => !isEditing); }}>Toggle</button>
            {/* todo: 判斷是否有profile */}
            { (!isEditing && !personalForm.name.value) &&
              renderWelcomeContent()
            }
            { (!isEditing && !!personalForm.name.value) &&
              <ProfileView
                {...mockData}
                onClickStartEdit={handleClickStartEdit}
              />
            }
            { isEditing &&
              <ProfileForm
                personalForm={personalForm}
                jobList={jobList}
                jobForm={jobForm}
                changeInputValue={changeInputValue}
                changeDatePickerValue={changeDatePickerValue}
              />
            }
          </Paper>
        </Box>
      </Container>
    </MuiPickersUtilsProvider>
  )
}

const mapStateToProps = state => ({
  // todos: getVisibleTodos(state.todos, state.visibilityFilter),
  // name: state.name,
  // age: state.age,
  store: state,
});

const mapDispatchToProps = dispatch => ({
  // toggleTodo: id => dispatch(toggleTodo(id)),
  changeInputValue: payload => dispatch(changeInputValue(payload)),
  changeDatePickerValue: payload => dispatch(changeDatePickerValue(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

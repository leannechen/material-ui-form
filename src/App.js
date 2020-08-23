import React, { useState, useEffect } from 'react';
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
import {
  changeInputValue,
  changeDatePickerValue,
  toggleIsCurrentJob,
  submitSingleJob,
  submitOverallForm,
  setFieldsInvalidMsg,
  requestOverallForm,
} from './actions';
import { db } from './services/firebase';

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

  const classes = useStyles();
  const [ isEditing, setIsEditing ] = useState(false);
  const { store, changeInputValue, changeDatePickerValue, toggleIsCurrentJob, submitSingleJob, setFieldsInvalidMsg, submitOverallForm, requestOverallForm } = props;
  const { personalForm, jobForm, jobList } = store;

  useEffect(() => {
    const firebaseDataId = localStorage.getItem('glints-form');
    if(firebaseDataId) {
      requestOverallForm(firebaseDataId);
    }
  }, []);

  const handleClickStartEdit = () => {
    setIsEditing(isEditing => !isEditing);
  };

  const devAddData = () => {
    db.collection("profiles").add({
      name: "Lennon",
      age: 64,
      avatarImg: "",
      jobList: [
        {
          jobTitle: "Data Analyst 1",
          company: "Apple",
          companyLogo: "https://source.unsplash.com/random/400x300",
          startDate: "2019/6/1",
          endDate: "2019/12/31",
          isCurrent: false,
          jobDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet architecto at dolor ea iste nam quo similique vitae voluptas? Eum ipsam obcaecati perferendis porro provident quam, velit voluptate voluptatibus perferendis porro provident quam, velit voluptate voluptatibus."
        },
        {
          jobTitle: "Data Analyst 2",
          company: "BeeHappy",
          companyLogo: "https://source.unsplash.com/random/400x300",
          startDate: "2020/2/1",
          endDate: "",
          isCurrent: true,
          jobDesc: "We are going to use axios to fetch data, but it is up to you to use another data fetching library or the native fetch API of the browser."
        }
      ]
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  };

  const devGetData = () => {
    // todo: save uid to localStorage, use this to map user profile and get data
    // context api?
    const ref = db.collection("profiles").doc("DC5p36PJ1qwTN77MJ3ul");
    ref.get().then(doc => {
      console.log(doc.data());
    })
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
            <button onClick={devAddData}>Add data to Firebase</button>
            <button onClick={devGetData}>Get data from Firebase</button>
            <button onClick={() => { submitOverallForm() }}>mock SAVE</button>
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
                toggleIsCurrentJob={toggleIsCurrentJob}
                submitSingleJob={submitSingleJob}
                setFieldsInvalidMsg={setFieldsInvalidMsg}
                submitOverallForm={submitOverallForm}
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
  toggleIsCurrentJob:  payload => dispatch(toggleIsCurrentJob(payload)),
  submitSingleJob: payload => dispatch(submitSingleJob(payload)),
  setFieldsInvalidMsg: payload => dispatch(setFieldsInvalidMsg(payload)),
  submitOverallForm: payload => dispatch(submitOverallForm(payload)),
  requestOverallForm: payload => dispatch(requestOverallForm(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

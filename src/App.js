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
  saveOverallForm,
  setFieldsInvalidMsg,
  requestOverallForm,
  editSingleJob,
  resetJobForm,
  deleteSingleJob,
} from './actions';
import { db, storageRef } from './services/firebase';

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

function App(props) {

  const classes = useStyles();
  const [ isEditing, setIsEditing ] = useState(false);
  const {
    store,
    changeInputValue,
    changeDatePickerValue,
    toggleIsCurrentJob,
    submitSingleJob,
    setFieldsInvalidMsg,
    saveOverallForm,
    requestOverallForm,
    editSingleJob,
    resetJobForm,
    deleteSingleJob,
  } = props;
  const { personalForm, jobForm, jobList, editingJobId } = store;

  useEffect(() => {
    const firebaseDataId = localStorage.getItem('glints-form');
    if(firebaseDataId) {
      requestOverallForm(firebaseDataId);
    }
  }, [requestOverallForm]);

  const handleClickStartEdit = () => {
    setIsEditing(true);
  };

  const handleSaveOverallForm = () => {
    saveOverallForm().then(() => {
      setIsEditing(false);
    })
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
    // context api?
    const ref = db.collection("profiles").doc("DC5p36PJ1qwTN77MJ3ul");
    ref.get().then(doc => {
      console.log(doc.data());
    })
  };

  const devStorage = () => {
    // console.log(storageRef.child('seaotter-2.jpeg')) // Reference
    // console.log(storageRef.child('avatars/seaotter-1.jpeg')) // Reference
    const otter1Ref = storageRef.child('avatars/seaotter-1.jpeg');
    console.log(otter1Ref.fullPath) // avatars/seaotter-1.jpeg
    console.log(otter1Ref.name) // seaotter-1.jpeg
    console.log(otter1Ref.bucket) // glints-fc0aa.appspot.com
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
            {/*<button onClick={() => { setIsEditing(isEditing => !isEditing); }}>Toggle</button>*/}
            {/*<button onClick={devAddData}>Add data to Firebase</button>*/}
            {/*<button onClick={devGetData}>Get data from Firebase</button>*/}
            {/*<button onClick={() => { saveOverallForm() }}>mock SAVE</button>*/}
            <button onClick={devStorage}>Check Storage</button>
            {/* todo: 判斷是否有profile */}
            { (!isEditing && !personalForm.name.value) &&
              renderWelcomeContent()
            }
            { (!isEditing && !!personalForm.name.value) &&
              <ProfileView
                personalForm={personalForm}
                jobList={jobList}
                onClickStartEdit={handleClickStartEdit}
              />
            }
            { isEditing &&
              <ProfileForm
                personalForm={personalForm}
                jobList={jobList}
                jobForm={jobForm}
                editingJobId={editingJobId}
                changeInputValue={changeInputValue}
                changeDatePickerValue={changeDatePickerValue}
                toggleIsCurrentJob={toggleIsCurrentJob}
                editSingleJob={editSingleJob}
                submitSingleJob={submitSingleJob}
                setFieldsInvalidMsg={setFieldsInvalidMsg}
                onSaveOverallForm={handleSaveOverallForm}
                resetJobForm={resetJobForm}
                deleteSingleJob={deleteSingleJob}
              />
            }
          </Paper>
        </Box>
      </Container>
    </MuiPickersUtilsProvider>
  )
}

const mapStateToProps = state => ({
  store: state,
});

const mapDispatchToProps = dispatch => ({
  // toggleTodo: id => dispatch(toggleTodo(id)),
  changeInputValue: payload => dispatch(changeInputValue(payload)),
  changeDatePickerValue: payload => dispatch(changeDatePickerValue(payload)),
  toggleIsCurrentJob:  payload => dispatch(toggleIsCurrentJob(payload)),
  submitSingleJob: payload => dispatch(submitSingleJob(payload)),
  setFieldsInvalidMsg: payload => dispatch(setFieldsInvalidMsg(payload)),
  saveOverallForm: payload => dispatch(saveOverallForm(payload)),
  requestOverallForm: payload => dispatch(requestOverallForm(payload)),
  editSingleJob: payload => dispatch(editSingleJob(payload)),
  resetJobForm: payload => dispatch(resetJobForm(payload)),
  deleteSingleJob: payload => dispatch(deleteSingleJob(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

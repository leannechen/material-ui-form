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
  uploadAvatar,
  uploadLogo,
} from './actions';

const useStyles = makeStyles((theme) => ({
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
    uploadAvatar,
    uploadLogo,
  } = props;
  const { personalForm, jobForm, jobList, editingJobId, firebaseDataId } = store;

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
            { (!isEditing && !firebaseDataId) &&
              renderWelcomeContent()
            }
            { (!isEditing && !!firebaseDataId) &&
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
                uploadAvatar={uploadAvatar}
                uploadLogo={uploadLogo}
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
  uploadAvatar: payload => dispatch(uploadAvatar(payload)),
  uploadLogo: payload => dispatch(uploadLogo(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

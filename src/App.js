import React, { useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  CssBaseline,
  Typography,
  Paper,
  Box,
  Button,
  TextField,
  Dialog,
  DialogContent,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ProfileView from './components/ProfileView';
import ProfileForm from './components/ProfileForm';
import { connect } from 'react-redux';

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
  dialog: {
    [theme.breakpoints.up('sm')]: {
      // minWidth: `500px`,
      // backgroundColor: `gold`,
    },
  },
  dialogContent: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  dialogHeader: {
    display: `flex`,
  },
  dialogCloseButton: {
    marginLeft: `auto`,
  },
  dialogSaveButton: {
    fontSize: `1rem`,
  },
  datePicker: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  dialogFormContainer: {
    width: `80%`,
    margin: `auto`,
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
  const [ isShowModal, setIsShowModal ] = useState(false);
  const [ testDate, setTestDate ] = useState(null);
  const [ isCurrentWork, setIsCurrentWork ] = useState(false);

  const handleClickStartEdit = () => {
    setIsEditing(isEditing => !isEditing);
  };

  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    // todo: clear modal data
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
            { (!isEditing && mockData.name.length === 0) &&
              renderWelcomeContent()
            }
            { (!isEditing && mockData.name.length > 0) &&
              <ProfileView
                {...mockData}
                onClickStartEdit={handleClickStartEdit}
              />
            }
            { isEditing &&
              <ProfileForm
                {...mockData}
                onOpenModal={handleOpenModal}
              />
            }
          </Paper>
        </Box>
      </Container>
      <Dialog
        maxWidth="sm"
        className={classes.dialog}
        open={isShowModal}
        onClose={handleCloseModal}
        aria-labelledby="dialog-title"
      >
        <DialogContent dividers className={classes.dialogContent}>
          <div className={classes.dialogHeader}>
            <IconButton
              aria-label="close"
              className={classes.dialogCloseButton}
              onClick={handleCloseModal}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className={classes.dialogFormContainer}>
            <TextField
              label="Job Title"
              className={classes.textField}
              required
              fullWidth
              error={false}
              helperText={``}
              onChange={() => {}}
            />
            <TextField
              label="Company"
              className={classes.textField}
              required
              fullWidth
              error={false}
              helperText={``}
              onChange={() => {}}
            />
            <div>
              <Typography gutterBottom>
                Company Logo
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AttachFileIcon />}
                onClick={handleOpenModal}
              >
                Upload
              </Button>
            </div>
            <KeyboardDatePicker
              className={classes.datePicker}
              // disableToolbar
              autoOk={true}
              variant="inline"
              format="MM/dd/yyyy"
              views={["year", "month", "date"]}
              label="Start Date"
              value={testDate}
              onChange={(date) => { console.log(date); setTestDate(date); }}
              KeyboardButtonProps={{
                'aria-label': 'Change start date of the job',
              }}
            />
            <KeyboardDatePicker
              className={classes.datePicker}
              autoOk={true}
              variant="inline"
              format="MM/dd/yyyy"
              views={["year", "month", "date"]}
              label="End Date"
              value={null}
              onChange={() => {}}
              KeyboardButtonProps={{
                'aria-label': 'Change end date of the job',
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCurrentWork}
                  onChange={(e) => { setIsCurrentWork(e.target.checked) }}
                  name="isCurrentWork"
                  color="primary"
                />
              }
              label="I am currently working in this role"
            />
            <TextField
              label="Job Description"
              className={classes.textField}
              multiline
              rows={4}
              variant="outlined"
              required
              fullWidth
              error={false}
              placeholder="Describe your works"
              onChange={() => {}}
            />
          </div>
        </DialogContent>
        <Button
          color="primary"
          size="large"
          className={classes.dialogSaveButton}
          onClick={() => {}}
          disabled={true}
        >
          Save
        </Button>
      </Dialog>
    </MuiPickersUtilsProvider>
  )
}

const mapStateToProps = state => ({
  // todos: getVisibleTodos(state.todos, state.visibilityFilter),
  name: state.name,
  age: state.age,
});

const mapDispatchToProps = dispatch => ({
  // toggleTodo: id => dispatch(toggleTodo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


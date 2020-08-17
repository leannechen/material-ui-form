import React, { Fragment, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Typography, Paper, Box, Button, TextField, Dialog, DialogContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

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
  formContainer: {
    margin: `auto`,
    width: `60%`,
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  fieldset: {
    border: `none`,
    padding: 0,
    marginBottom: theme.spacing(4),
  },
  addWorkContainer: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `baseline`,
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
    justifyContent: `space-between`,
    alignItems: `baseline`,
  },
  dialogSaveButton: {
    fontSize: `1rem`,
  }
}));

function App() {
  const classes = useStyles();
  const [ isEditing, setIsEditing ] = useState(true);
  const [ isShowModal, setIsShowModal ] = useState(false);

  const handleClickStartEdit = () => {
    setIsEditing(isEditing => !isEditing);
  };

  const handleInputChange = (fieldName) => (e) => {
    console.log(fieldName);
    console.log(e.target.value)
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
    <Fragment>
      <CssBaseline/>
      <Container maxWidth="md">
        <Box marginTop={5}>
          <Typography variant="h4" component="h2" gutterBottom>
            My Profile
          </Typography>
        </Box>
        <Box paddingY={5} paddingX={4} clone>
          <Paper className={classes.paper}>
            { isEditing?
              <form className={classes.formContainer}>
                <fieldset className={classes.fieldset}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Personal Information
                  </Typography>
                  <TextField
                    id="standard-basic"
                    label="Name"
                    className={classes.textField}
                    required
                    fullWidth
                    error={false}
                    helperText={``}
                    onChange={handleInputChange("name")}
                  />
                  <TextField
                    id="standard-number"
                    label="Age"
                    className={classes.textField}
                    required
                    fullWidth
                    error={false}
                    onChange={handleInputChange("age")}
                  />
                </fieldset>
                <fieldset className={classes.fieldset}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Work Experience
                  </Typography>
                  <div className={classes.addWorkContainer}>
                    <Typography variant="body1" gutterBottom>
                      You don't have any experience yet.
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<AddIcon />}
                      onClick={handleOpenModal}
                    >
                      Add
                    </Button>
                  </div>
                </fieldset>
              </form>
              :
              renderWelcomeContent()
            }
          </Paper>
        </Box>
      </Container>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        className={classes.dialog}
        open={isShowModal}
        onClose={handleCloseModal}
        aria-labelledby="dialog-title"
      >
        <DialogContent dividers className={classes.dialogContent}>
          <div className={classes.dialogHeader}>
            <Typography variant="h4" id="dialog-title" gutterBottom>
              Work Experience
            </Typography>
            <IconButton
              aria-label="close"
              className={classes.dialogCloseButton}
              onClick={handleCloseModal}
            >
              <CloseIcon />
            </IconButton>
          </div>
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
        </DialogContent>
        <Button
          color="primary"
          size="large"
          className={classes.dialogSaveButton}
          onClick={() => {}}
        >
          Save
        </Button>
      </Dialog>
    </Fragment>
  )
}

export default App;

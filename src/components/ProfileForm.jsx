import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardContent,
  CardMedia, TextField, Button, CardActions, IconButton,
} from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import JobDialog from "./JobDialog";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: `auto`,
    width: `60%`,
  },
  heading: {
    fontWeight: `bold`,
    marginBottom: theme.spacing(3),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  fieldset: {
    border: `none`,
    padding: 0,
    marginBottom: theme.spacing(4),
  },
  addBtnContainer: {
    textAlign: `right`,
    marginBottom: theme.spacing(1),
  },
  card: {
    display: `flex`,
    fontSize: `1rem`,
    marginBottom: theme.spacing(1),
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  cardImg: {
    minWidth: `100px`,
    maxWidth: `100%`,
    minHeight: `100px`,
    maxHeight: `300px`,
  },
  cardActions: {
    flexDirection: `column`,
    padding: 0,
  },
  jobTh: {
    textAlign: `left`,
    width: `30%`,
    padding: theme.spacing(1),
    verticalAlign: `top`,
  },
  jobTd: {
    padding: theme.spacing(1),
    verticalAlign: `top`,
  },
}));

function ProfileForm(props) {
  const classes = useStyles();
  const { personalForm, jobList, jobForm, changePersonalInput } = props;
  const [ isShowDialog, setIsShowDialog ] = useState(false);

  const handleInputChange = (fieldName) => (e) => {
    console.log(fieldName, e.target.value);
    changePersonalInput({ fieldName, value: e.target.value });
  };

  const handleOpenDialog = () => {
    setIsShowDialog(true);
  };

  const handleCloseDialog = () => {
    setIsShowDialog(false);
  };

  return (
    <div>
      <form className={classes.formContainer}>
        <fieldset className={classes.fieldset}>
          <Typography variant="h5" component="h3" className={classes.heading} gutterBottom>
            Personal Information
          </Typography>
          <TextField
            id="standard-basic"
            label="Name"
            value={personalForm.name.value}
            className={classes.textField}
            required
            fullWidth
            error={!!personalForm.name.invalidMsg}
            helperText={personalForm.name.invalidMsg}
            onChange={handleInputChange("name")}
          />
          <TextField
            id="standard-number"
            label="Age"
            type="number"
            value={personalForm.age.value}
            className={classes.textField}
            required
            fullWidth
            error={!!personalForm.age.invalidMsg}
            helperText={personalForm.age.invalidMsg}
            onChange={handleInputChange("age")}
            inputProps={{ 'maxLength': '3' }}
          />
        </fieldset>
        <fieldset className={classes.fieldset}>
          <Typography variant="h5" component="h3" className={classes.heading} gutterBottom>
            Work Experience
          </Typography>
          <div>
            <div className={classes.addBtnContainer}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
              >
                Add
              </Button>
            </div>
            { jobList.length === 0 ?
              <Typography variant="body1" gutterBottom>
                You don't have any experience yet.
              </Typography>
              :
              jobList.map(job => (
                <Card key={job.company} className={classes.card}>
                  <CardContent>
                    <table>
                      <tbody>
                        <tr>
                          <th className={classes.jobTh}>Job Title</th>
                          <td className={classes.jobTd}>{job.jobTitle}</td>
                        </tr>
                        <tr>
                          <th className={classes.jobTh}>Company</th>
                          <td className={classes.jobTd}>{job.company}</td>
                        </tr>
                        <tr>
                          <th className={classes.jobTh}>Company Logo</th>
                          <td className={classes.jobTd}>{job.companyLogo}
                            <CardMedia
                              className={classes.cardImg}
                              image="https://source.unsplash.com/random/400x300"
                              title={job.company}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th className={classes.jobTh}>Start Date</th>
                          <td className={classes.jobTd}>{job.startDate}</td>
                        </tr>
                        <tr>
                          <th className={classes.jobTh}>End Date</th>
                          <td className={classes.jobTd}>{job.isCurrentJob? "N/A (Present)": job.endDate}</td>
                        </tr>
                        <tr>
                          <th className={classes.jobTh}>Job Description</th>
                          <td className={classes.jobTd}>{job.jobDescription}</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <IconButton
                      color="primary"
                      aria-label="delete the job"
                      className={classes.cardBtn}
                      onClick={() => {}}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="edit the job"
                      className={classes.cardBtn}
                      onClick={() => {}}
                    >
                      <EditIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))
            }
          </div>
        </fieldset>
      </form>
      <JobDialog
        isShowDialog={isShowDialog}
        jobForm={jobForm}
        onOpenDialog={handleOpenDialog}
        onCloseDialog={handleCloseDialog}
      />
    </div>
  )
}

export default ProfileForm;

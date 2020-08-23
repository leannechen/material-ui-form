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
import validator from "../utils/validator";
import { getDateInFormat } from "../utils/date";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: `auto`,
    width: `60%`,
    [theme.breakpoints.down('sm')]: {
      width: `90%`,
    },
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
    padding: theme.spacing(3),
  },
  cardContent: {
    flex: 7,
    padding: theme.spacing(0),
  },
  cardActions: {
    flex: 1,
    flexDirection: `column`,
    padding: 0,
  },
  cardImg: {
    minWidth: `100px`,
    maxWidth: `100%`,
    minHeight: `100px`,
    maxHeight: `300px`,
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
  btnSubmit: {
    display: `block`,
    margin: `auto`,
    padding: `10px`,
    minWidth: `60%`,
    fontSize: `1rem`,
  },
  utilMultiLine: {
    whiteSpace: `pre-line`,
  }
}));

function ProfileForm(props) {
  const classes = useStyles();
  const { personalForm, jobList, jobForm, changeInputValue, changeDatePickerValue, toggleIsCurrentJob, submitSingleJob, setFieldsInvalidMsg, submitOverallForm } = props;
  const [ isShowDialog, setIsShowDialog ] = useState(false);

  const handleInputChange = (fieldName, formName) => (e) => {
    changeInputValue({
      formName,
      fieldName,
      value: e.target.value
    });
  };

  const handleDatePickerChange = fieldName => value => {
    changeDatePickerValue({
      fieldName,
      value: new Date(value).getTime(),
    })
  };

  const handleToggleIsCurrentJob = e => {
    toggleIsCurrentJob({
      value: e.target.checked,
    });
  };

  const handleSubmitJob = () => {
    setIsShowDialog(false);
    submitSingleJob();
  };

  const handleSubmitForm = () => {

    const validatedFields = Object.keys(personalForm)
      .filter(fieldName => fieldName !== "avatarImg") // FIXME: avatarImg
      .reduce((accu, fieldName) => {

        const invalidMsg = validator({
          value: personalForm[fieldName].value,
          validateRule: personalForm[fieldName].validateRule,
        });

        return {
          ...accu,
          [fieldName]: {
            ...personalForm[fieldName],
            touched: true,
            invalidMsg,
          }
        }
      }, {});

    const isAnyFieldInvalid = Object.keys(validatedFields)
      .some(fieldName => !!validatedFields[fieldName].invalidMsg);

    if(isAnyFieldInvalid) {
      setFieldsInvalidMsg({ validatedFields });
    } else {
      submitOverallForm();
    }
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
                  <CardContent className={classes.cardContent}>
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
                          <td className={classes.jobTd}>{getDateInFormat(job.startDate)}</td>
                        </tr>
                        <tr>
                          <th className={classes.jobTh}>End Date</th>
                          <td className={classes.jobTd}>{job.isCurrent? "N/A (Present)": getDateInFormat(job.endDate)}</td>
                        </tr>
                        <tr>
                          <th className={classes.jobTh}>Job Description</th>
                          <td className={`${classes.jobTd} ${classes.utilMultiLine}`}>{job.jobDesc}</td>
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
        <Button
          color="primary"
          variant="contained"
          size="large"
          className={classes.btnSubmit}
          onClick={handleSubmitForm}
        >
          Save
        </Button>
      </form>
      <JobDialog
        isShowDialog={isShowDialog}
        jobForm={jobForm}
        onInputChange={handleInputChange}
        onDatePickerChange={handleDatePickerChange}
        onToggleIsCurrentJob={handleToggleIsCurrentJob}
        onSubmitSingleJob={handleSubmitJob}
        onOpenDialog={handleOpenDialog}
        onCloseDialog={handleCloseDialog}
      />
    </div>
  )
}

export default ProfileForm;

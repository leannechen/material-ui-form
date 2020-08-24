import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  CardActions,
  IconButton,
  Avatar,
  CircularProgress,
} from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
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
  avatarContainer: {
    marginBottom: theme.spacing(2),
  },
  avatarInner: {
    position: `relative`,
    textAlign: `center`,
  },
  avatar: {
    display: `inline-block`,
    width: `100px`,
    height: `100px`,
  },
  avatarUploadBtn: {
    position: `absolute`,
    bottom: 0,
  },
  errorMsg: {
    textAlign: `center`,
    fontSize: `.875rem`,
    color: theme.palette.secondary.light,
  },
  uploadSpinner: {
    alignSelf: `flex-end`,
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
  const {
    personalForm,
    jobList,
    jobForm,
    changeInputValue,
    changeDatePickerValue,
    toggleIsCurrentJob,
    submitSingleJob,
    setFieldsInvalidMsg,
    onSaveOverallForm,
    editSingleJob,
    resetJobForm,
    deleteSingleJob,
    uploadAvatar,
    uploadLogo,
  } = props;
  const [ isShowDialog, setIsShowDialog ] = useState(false);
  const [ isUploading, setIsUploading ] = useState(false);
  const avatarInputEl = useRef(null);

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
      onSaveOverallForm();
    }
  };

  const handleEditJob = jobId => () => {
    setIsShowDialog(true);
    // set current job to jobForm
    editSingleJob({ jobId });
  };

  const handleDeleteJob = jobId => () => {
    deleteSingleJob({ jobId });
  };

  const handleOpenDialog = () => {
    setIsShowDialog(true);
  };

  const handleCloseDialog = () => {
    setIsShowDialog(false);
    resetJobForm();
  };

  const handleUploadClick = () => {
    avatarInputEl.current.click();
  };

  const handleFileSelect = event => {
    // const setImgUrl = this.setImgUrl;
    const { files } = event.target;
    console.log(files[0]); // File
    if(files[0]) {
      uploadAvatar(files[0]);
    }
    // const reader = new FileReader();
    // reader.onload = function () {
      // setImgUrl(reader.result);
      // console.log(reader.result); // base64
    // };

    // if (files[0]) {
      // this.setState({
      //   isShowImgCropper: true,
      //   imgOriginalFile: input.files[0],
      // });
      // reader.readAsDataURL(files[0]); // base64
    // }
  };

  const handleLogoSelect = event => {
    const { files } = event.target;
    console.log(files[0]); // File
    if(files[0]) {
      uploadLogo(files[0]);
    }
  };

  return (
    <div>
      <form className={classes.formContainer}>
        <fieldset className={classes.fieldset}>
          <div className={classes.avatarContainer}>
            <div className={classes.avatarInner}>
              <Avatar
                alt={personalForm.name.value}
                src={personalForm.avatarImg.value}
                className={classes.avatar}
              />
              {
                isUploading ?
                  <CircularProgress
                    color="secondary"
                    size={30}
                    className={classes.uploadSpinner}
                  /> :
                  <IconButton
                    color="secondary"
                    aria-label="upload your avatar"
                    className={classes.avatarUploadBtn}
                    disabled={isUploading}
                    onClick={handleUploadClick}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
              }
              <input
                type="file"
                style={{ display: 'none' }}
                ref={avatarInputEl}
                onChange={handleFileSelect}
                accept="image/*"
              />
            </div>
            <Typography variant="body1" className={classes.errorMsg} gutterBottom>
              {personalForm.avatarImg.invalidMsg}
            </Typography>
          </div>
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
                <Card key={job.id} className={classes.card}>
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
                          <td className={classes.jobTd}>
                            <CardMedia
                              className={classes.cardImg}
                              image={job.companyLogo}
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
                      onClick={handleDeleteJob(job.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="edit the job"
                      className={classes.cardBtn}
                      onClick={handleEditJob(job.id)}
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
        onLogoSelect={handleLogoSelect}
      />
    </div>
  )
}

export default ProfileForm;

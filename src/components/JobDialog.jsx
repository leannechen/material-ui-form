import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
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
    padding: `${theme.spacing(2)}px 0`,
    borderRadius: 0,
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  datePicker: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  dialogFormContainer: {
    width: `80%`,
    margin: `auto`,
  },
  uploadContainer: {
    margin: `${theme.spacing(2)}px 0`,
  },
  uploadLabel: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  uploadPreviewContainer: {
    width: `300px`,
    maxWidth: `100%`,
    marginTop: theme.spacing(2),
    overflow: `hidden`,
  },
  uploadPreviewImg: {
    objectFit: `contain`,
    width: `100%`,
    height: `100%`,
  },
}));

function JobDialog(props) {

  const classes = useStyles();
  const {
    isShowDialog,
    onCloseDialog,
    jobForm,
    onInputChange,
    onDatePickerChange,
    onToggleIsCurrentJob,
    onSubmitSingleJob,
    onLogoSelect
  } = props;
  const fileInputEl = useRef(null);

  const handleUploadClick = () => {
    fileInputEl.current.click();
  };

  const isSubmitBtnEnabled = Object.keys(jobForm)
      .filter(fieldName => fieldName !== "isCurrent")
      .every(fieldName => {
        const isCorrectValue = (jobForm[fieldName].value && !jobForm[fieldName].invalidMsg);
        return (fieldName === "endDate")?
          isCorrectValue || (jobForm.isCurrent.value === true)
          :
          isCorrectValue;
      });

  return (
    <Dialog
      maxWidth="sm"
      className={classes.dialog}
      open={isShowDialog}
      onClose={onCloseDialog}
      aria-labelledby="dialog-title"
    >
      <DialogContent dividers className={classes.dialogContent}>
        <div className={classes.dialogHeader}>
          <IconButton
            aria-label="close"
            className={classes.dialogCloseButton}
            onClick={onCloseDialog}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.dialogFormContainer}>
          <TextField
            label="Job Title"
            value={jobForm.jobTitle.value}
            className={classes.textField}
            required
            fullWidth
            error={!!jobForm.jobTitle.invalidMsg}
            helperText={jobForm.jobTitle.invalidMsg}
            onChange={onInputChange("jobTitle", "jobForm")}
          />
          <TextField
            label="Company"
            value={jobForm.company.value}
            className={classes.textField}
            required
            fullWidth
            error={!!jobForm.company.invalidMsg}
            helperText={jobForm.company.invalidMsg}
            onChange={onInputChange("company", "jobForm")}
          />
          <div className={classes.uploadContainer}>
            <Typography gutterBottom className={classes.uploadLabel}>
              Company Logo *
            </Typography>
            <div>
              <Button
                variant="contained"
                color="secondary"
                aria-label="Upload company logo"
                startIcon={<AttachFileIcon />}
                onClick={handleUploadClick}
              >
                Upload
              </Button>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputEl}
                onChange={onLogoSelect}
                accept="image/*"
              />
              <div className={classes.uploadPreviewContainer}>
                { jobForm.companyLogo.value &&
                  <img
                    src={jobForm.companyLogo.value}
                    alt={jobForm.company.value}
                    className={classes.uploadPreviewImg}
                  />
                }
              </div>
            </div>
          </div>
          <KeyboardDatePicker
            className={classes.datePicker}
            autoOk={true}
            variant="inline"
            format="yyyy/MM/dd"
            views={["year", "month", "date"]}
            label="Start Date"
            value={jobForm.startDate.value? new Date(jobForm.startDate.value) : null}
            onChange={onDatePickerChange("startDate")}
            KeyboardButtonProps={{
              'aria-label': 'Change start date of the job',
            }}
            error={jobForm.startDate.touched && !!jobForm.startDate.invalidMsg}
            helperText={jobForm.startDate.invalidMsg}
          />
          <KeyboardDatePicker
            className={classes.datePicker}
            autoOk={true}
            variant="inline"
            format="yyyy/MM/dd"
            views={["year", "month", "date"]}
            label="End Date"
            value={jobForm.endDate.value? new Date(jobForm.endDate.value) : null}
            onChange={onDatePickerChange("endDate")}
            KeyboardButtonProps={{
              'aria-label': 'Change end date of the job',
            }}
            error={jobForm.endDate.touched && !!jobForm.endDate.invalidMsg}
            helperText={jobForm.endDate.invalidMsg}
            disabled={jobForm.isCurrent.value}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={jobForm.isCurrent.value}
                onChange={onToggleIsCurrentJob}
                name="isCurrent"
                color="primary"
              />
            }
            label="I am currently working in this role"
            className={classes.textField}
          />
          <TextField
            label="Job Description"
            value={jobForm.jobDesc.value}
            variant="outlined"
            className={classes.textField}
            multiline
            rows={4}
            required
            fullWidth
            error={!!jobForm.jobDesc.invalidMsg}
            helperText={jobForm.jobDesc.invalidMsg}
            placeholder="Describe your works"
            onChange={onInputChange("jobDesc", "jobForm")}
          />
        </div>
      </DialogContent>
      <Button
        color="primary"
        variant="contained"
        className={classes.dialogSaveButton}
        onClick={onSubmitSingleJob}
        disabled={!isSubmitBtnEnabled}
      >
        Save
      </Button>
    </Dialog>
  )
}

export default JobDialog;

import React from 'react';
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

function JobDialog(props) {

  const classes = useStyles();
  const { isShowDialog, onCloseDialog, onOpenDialog, jobForm } = props;

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
            onChange={() => {}}
          />
          <TextField
            label="Company"
            value={jobForm.company.value}
            className={classes.textField}
            required
            fullWidth
            error={!!jobForm.company.invalidMsg}
            helperText={jobForm.company.invalidMsg}
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
              onClick={onOpenDialog}
            >
              Upload
            </Button>
          </div>
          <KeyboardDatePicker
            className={classes.datePicker}
            autoOk={true}
            variant="inline"
            format="MM/dd/yyyy"
            views={["year", "month", "date"]}
            label="Start Date"
            value={jobForm.startDate.value}
            onChange={(date) => { console.log(date); }}
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
            value={jobForm.endDate.value}
            onChange={(date) => { console.log(date); }}
            KeyboardButtonProps={{
              'aria-label': 'Change end date of the job',
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={jobForm.isCurrent.value}
                onChange={(e) => { console.log(e.target.checked) }}
                name="isCurrent"
                color="primary"
              />
            }
            label="I am currently working in this role"
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
  )
}

export default JobDialog;

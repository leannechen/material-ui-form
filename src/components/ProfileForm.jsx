import React from 'react';
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
  const { name, age, jobList, onOpenModal } = props;

  const handleInputChange = (fieldName) => (e) => {
    console.log(fieldName);
    console.log(e.target.value)
  };

  const handleOpenModal = () => {
    onOpenModal();
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
            value={name}
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
            value={age}
            className={classes.textField}
            required
            fullWidth
            error={false}
            onChange={handleInputChange("age")}
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
                onClick={handleOpenModal}
              >
                Add
              </Button>
            </div>
            { jobList.length === 0 ?
              <Typography variant="body1" gutterBottom>
                You don't have any experience yet.
              </Typography>
              :
              jobList.map(mockItem => (
                <Card key={mockItem.company} className={classes.card}>
                  <CardContent>
                    <table>
                      <tr>
                        <th className={classes.jobTh}>Job Title</th>
                        <td className={classes.jobTd}>{mockItem.jobTitle}</td>
                      </tr>
                      <tr>
                        <th className={classes.jobTh}>Company</th>
                        <td className={classes.jobTd}>{mockItem.company}</td>
                      </tr>
                      <tr>
                        <th className={classes.jobTh}>Company Logo</th>
                        <td className={classes.jobTd}>{mockItem.companyLogo}
                          <CardMedia
                            className={classes.cardImg}
                            image="https://source.unsplash.com/random/400x300"
                            title={mockItem.company}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className={classes.jobTh}>Start Date</th>
                        <td className={classes.jobTd}>{mockItem.startDate}</td>
                      </tr>
                      <tr>
                        <th className={classes.jobTh}>End Date</th>
                        <td className={classes.jobTd}>{mockItem.isCurrentJob? "N/A (Present)": mockItem.endDate}</td>
                      </tr>
                      <tr>
                        <th className={classes.jobTh}>Job Description</th>
                        <td className={classes.jobTd}>{mockItem.jobDescription}</td>
                      </tr>
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
    </div>
  )
}

export default ProfileForm;

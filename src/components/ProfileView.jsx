import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Button,
} from '@material-ui/core';
import { getDateInFormat } from '../utils/date';

const useStyles = makeStyles((theme) => ({
  viewContainer: {
    margin: `auto`,
    width: `60%`,
  },
  topArea: {
    textAlign: `right`,
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: `100px`,
    height: `100px`,
    margin: `auto auto ${theme.spacing(2)}px`,
  },
  heading: {
    fontWeight: `bold`,
  },
  personalContainer: {
    fontSize: `1rem`,
    marginBottom: theme.spacing(3),
  },
  personalTh: {
    textAlign: `left`,
    width: `30%`,
    padding: theme.spacing(1),
    verticalAlign: `top`,
  },
  personalTd: {
    padding: theme.spacing(1),
    verticalAlign: `top`,
  },
  card: {
    display: `flex`,
    alignItems: `center`,
    marginBottom: theme.spacing(1),
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderLeft: `5px solid ${theme.palette.primary.main}`,
    borderRadius: 0,
  },
  cardTitle: {
    fontWeight: `bold`,
    fontSize: `1.3rem`,
  },
  cardContent: {
    flex: 3,
  },
  cardImg: {
    flex: 1,
    width: `150px`,
    height: `150px`,
  }
}));

function ProfileView(props) {
  const classes = useStyles();
  const { personalForm, jobList, onClickStartEdit } = props;
  const { name, age, avatarImg } = personalForm;

  return (
    <div className={classes.viewContainer}>
      <div className={classes.topArea}>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={onClickStartEdit}
        >
          Edit
        </Button>
      </div>
      <Avatar alt={name.value} src={avatarImg.value} className={classes.avatar} />
      <Typography variant="h5" component="h3" className={classes.heading} gutterBottom>
        Personal Information
      </Typography>
      <div className={classes.personalContainer}>
        <table>
          <tbody>
            <tr>
              <th className={classes.personalTh}>Name</th>
              <td className={classes.personalTd}>{name.value}</td>
            </tr>
            <tr>
              <th className={classes.personalTh}>Age</th>
              <td className={classes.personalTd}>{age.value}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Typography variant="h5" component="h3" className={classes.heading} gutterBottom>
        Work Experience
      </Typography>
      { jobList.length === 0 ?
        <Typography variant="body1" gutterBottom>
          You don't have any experience yet.
        </Typography>
        :
        jobList.map(job => (
          <Card
            key={job.company}
            variant="outlined"
            className={classes.card}
          >
            <CardContent className={classes.cardContent}>
              <Typography component="h5" variant="h6" className={classes.cardTitle}>
                {job.jobTitle}, {job.company}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {getDateInFormat(job.startDate)} - {job.isCurrent? "Present": getDateInFormat(job.endDate)}
              </Typography>
              <Typography variant="body1">
                {job.jobDesc}
              </Typography>
            </CardContent>
            <CardMedia
              className={classes.cardImg}
              image={job.companyLogo}
              title={job.company}
            />
          </Card>
        ))
      }
    </div>
  )
}

export default ProfileView;

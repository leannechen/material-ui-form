import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  viewContainer: {
    margin: `auto`,
    width: `60%`,
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
    borderLeft: `3px solid ${theme.palette.primary.main}`,
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
  const { name, age, avatarImg, jobList } = props;

  return (
    <div className={classes.viewContainer}>
      <Avatar alt={name} src={avatarImg} className={classes.avatar} />
      <Typography variant="h5" component="h3" className={classes.heading} gutterBottom>
        Personal Information
      </Typography>
      <div className={classes.personalContainer}>
        <table>
          <tbody>
            <tr>
              <th className={classes.personalTh}>Name</th>
              <td className={classes.personalTd}>{name}</td>
            </tr>
            <tr>
              <th className={classes.personalTh}>Age</th>
              <td className={classes.personalTd}>{age}</td>
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
        jobList.map(mockItem => (
          <Card
            key={mockItem.company}
            variant="outlined"
            className={classes.card}
          >
            <CardContent className={classes.cardContent}>
              <Typography component="h5" variant="h6" className={classes.cardTitle}>
                {mockItem.jobTitle}, {mockItem.company}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {mockItem.startDate} ~ {mockItem.isCurrentJob? `Present`: mockItem.endDate}
              </Typography>
              <Typography variant="body1">
                {mockItem.jobDescription}
              </Typography>
            </CardContent>
            <CardMedia
              className={classes.cardImg}
              image="https://source.unsplash.com/random/400x300"
              title="Live from space album cover"
            />
          </Card>
        ))
      }
    </div>
  )
}

export default ProfileView;

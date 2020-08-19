import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    display: `flex`,
    alignItems: `center`,
    marginBottom: theme.spacing(1),
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
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
  const { jobList } = props;
  return (
    <div>
      <p>View Mode</p>
      { jobList.length === 0 ?
        <Typography variant="body1" gutterBottom>
          You don't have any experience yet.
        </Typography>
        :
        jobList.map(mockItem => (
          <Card key={mockItem.company} className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography component="h5" variant="h5">
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

import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Typography, Paper, Box, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: `600px`,
  },
  paper: {
  },
  welcomeText: {
    marginBottom: theme.spacing(2),
  }
}));

function App() {
  const classes = useStyles();

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
            {/* welcome */}
            <Grid align="center">
              <Typography variant="body1" gutterBottom align="center" className={classes.welcomeText}>
                You haven't input your profile yet.
              </Typography>
              <Button variant="contained" color="primary" size="large">
                Let's create one!
              </Button>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Fragment>
  )
}

export default App;

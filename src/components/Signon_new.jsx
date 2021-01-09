import React, { useState } from 'react';
import {Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container} from '@material-ui/core';
import {ToggleButtonGroup, ToggleButton, Alert} from '@material-ui/lab';
import { ThemeProvider, makeStyles} from '@material-ui/core/styles';
import useInputState from './useInputState';
import theme from "../styles/theme.js"

//STYLING:
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


//SignIn_SignUp COMPONENT:
const Signon_new = ({ history }) => {
  const [username, handleUsername] = useInputState('');
  const [password, handlePassword] = useInputState('');
  const [email, handleEmail] = useInputState('');
  const [warn, setWarn] = useState(false);
  const [nameExists, setNameExists] = useState(null);
  const [hasAccount, setHasAccount] = useState(false);
  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();

    const body = hasAccount
      ? { username, password }
      : { username, email, password };
    console.log('body==>', body);

    try {
      const response = await fetch(
        hasAccount ? '/auth/signin' : '/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      let data = await response.jason()

      if (!data.err) {
        console.log(hasAccount ? 'Signed In!' : 'Signed Up!');
        //redirect to Home
        history.push(`/join/${username}`);
      } else {
        setWarn(true);
        setTimeout(() => {
          setWarn(false);
        }, 2000);
      }
    } catch (error) {
      console.log(`Error in handleSubmit of Signon component`, error);
    }
  };

  const handleClick = async e => {
    e.preventDefault();

    const body = { username };
    console.log('body==>', body);

    try {
      const response = await fetch('/auth/checkusername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('response.status => ', response.status);

      if (response.status === 200) {
        const data = await response.json();
        console.log('data => ', data);

        setNameExists(data);

        setTimeout(() => {
          setNameExists(null);
        }, 2000);
      } else {
        setWarn(true);

        setTimeout(() => {
          setWarn(false);
        }, 2000);
      }
    } catch (error) {
      console.log('Error in handleClick of Signon component:', error);
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <ThemeProvider /*theme={theme} */>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography 	variant="h3"
							color="primary"
							style={{ fontWeight: '800', margin: "10px" }}>Welcome!
        </Typography>
        <ToggleButtonGroup
          value={hasAccount}
          exclusive
          onChange={(event, status) => {
            if (status !== null) {
              setHasAccount(status);
            }
          }}
          aria-label="signon-toggle"
        >
          <ToggleButton value={false} aria-label="signup">
            Sign Up
          </ToggleButton>
          <ToggleButton value={true} aria-label="signin">
            Sign In
          </ToggleButton>
        </ToggleButtonGroup>
  
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleUsername}
          />
          {!hasAccount && (
            <Button onClick={handleClick} fullWidth variant="contained" color="secondary" style={{ fontWeight: '700'}}>Check Availability</Button>
          )}

          {nameExists === null ? null : nameExists ? (
            <Alert severity="error">
              Username Already Exist!
            </Alert>
          ) : (
            <Alert severity="success">
              Username Is Available!
            </Alert>
          )}

          {!hasAccount && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmail}
            />
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePassword}
          />
          {hasAccount ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ fontWeight: '700'}}
            >
              {' '}
              Sign In
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ fontWeight: '700'}}
            >
              {' '}
              Sign Up
            </Button>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
      </ThemeProvider>
    </Container>
    
  );
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © ChatLingo'}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default Signon_new;

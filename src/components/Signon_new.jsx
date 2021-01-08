import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Signon from './Signon';
import useInputState from './useInputState';

const Signon_new = ({ history }) => {
  const [username, handleUsername] = useInputState('');
  const [password, handlePassword] = useInputState('');
  const [email, handleEmail] = useInputState('');
  const [warn, setWarn] = useState(false);
  const [nameExists, setNameExists] = useState(null);
  const [hasAccount, setHasAccount] = useState(false);

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

      console.log('response.status => ', response.status);

      if (response.status === 200) {
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
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
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
        {/* <Typography component="h1" variant="h5">
          Sign in
        </Typography> */}
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
            <Button onClick={handleClick}>Check Availability</Button>
          )}

          {nameExists === null ? null : nameExists ? (
            <Alert severity="error">
              This is an error alert — check it out!
            </Alert>
          ) : (
            <Alert severity="success">
              This is a success alert — check it out!
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
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          {hasAccount ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
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
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default Signon_new;

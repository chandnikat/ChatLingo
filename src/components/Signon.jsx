import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useInputState from './useInputState';

const Signon = ({ history }) => {
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

  const styleRed = {
    color: 'red',
  };

  return (
    <div className="signon">
      <button className="toggle" onClick={() => setHasAccount(!hasAccount)}>
        toggle
      </button>
      {hasAccount ? <h1>SignIn</h1> : <h1>SignUp</h1>}

      {/* <div className="redirect-to-signin">
        <p>Already have an account?</p>
        <Link to="/" className="link-signin">
          Sign In
        </Link>
      </div> */}

      <form className="form-signon" onSubmit={handleSubmit}>
        <label>
          <span>Username</span>
          <input
            className="margin-bottom-10"
            type="text"
            value={username}
            onChange={handleUsername}
          />
        </label>

        {!hasAccount && (
          <div className="checkUsername">
            <button onClick={handleClick}>Check Availability</button>
            {nameExists === null ? null : nameExists ? (
              <img src={'../assets/images/x.png'} />
            ) : (
              <img src={'../assets/images/checkmark.png'} />
            )}

            <label>
              <span>eMail</span>
              <input type="email" value={email} onChange={handleEmail} />
            </label>
          </div>
        )}

        <label>
          <span>Password</span>
          <input type="password" value={password} onChange={handlePassword} />
        </label>
        {hasAccount ? (
          <button className="btn btn-signon">Sign In</button>
        ) : (
          <button className="btn btn-signon">Sign Up</button>
        )}

        {warn &&
          (hasAccount ? (
            <p style={styleRed}>
              Invalid Username Or Password. Please Try Again Or Go To Sign Up.
            </p>
          ) : (
            <p style={styleRed}>Sign Up Not Completed. Please Try Again</p>
          ))}
      </form>
    </div>
  );
};

export default Signon;

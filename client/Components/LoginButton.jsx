import React from 'react';

const LoginButton = (props) => {
  return (
    <button onClick={props.authorize} id='loginButton'>
      Login
    </button>
  );
};

export default LoginButton;

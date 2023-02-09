import React from 'react';
import UserInput from './UserInput.jsx';

const LoginPage = (props) => {
  return (
    <div id='loginPageBox'>
      <UserInput authorize={props.authorize} />
    </div>
  );
};

export default LoginPage;
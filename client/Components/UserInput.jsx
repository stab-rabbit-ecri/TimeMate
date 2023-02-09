import React from 'react';
import LoginButton from './LoginButton.jsx';

const UserInput = (props) => {
  return (
    <section id='outerLoginBox'>
      <div id='timemate'>TimeMate</div>
      <section id='loginBox'>
        <input
          id='username'
          type='text'
          htmlFor='username'
          placeholder='username'
        ></input>
        <input
          id='password'
          type='password'
          htmlFor='password'
          placeholder='password'
        ></input>
        <LoginButton authorize={props.authorize} />
      </section>
    </section>
  );
};

export default UserInput;

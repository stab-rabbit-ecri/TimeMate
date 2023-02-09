import React from 'react';

const LogOutButton = (props) => {
  return (
    <button onClick={props.logOut} id='logOutButton'>
      Log Out
    </button>
  );
};

export default LogOutButton;

import React from 'react';

const logOutButton = (props) => {
  return (
    <button onClick={props.logOut} id='logOutButton'>
      Log Out
    </button>
  );
};

export default logOutButton;

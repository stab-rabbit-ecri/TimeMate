import React from 'react';

const ClockIn = (props) => {
  return (
    <button onClick={props.toggleClockIn} id='clockInButton'>
      Clock In
    </button>
  );
};

export default ClockIn;

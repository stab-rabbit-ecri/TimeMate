import React from 'react';

const ClockOut = (props) => {
  return (
    <button onClick={props.toggleClockIn} id='clockOutButton'>
      Clock Out
    </button>
  );
};

export default ClockOut;

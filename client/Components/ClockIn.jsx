import React, { Component } from 'react';

const ClockIn = (props) => {
  return (
    <button onClick={props.toggleClockIn} id='clockInButton'>
      Clock In
    </button>
  );
};

// class ClockIn extends Component {
//   render() {
//     return (
//       <button onClick={props.toggleClockIn} id='clockInButton'>
//         Clock In
//       </button>
//     );
//   }
// }

export default ClockIn;

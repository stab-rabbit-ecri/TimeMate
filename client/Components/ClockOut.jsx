import React, { useState } from 'react';

const ClockOut = (props) => {
  return (
    <button onClick={props.toggleClockIn} id='clockOutButton'>
      Clock Out
    </button>
  );
};

// class ClockOut extends Component {
//   render() {
//     return (
//       <button onClick={this.props.toggleClockIn} id='clockOutButton'>
//         Clock Out
//       </button>
//     );
//   }
// }

export default ClockOut;

import React from 'react';

const LoginButton = (props) => {
  return (
    <button onClick={props.authorize} id='loginButton'>
      Login
    </button>
  );
};

// class LoginButton extends Component {
//   render() {
//     return (
//       <button onClick={this.props.authorize} id='loginButton'>
//         Login
//       </button>
//     );
//   }
// }

export default LoginButton;

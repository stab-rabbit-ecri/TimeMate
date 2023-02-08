import React from 'react';
import LoginPage from './Components/LoginPage.jsx';
import EmployeePage from './Components/EmployeePage.jsx';
import './public/styles.css';
import ManagerPage from './Components/ManagerPage.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [empId, setEmpId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [totalHours, setTotalHours] = useState(0);
  //function is checking to see if username password exists (sent with payload)
  const checkCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.Success === 'Worker') {
          setIsLoggedIn(true);
          setRole('worker');
          setEmpId(data.emp_id);
          setFirstName(data.first_name);
          // setTotalHours(data.totalHours) => fix totalHours, see the schema
          //WHAT IS TOTAL HOURS?
        } else if (data.Success === 'Manager') {
          setIsLoggedIn(true);
          setRole('manager');
          setEmpId(data.emp_id);
          setFirstName(data.first_name);
        } else if (data.error) {
          alert('your username/password is incorrect');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    console.log('Logging Out');
    setIsLoggedIn(false);
  };

  if (isLoggedIn && role === 'worker') {
    return (
      <EmployeePage
        firstName={firstName}
        empId={empId}
        logOut={logOut}
        totalHours={totalHours} //WHAT IS TOTAL HOURS?
      />
    );
  } else if (isLoggedIn && role === 'manager') {
    return <ManagerPage logOut={logOut} />;
  } else {
    return <LoginPage authorize={checkCredentials} />;
  }
};

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoggedIn: false,
//       role: '',
//       emp_id: '',
//       first_name: '',
//     };
//     this.checkCredentials = this.checkCredentials.bind(this);
//     this.logOut = this.logOut.bind(this);
//   }

//   render() {
//     if (this.state.isLoggedIn && this.state.role === 'worker') {
//       return (
//         <EmployeePage
//           firstName={this.state.first_name}
//           empId={this.state.emp_id}
//           logOut={this.logOut}
//           totalHours={this.state.totalHours}
//         />
//       );
//     } else if (this.state.isLoggedIn && this.state.role === 'manager') {
//       return <ManagerPage logOut={this.logOut}/>;
//     } else {
//       return <LoginPage authorize={this.checkCredentials} />;
//     }
//   }

//   checkCredentials() {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     fetch('http://localhost:8080/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password }),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         if (data.Success === 'Worker') {
//           let emp_id = data.emp_id;
//           let first_name = data.first_name;
//           this.setState({
//             isLoggedIn: true,
//             role: 'worker',
//             emp_id,
//             first_name,
//           });
//         } else if (data.Success === 'Manager') {
//           let emp_id = data.emp_id;
//           let first_name = data.first_name;
//           this.setState({
//             isLoggedIn: true,
//             role: 'manager',
//             emp_id,
//             first_name,
//           });
//         } else if (data.error) {
//           alert('your username/password is incorrect');
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   logOut() {
//     console.log('in log out')
//     this.setState({isLoggedIn: false});
//   }

// }

export default App;

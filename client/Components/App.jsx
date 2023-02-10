import React, { useState } from 'react';
import LoginPage from './LoginPage.jsx';
import EmployeePage from './EmployeePage.jsx';
import ManagerPage from './ManagerPage.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [empId, setEmpId] = useState(0);
  const [firstName, setFirstName] = useState('');

  // check if username password exists
  const checkCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
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

  if (isLoggedIn && role === 'worker' && empId > 0) {
    return <EmployeePage firstName={firstName} empId={empId} logOut={logOut} />;
  } else if (isLoggedIn && role === 'manager') {
    return <ManagerPage logOut={logOut} />;
  } else {
    return <LoginPage authorize={checkCredentials} />;
  }
};

export default App;

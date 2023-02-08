import React, { useState, useEffect } from 'react';

const EmployeeRow = () => {
  const [employees, setEmployees] = useState([]);
  //i want to send a fetch request to retrieve the information
  // from the backend to fill in the row dynamically
  //not sure if the addres is correct from where we're making the fetch request to
  // {
  //   method: 'GET',
  //   headers: {'Content-Type': 'application/json'}, //not sure this is the right type
  //   mode: 'cors',
  //   body: JSON.stringify({employee, employeeID, hoursWorked}), //I don't know the names of the properties we want, but we want employee name, ID, and hours Worked
  //   }
  useEffect(() => {
    fetch('/emphours/users')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data', data)
        setEmployees(data[0]);
      })
      .catch((error) => {
        console.log('There is an error in the EmployeeRow get request ', error);
      });
  }, []);
  console.log(employees[0]);
  return (
    <div className='justify-self-center'>
      <table className='table table-borderd text-center justify-self-centered'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee id</th>
            <th>Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr>
              <td>
                {employee.first_name} {employee.last_name}
              </td>
              <td> {employee.emp_id}</td>
              <td>{employee.hours_worked}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div id='nameContainer'></div>
        <div id='hoursContainer'></div>
        <div id='employeeIdContainer'></div> */}
    </div>
  );
};

export default EmployeeRow;

import React, { useState, useEffect } from 'react';

const EmployeeRow = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/emphours/users')
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

  console.log('Employee in a Row', employees[0]);

  return (
    <div className='justify-self-center'>
      <table className='table table-border text-center justify-self-centered'>
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
    </div>
  );
};

export default EmployeeRow;

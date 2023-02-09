import React, { Fragment } from 'react';
import ManagerPage from './ManagerPage';
import EmployeePage from './EmployeePage';

const RoleBased = ({ role }) => {
  console.log(role);
  return (
    <Fragment>
      {role === 'manager' && <ManagerPage />}
      {role === 'worker' && <EmployeePage />}
    </Fragment>
  );
};

export default RoleBased;

import React from 'react';
import EmployeeRow from './EmployeeRow.jsx';
import LogOutButton from './LogOutButton.jsx';

const ManagerPage = (props) => {
  return (
    <section id='managerPageOuterBox'>
      <div id='managerTimeMate'>TimeMate</div>
      <EmployeeRow />
      <section id='managerLogOut'>
        <LogOutButton logOut={props.logOut} />
      </section>
    </section>
  );
};

export default ManagerPage;

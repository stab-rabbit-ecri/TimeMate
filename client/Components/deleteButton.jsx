import React, { useState } from 'react';

//this should have an input box that will take in an employee ID
//and when the functionality is added, will delete the inputted employee
//from the database

const DeleteButton = function App() {
  const [updated, setUpdated] = useState('');
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setUpdated(event.target.value);
    }
  };

  //need to handle the delete Request to the server

  return (
    <div>
      <input
        type='text'
        id='message'
        name='message'
        placeholder='Enter Employee ID to Delete'
        onKeyDown={handleKeyDown}
      />
      <h2>Employee ID {updated} has been deleted</h2>
    </div>
  );
};

export default DeleteButton;

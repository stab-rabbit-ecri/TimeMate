import React, { useState, useEffect } from 'react';
import ClockIn from './ClockIn.jsx';
import ClockOut from './ClockOut.jsx';
import LogOutButton from './LogOutButton.jsx';

const EmployeePage = (props) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentAction, setCurrentAction] = useState('');
  const [message, setMessage] = useState('');
  const [entryId, setEntryId] = useState(0);
  const [totalHours, setTotalHours] = useState('');
  const [date, setDate] = useState('');

  // on page load, fetch total hours worked as of login time
  useEffect(() => {
    console.log('EMP_ID IN EMP PAGE', props.empId);
    fetch('http://localhost:3000/currentemphours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ emp_id: props.empId }),
    })
      .then((response) => {
        console.log('Current Emp Hours Response:', response);
        return response.json();
      })
      .then((data) => {
        // data is an object with a key/val pair of total/string val
        setTotalHours(data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // set currentTime and date whenever currentAction changes
  useEffect(() => {
    const currDate = new Date();

    const hours =
      currDate.getHours() > 12 ? currDate.getHours() - 12 : currDate.getHours();

    const seconds =
      currDate.getSeconds() < 10
        ? '0' + currDate.getSeconds()
        : currDate.getSeconds();

    const minutes =
      currDate.getMinutes() < 10
        ? '0' + currDate.getMinutes()
        : currDate.getMinutes();

    const time = `${hours}:${minutes}:${seconds}`;

    setCurrentTime(time);
    setDate(currDate);

    console.log('Time of clock in/clock out', currentTime);
    console.log('Date of clock in/clock out', date);
  }, [currentAction]);

  // on button click, update current action
  const toggleClockIn = (e) => {
    if (e.target.id === 'clockInButton') {
      setCurrentAction('clocked in');

      console.log('time from setCurrentTime()', currentTime);
      console.log('date from setDate()', date);

      if (currentAction === 'clocked in') {
        setMessage('You already clocked in!');
      } else {
        console.log('currentAction after clicking clock in', currentAction);
        setMessage(`You clocked in at ${currentTime}`);
      }
    } else {
      setCurrentAction('clocked out');
      if (currentAction === 'clocked out') {
        setMessage('You already clocked out');
      } else {
        setMessage(`You clocked out at ${currentTime}`);
      }
    }
    // revealClockProof('block');
    // setTimeout(revealClockProof, 2000);
  };

  // const revealClockProof = (display = 'none') => {
  //   const clockProof = document.getElementById('clockProof');

  //   clockProof.style.display = display;

  //   return;
  // };

  useEffect(() => {
    clockInOut();
  }, [currentTime]);

  const clockInOut = () => {
    // August 19, 1975 23:15:30
    // { time: '11:31:06', date: '2023-02-06T16:31:06.474Z', emp_id: 9 }
    console.log('CurrentAction in clockInOut', currentAction);
    if (currentAction === 'clocked in') {
      console.log('Sending fetch request');
      fetch('http://localhost:3000/clockin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time: currentTime,
          date: date,
          emp_id: props.empId,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((uniqueId) => {
          console.log('Data from ClockIn Response:', uniqueId);
          setEntryId(uniqueId);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (currentAction === 'clocked out') {
      console.log('Entry Id', entryId);
      fetch('http://localhost:3000/clockout', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time: currentTime,
          date: date,
          entry_id: entryId,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section id='employeePageBox'>
      <h2 id='welcomeMessage'>Hello, {props.firstName}</h2>
      <h3 id='hoursWorked'>You've worked {totalHours} hours this week</h3>
      <section id='clockProofContainer'>
        <h4 id='clockProof'>{props.currentMessage}</h4>
      </section>
      <section id='timeButtonParent'>
        <ClockIn toggleClockIn={toggleClockIn} />
        <ClockOut toggleClockIn={toggleClockIn} />
      </section>
      <section>
        <LogOutButton logOut={props.logOut} />
      </section>
    </section>
  );
};

export default EmployeePage;

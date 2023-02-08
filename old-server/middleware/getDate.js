const db = require('../db');

const getDate = (req, res, next) => {
  const { date, emp_id, time } = req.body;

  // const test = new Date(date);

  // if currentDate is an object, comment out below line
  // currentDate.toString();

  // const currentTime = date.split(' ')[4];

  const dateStr = date.split('T')[0];

  const dateArr = dateStr.split('-');

  console.log(dateArr);

  const numDate = new Date(
    Number(dateArr[0]),
    Number(dateArr[1]) - 1,
    Number(dateArr[2])
  );

  // console.log(currentTime);

  const weekNumber = numDate.getWeek();

  res.locals.timestamp = date;
  res.locals.emp_id = emp_id;
  res.locals.week = weekNumber;

  // console.log('weekNumber', weekNumber);

  // res.locals.time = time;

  // res.locals.emp_id = emp_id;

  // res.locals.week = date.getWeek();

  // console.log(res.locals.week);

  return next();
};

//
Date.prototype.getWeek = function (dowOffset) {
  /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

  dowOffset = typeof dowOffset == 'number' ? dowOffset : 0; //default dowOffset to zero
  var newYear = new Date(this.getFullYear(), 0, 1);
  var day = newYear.getDay() - dowOffset; //the day of week the year begins on
  day = day >= 0 ? day : day + 7;
  var daynum =
    Math.floor(
      (this.getTime() -
        newYear.getTime() -
        (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
        86400000
    ) + 1;
  var weeknum;
  //if the year starts before the middle of a week
  if (day < 4) {
    weeknum = Math.floor((daynum + day - 1) / 7) + 1;
    if (weeknum > 52) {
      nYear = new Date(this.getFullYear() + 1, 0, 1);
      nday = nYear.getDay() - dowOffset;
      nday = nday >= 0 ? nday : nday + 7;
      /*if the next year starts before the middle of
                the week, it is week #1 of that year*/
      weeknum = nday < 4 ? 1 : 53;
    }
  } else {
    weeknum = Math.floor((daynum + day - 1) / 7);
  }
  return weeknum;
};

// Tues Feb 04 2023 15:42:43 GMT-0800 (Pacific Standard Time)
// 0     1   2  3

module.exports = getDate;

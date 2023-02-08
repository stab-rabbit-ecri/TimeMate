const db = require('../db');

const Employees = db.employees;
const Timesheet = db.timesheet;

const clockIn = async (req, res, next) => {
  // const { emp_id } = req.body;

  const clockInData = {
    emp_id: res.locals.emp_id,
    clock_in: res.locals.timestamp,
    week: res.locals.week,
  };

  try {
    const entry = await Timesheet.create(clockInData);

    res.locals.entry_id = entry.dataValues.entry_id;

    console.log(entry);
    if (!entry) {
      throw new Error();
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

const clockOut = async (req, res, next) => {
  console.log('REQ.BODY: ', req.body);
  const entry_id = req.body.entry_id;
  //   const clockOutData = {
  //     emp_id,
  //     clock_out, //// <-----
  //     entry_id,
  //   };

  /// entry id  clcok in clockout employeeid day week
  //  1         8:00 am   null    2          1 3

  // 1     8           5        2 1  3

  const clockIn = await Timesheet.findOne({
    where: {
      entry_id: entry_id,
    },
  });

  const timeIn = new Date(clockIn.dataValues.clock_in);

  const timeOut = new Date(res.locals.timestamp);

  function timeDifference(date1, date2) {
    let diff = (date2.getTime() - date1.getTime()) / 1000;
    diff /= 3600;
    return Math.abs(Math.round(diff));
  }

  const hours = timeDifference(timeIn, timeOut);

  try {
    const entry = await Timesheet.update(
      { clock_out: timeOut, hours },
      {
        where: {
          entry_id: entry_id,
        },
      }
    );

    if (!entry) {
      throw new Error();
    }

    console.log(entry);
    res.locals.entry = entry;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  clockIn: clockIn,
  clockOut: clockOut,
};

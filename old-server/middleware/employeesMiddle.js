const { sequelize } = require('../db');
const db = require('../db');
const employees = db.employees;
const timesheet = db.timesheet;


const getAll = (req, res, next) => {
  sequelize.query('SELECT  ts.emp_id, ae.first_name, ae.last_name, SUM(hours) as hours_worked FROM timesheets as ts INNER JOIN all_employees AS ae ON ts.emp_id=ae.emp_id GROUP BY ae.first_name, ts.emp_id, ae.last_name; ')
    .then((response) => { 
     
     res.locals.employees = response;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
};

const employeesMiddle = {
  getAll: getAll,
};
module.exports = employeesMiddle;

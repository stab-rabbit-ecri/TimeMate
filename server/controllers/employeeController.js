const db = require('../models/timeMateModels.js');

const employeeController = {};

//select employee_type from all_employees where username='workermcgee' and password='worker'
//to login
    //query all_employees table for a username and password matching the ones 
    //if successful, return {Success: Worker}/{Success:Manager, first_name: }
    //if unsuccessful, return {error: 'failed login attempt'}

employeeController.authorize = (req, res, next) => {
    // get variables from req.body
    const {username, password} = req.body;
    // define query text
    const queryText = 'SELECT employee_type, first_name, emp_id FROM all_employees WHERE username=($1) AND password=($2);';
    const values = [username, password];
    // query DB to find password with given username
    db.query(queryText, values)
    // .then either return success or return error
    .then((response) => {
        console.log(response);
        if (response.rows.length) {
          res.locals.user = response.rows[0]
          res.locals.user.Success = response.rows[0].employee_type
          console.log(res.locals.user);
          return next()
        } else {
        // frontend will check if response.rows is empty
          res.locals.user = {error: 'failed login attempt'};
          return next();
        }
    })
    // .catch return error
    .catch((err) => {
        return next({
            message: 'err in employee controller authorize',
        })
    })
}

module.exports = employeeController;
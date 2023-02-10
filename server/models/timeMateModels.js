const { Pool } = require('pg');
require('dotenv').config();

const PG_URI =
  'postgres://xhzhlbps:Ig9T0rkFMT0B_POV-5mlEIAu2Klj93Yc@batyr.db.elephantsql.com/xhzhlbps';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// TABLE: all_employees
// primary key: emp_id (serial, not null)
// first_name (varChar)
// last_name (varChar)
// employee_type (varChar)
// username (varChar)
// password (varChar)

// TABLE: timesheet
// primary key: entry_id (serial, not null)
// clock_in (date)
// clock_out (date)
// hours (int)
// week (int)
// day (int)
// emp_id (foreign key, references emp_id in table all_employees)

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

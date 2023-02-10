const db = require('../server/models/timeMateModels.js');

describe('database connection tests', () => {
  test('connects to all_employees database', (done) => {
    const queryText = 'SELECT * FROM all_employees';
    db.query(queryText)
      .then((response) => {
        return response.rows[0];
      })
      .then((result) => {
        expect(result).not.toBeUndefined();
        expect(result).toHaveProperty('emp_id');
        expect(result).toHaveProperty('first_name');
        expect(result).toHaveProperty('last_name');
        expect(result).toHaveProperty('employee_type');
        expect(result).toHaveProperty('username');
        expect(result).toHaveProperty('password');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test('connects to timesheet database', (done) => {
    const queryText = 'SELECT * FROM timesheet';
    db.query(queryText)
      .then((response) => {
        return response.rows[0];
      })
      .then((result) => {
        expect(result).not.toBeUndefined();
        expect(result).toHaveProperty('entry_id');
        expect(result).toHaveProperty('clock_in');
        expect(result).toHaveProperty('clock_out');
        expect(result).toHaveProperty('hours');
        expect(result).toHaveProperty('week');
        expect(result).toHaveProperty('day');
        expect(result).toHaveProperty('emp_id');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

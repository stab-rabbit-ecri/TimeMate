const employeeController = require('../../server/controllers/employeeController.js');
const db = require('../../server/models/timeMateModels.js');


// test database functions:
// login saved in server/controllers/employeeController.js

// before each
// after all, delete entries where employee_type = test

describe ('database unit tests', () => {
    afterAll((done) => {
        queryText = 'DELETE FROM all_employees WHERE employee_type = test'
        db.query(queryText)
        .then(
            done()
        )
    })
    describe ('database connection test', () => {
        test('connects to all_employees database', () => {
            queryText = 'SELECT * FROM all_employees'
            db.query(queryText)
            .then(
                (response) => {
                    result = response.rows[0]
                }
            )
            .then((result) => {
                expect(result).not.toBeUndefined();
                expect(result).toHaveProperty('emp_id');
                expect(result).toHaveProperty('first_name');
                expect(result).toHaveProperty('last_name');
                expect(result).toHaveProperty('employee_type');
                expect(result).toHaveProperty('username');
                expect(result).toHaveProperty('password');}
                )
        })
        test('connects to timesheet database', () => {
            queryText = 'SELECT * FROM timesheet'
            db.query(queryText)
            .then(
                (response) => {
                    result = response.rows[0]
                }
            )
            .then((result) => {
                expect(result).not.toBeUndefined();
                expect(result).toHaveProperty('entry_id');
                expect(result).toHaveProperty('clock_in');
                expect(result).toHaveProperty('clock_out');
                expect(result).toHaveProperty('hours');
                expect(result).toHaveProperty('week');
                expect(result).toHaveProperty('day');
                expect(result).toHaveProperty('emp_id');
            })
        })
    })
    describe ('login middleware tests', () => {

    })
})
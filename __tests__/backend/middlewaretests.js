const ec = require('../../server/controllers/employeeController.js');
const db = require('../../server/models/timeMateModels.js');

describe('login middleware tests', () => {
  // before testing, create users to log in
  beforeAll((done) => {
    queryText =
      "INSERT INTO all_employees (first_name, username, password, employee_type) VALUES ('jesttest', 'jesttestworker', 'password', 'worker'), ('jesttest', 'jesttestmanager', 'password', 'manager');";
    db.query(queryText)
      .then(() => done())
      .catch((err) => done(err));
  });

  // after testing, delete created users
  afterAll((done) => {
    queryText = "DELETE FROM all_employees WHERE first_name = 'jesttest'";
    db.query(queryText)
      .then((response) => done())
      .catch((err) => done(err));
  });

  let mockReq;
  let mockRes;

  // before each, create mock req, res, next
  beforeEach(() => {
    mockReq = {
      body: {
        username: '',
        password: 'password',
      },
    };
    mockRes = {};
  });

  test('logs in valid worker', (done) => {
    mockReq.body.username = 'jesttestworker';
    ec.authorize(mockReq, mockRes, (err) => {
      console.log('err: ', err);
      console.log('mockRes: ', mockRes);
      expect(mockRes.locals.user.Success).toBe('worker');
      expect(mockRes.locals.user.first_name).toBe('jesttest');
      expect(mockRes.locals.user.username).toBe('jesttestworker');
      expect(mockRes.locals.user.password).toBe('password');
      expect(mockRes.locals.user.employee_type).toBe('worker');
    });
  });
  //   test('logs in valid manager');
  //   test('does not log in invalid user');
});

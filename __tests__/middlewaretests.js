const ec = require('../server/controllers/employeeController.js');
const db = require('../server/models/timeMateModels.js');

describe('employeeController.authorize middleware tests', () => {
  // before testing, create users to log in
  beforeAll((done) => {
    const queryText =
      "INSERT INTO all_employees (first_name, username, password, employee_type) VALUES ('jesttest', 'jesttestworker', 'password', 'Worker'), ('jesttest', 'jesttestmanager', 'password', 'Manager');";
    db.query(queryText)
      .then(() => done())
      .catch((err) => done(err));
  });

  // after testing, delete created users
  afterAll((done) => {
    const queryText = "DELETE FROM all_employees WHERE first_name = 'jesttest'";
    db.query(queryText)
      .then((response) => done())
      .catch((err) => done(err));
  });

  let mockReq;
  let mockRes;

  // before each test, create mock req and res objects
  beforeEach(() => {
    mockReq = {
      body: {
        username: '',
        password: 'password',
      },
    };
    mockRes = { locals: {} };
  });

  test('logs in valid worker', (done) => {
    mockReq.body.username = 'jesttestworker';
    ec.authorize(mockReq, mockRes, () => {
      expect(mockRes.locals.user.Success).toBe('Worker');
      expect(mockRes.locals.user.first_name).toBe('jesttest');
      expect(mockRes.locals.user.employee_type).toBe('Worker');
      done();
    });
  });
  test('logs in valid manager', (done) => {
    mockReq.body.username = 'jesttestmanager';
    ec.authorize(mockReq, mockRes, () => {
      expect(mockRes.locals.user.Success).toBe('Manager');
      expect(mockRes.locals.user.first_name).toBe('jesttest');
      expect(mockRes.locals.user.employee_type).toBe('Manager');
      done();
    });
  });
  test('does not log in invalid user', (done) => {
    mockReq.body.username = 'jesttestinvalid';
    ec.authorize(mockReq, mockRes, () => {
      expect(mockRes.locals.user).toHaveProperty('error');
      done();
    });
  });
  test('does not log in valid user with invalid password', (done) => {
    mockReq.body.username = 'jesttestworker';
    mockReq.body.password = 'invalidpassword';
    ec.authorize(mockReq, mockRes, () => {
      expect(mockRes.locals.user).toHaveProperty('error');
      done();
    });
  });
  test('does not log in user with blank credentials', (done) => {
    mockReq.body.username = '';
    mockReq.body.password = '';
    ec.authorize(mockReq, mockRes, () => {
      expect(mockRes.locals.user).toHaveProperty('error');
      done();
    });
  });
});

describe('employeeController.getDate middleware tests', () => {
  test('saves date, employee id, and week to res.locals', (done) => {
    const date = new Date();
    const mockReq = {
      body: {
        date: date.toISOString(),
        emp_id: 0,
      },
    };
    const mockRes = { locals: {} };
    ec.getDate(mockReq, mockRes, () => {
      expect(mockRes.locals.timestamp).toBe(date.toISOString());
      expect(mockRes.locals.emp_id).toBe(0);
      expect(typeof mockRes.locals.week).toBe('number');
      done();
    });
  });
});

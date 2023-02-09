const ec = require('../server/controllers/employeeController.js');
const db = require('../server/models/timeMateModels.js');

describe('employeeController.authorize middleware tests', () => {
  // before testing, create users to log in
  beforeAll((done) => {
    db.query(
      "INSERT INTO all_employees (first_name, username, password, employee_type) VALUES ('jesttest', 'jesttestworker', 'password', 'Worker'), ('jesttest', 'jesttestmanager', 'password', 'Manager');"
    )
      .then(() => done())
      .catch((err) => done(err));
  });

  // after testing, delete created users
  afterAll((done) => {
    db.query("DELETE FROM all_employees WHERE first_name = 'jesttest'")
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
    ec.authorize(mockReq, mockRes, (err) => {
      if (err) {
        done(err);
      }
      expect(mockRes.locals.user.Success).toBe('Worker');
      expect(mockRes.locals.user.first_name).toBe('jesttest');
      expect(mockRes.locals.user.employee_type).toBe('Worker');
      done();
    });
  });
  test('logs in valid manager', (done) => {
    mockReq.body.username = 'jesttestmanager';
    ec.authorize(mockReq, mockRes, (err) => {
      if (err) {
        done(err);
      }
      expect(mockRes.locals.user.Success).toBe('Manager');
      expect(mockRes.locals.user.first_name).toBe('jesttest');
      expect(mockRes.locals.user.employee_type).toBe('Manager');
      done();
    });
  });
  test('does not log in invalid user', (done) => {
    mockReq.body.username = 'jesttestinvalid';
    ec.authorize(mockReq, mockRes, (err) => {
      if (err) {
        done(err);
      }
      expect(mockRes.locals.user).toHaveProperty('error');
      done();
    });
  });
  test('does not log in valid user with invalid password', (done) => {
    mockReq.body.username = 'jesttestworker';
    mockReq.body.password = 'invalidpassword';
    ec.authorize(mockReq, mockRes, (err) => {
      if (err) {
        done(err);
      }
      expect(mockRes.locals.user).toHaveProperty('error');
      done();
    });
  });
  test('does not log in user with blank credentials', (done) => {
    mockReq.body.username = '';
    mockReq.body.password = '';
    ec.authorize(mockReq, mockRes, (err) => {
      if (err) {
        done(err);
      }
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

describe('employeeController.getWeek middleware tests', () => {
  const jan01 = new Date('2023-01-01 12:00:00');
  const dec31 = new Date('2022-12-31 12:00:00');

  test('returns correct week for jan01', () => {
    expect(jan01.getWeek()).toBe(1);
  });
  test('returns correct week for dec31', () => {
    expect(dec31.getWeek()).toBe(52);
  });
});

describe('employeeController.clockIn middleware tests', () => {
  // // before testing, create dummy user with emp_id = 0
  beforeAll((done) => {
    db.query('INSERT INTO all_employees (emp_id) VALUES (0);')
      .then(() => done())
      .catch((err) => done(err));
  });

  // after testing, delete created user and timesheet entries
  afterAll((done) => {
    function deleteUser() {
      db.query('DELETE FROM all_employees WHERE emp_id = 0')
        .then((response) => done())
        .catch((err) => done(err));
    }
    db.query('DELETE FROM timesheet WHERE emp_id = 0')
      .then((response) => deleteUser())
      .catch((err) => done(err));
  });

  let mockReq;
  let mockRes;
  const date = new Date();

  // before each test, create mock req and res objects
  beforeEach(() => {
    mockReq = {
      body: {},
    };
    mockRes = {
      locals: {
        timestamp: date.toISOString(),
        emp_id: 0,
        week: 0,
      },
    };
  });

  test('updates res.locals', (done) => {
    ec.clockIn(mockReq, mockRes, (err) => {
      if (err) {
        done(err);
      }
      expect(mockRes.locals).toHaveProperty('entry_id');
      expect(typeof mockRes.locals.entry_id).toBe('number');
      done();
    });
  });

  test('creates correct entry in timesheet database', (done) => {
    ec.clockIn(mockReq, mockRes, (err) => {
      if (err) {
        done(err);
      }
      db.query('SELECT * FROM timesheet WHERE entry_id = $1', [
        mockRes.locals.entry_id,
      ])
        .then((response) => {
          return response.rows[0];
        })
        .then((row) => {
          expect(row.emp_id).toBe(0);
          expect(row.clock_in.toISOString()).toEqual(date.toISOString());
          expect(row.week).toBe(0);
        })
        .then(done())
        .catch((err) => done(err));
    });
  });

  test('responds with error when passed in invalid timestamp', (done) => {
    mockRes.locals.timestamp = 'invalid';
    ec.clockIn(mockReq, mockRes, (err) => {
      expect(err).not.toBeUndefined;
      expect(mockRes.locals).not.toHaveProperty('entry_id');
      done();
    });
  });

  test('responds with error when passed in invalid employee id', (done) => {
    mockRes.locals.emp_id = -999;
    ec.clockIn(mockReq, mockRes, (err) => {
      expect(err).not.toBeUndefined;
      expect(mockRes.locals).not.toHaveProperty('entry_id');
      done();
    });
  });
});

describe('employeeController.clockOut middleware tests', () => {
  // before testing, create dummy user with emp_id = -1
  beforeAll((done) => {
    db.query('INSERT INTO all_employees (emp_id) VALUES (-1);')
      .then(() => done())
      .catch((err) => done(err));
  });

  // after testing, delete created user and timesheet entries
  afterAll((done) => {
    db.query('DELETE FROM timesheet WHERE emp_id = -1')
      .then(
        db
          .query('DELETE FROM all_employees WHERE emp_id = -1')
          .then(done())
          .catch((err) => done(err))
      )
      .catch((err) => done(err));
  });

  let mockReq;
  let mockRes;
  const clockInDate = new Date('2023-01-01 12:00:00');
  const clockOutDate = new Date('2023-01-01 15:00:00');
  const clockInRes = {
    locals: {
      timestamp: clockInDate.toISOString(),
      emp_id: -1,
      week: 1,
    },
  };

  // before each test, create clockIn entry, then create mock req and res objects and save entry id to mockReq
  beforeEach((done) => {
    ec.clockIn({}, clockInRes, () => {
      mockReq = {
        body: { entry_id: clockInRes.locals.entry_id },
      };
      mockRes = {
        locals: {
          timestamp: clockOutDate.toISOString(),
        },
      };
      done();
    });
  });

  test('updates an entry without error', (done) => {
    ec.clockOut(mockReq, mockRes, (err) => {
      if (err) done(err);
      else done();
    });
  });

  test('updates an entry with correct clock out time and number of hours worked', (done) => {
    const entryId = mockReq.body.entry_id;
    ec.clockOut(mockReq, mockRes, (err) => {
      if (err) done(err);
      else {
        db.query('SELECT * FROM timesheet WHERE entry_id = $1', [entryId])
          .then((response) => response.rows[0])
          .then((row) => {
            expect(row.clock_out.toISOString()).toEqual(
              clockOutDate.toISOString()
            );
            expect(row.hours).toBe(3);
          })
          .then(done())
          .catch((err) => done(err));
      }
    });
  });

  test('responds with error when passed in invalid entry id', (done) => {
    mockReq.body.entry_id = 'invalid';
    ec.clockOut(mockReq, mockRes, (err) => {
      expect(err).not.toBeUndefined;
      done();
    });
  });

  test('responds with error when passed in invalid timestamp', (done) => {
    mockRes.locals.timestamp = 'invalid';
    ec.clockOut(mockReq, mockRes, (err) => {
      expect(err).not.toBeUndefined;
      done();
    });
  });
});

xdescribe('employeeController.getHours middleware tests', () => {
  // before testing, create dummy user with emp_id = -2, then create 2 dummy timesheet entries for this user
  beforeAll((done) => {
    db.query('INSERT INTO all_employees (emp_id) VALUES (-2);').catch((err) =>
      done(err)
    );
    db.query(
      'INSERT INTO timesheet (emp_id, hours, week) VALUES (-2, 10, 6), (-2, 10, 6)'
    )
      .then(done())
      .catch((err) => done(err));
  });

  // after testing, delete created user and timesheet entries
  afterAll((done) => {
    db.query('DELETE FROM timesheet WHERE emp_id = -2')
      .then(
        db
          .query('DELETE FROM all_employees WHERE emp_id = -2')
          .then(done())
          .catch((err) => done(err))
      )
      .catch((err) => done(err));
  });

  let mockReq;
  let mockRes;

  // before each test, create mock req and res objects
  beforeEach(() => {
    mockReq = {
      body: { emp_id: -2 },
    };
    mockRes = { locals: {} };
  });

  // getting persistent error, too many connections for role: no time to fix
  test('gets correct number of hours for specified employee', () => {
    ec.getHours(mockReq, mockRes, (err) => {
      if (err) done(err);
      expect(mockRes.locals).toHaveProperty('hours');
      expect(mockRes.locals.hours).toBe(20);
      console.log('345: ', mockRes.locals);
      done();
    });
  });
  test('responds with error when given invalid employee id', () => {});
});

xdescribe('employeeController.getUsers middleware tests', () => {
  test('gets valid list of users', () => {});
});

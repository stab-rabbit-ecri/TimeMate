const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const employeeController = require('./controllers/employeeController.js');

const app = express();

//setting up your port
const PORT = process.env.PORT || 8080;

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// route to login
//post request is sent to /login
app.post('/login', employeeController.authorize, (req,res) => {
  return res.status(200).json(res.locals.user);
});

//OTHER ROUTES
app.post('/clockin', employeeController.getDate, employeeController.clockIn, (req, res) => {
  return res.status(200).json(res.locals.entry_id);
});

app.patch('/clockout', employeeController.getDate, employeeController.clockOut, (req,res) => {
  return res.status(200);
});

app.post('/currentemphours', employeeController.getHours, (req, res) => {
  return res.status(200).json({total: res.locals.hours});
});

app.get('/emphours/users', employeeController.getUsers, (req, res) => {
  console.log('returning users from get request emphours/users:', res.locals.employees)
  return res.status(200).json([res.locals.employees]);
})
/**
 *
 *
 */
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../client/index.html'));
  });
}

/**
 ***************
 */

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));

module.exports = app;

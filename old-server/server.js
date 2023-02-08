const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db.js');
const cookieParser = require('cookie-parser');;

const app = express();

//setting up your port
const PORT = process.env.PORT || 8080;

// const loginRouter = require('./routes/login');
const createRouter = require('./routes/create.js');
const clockinRouter = require('./routes/clockin');
const clockOutRouter = require('./routes/clockout');
const empHoursRouter = require('./routes/empHours');
const allEmployeeRouter = require('./routes/allemployees');
const getCurrentHours = require('./controllers/currentEmpHoursController.js')

//synchronizing the database and forcing it to false so we dont lose data
// db.sequelize.sync().then(() => {
//   console.log('db has been re sync');
// });
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/create', createRouter);
app.use('/', loginRouter);
app.use('/clockin', clockinRouter);
app.use('/clockout', clockOutRouter);
app.use('/emphours', empHoursRouter);

app.post('/currentemphours', getCurrentHours, (req, res) => {
  console.log(res.locals.totals);
  res.status(200).json(res.locals.totals)
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

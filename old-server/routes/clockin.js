const express = require('express');
const { clockIn } = require('../controllers/timesheetControllers.js');
const getDate = require('../middleware/getDate.js');

const router = express.Router();

// when a post request is sent to /clockin,
// router.post('/clockin', );

router.post(
  '/',
  getDate,
  clockIn,
  /* getDate, clockIn, */ (req, res) => {
    console.log(req.body);
    res.status(200).json(res.locals.entry_id);
  }
);

module.exports = router;

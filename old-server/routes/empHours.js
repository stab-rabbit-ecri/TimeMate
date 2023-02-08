const express = require('express');
const { timesheet } = require('../db');
const getDate = require('../middleware/getDate');
const employeesMiddle = require('../middleware/employeesMiddle.js');
const currentEmpHoursController = require('../controllers/currentEmpHoursController.js')

const router = express.Router();

router.get('/', getDate, (req, res) => {});

router.get('/users', employeesMiddle.getAll, (req, res) => {
  res.status(200).json(res.locals.employees);
});
module.exports = router;

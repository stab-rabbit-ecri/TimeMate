const express = require('express');
const employeeController = require('../controllers/employees.controller');
const { createUser } = employeeController;
const userAuth = require('../middleware/userAuth');
const { repeatUserCheck } = userAuth;
const router = express.Router();

// when a post request is sent to /create, first check that username is not already in use, then create user
router.post('/create', repeatUserCheck, createUser, (req, res) => {
  res.status(200).json("you created!");
});;

module.exports = router;

const express = require('express');
const employeeController = require('../controllers/employees.controller');
const { login } = employeeController;
const router = express.Router();

// when a post request is sent to /login, authenticate login credentials
// router.post('/login', login);

module.exports = router;
``
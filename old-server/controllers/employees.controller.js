//importing modules
const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');
const config = require('../secretKey.js');
// Assigning users to the variable User
const Employees = db.employees;
const Logins = db.logins;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const createUser = async (req, res, next) => {
  try {
    console.log("i am creating an user")
    const { first_name, last_name, emp_role, username, password } = req.body;
    const employeeData = {
      first_name,
      last_name,
      emp_role,
    };

    //saving the user
    const user = await Employees.create(employeeData);
    const userId = user.dataValues.emp_id;
    // const userId = await Employees.findOne({
    //   where :  =

    const loginData = {
      username,
      password: await bcrypt.hash(password, 10),
      user_id: userId,
    };

    const userLogin = await Logins.create(loginData);

    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (userLogin) {
      let token = jwt.sign({ id: userLogin.login_id }, config.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log('the user was succesfully created');
      //send users details

      return;
    } else {
      return res.status(409).send('Details are not correct');
    }
  } catch (error) {
    console.log(error);
  }
};

//login authentication

const login = async (req, res, next) => {
  try {
    // grab username & pw from request body
    const { username, password } = req.body;
    
    // query db with username
    const user = await Logins.findOne({
      where: {
        username: username,
      },
    });

   
   
    // if no matching username in db return 401
    if (user === null) {
      console.log('incorrect username');
      return res.status(401).send({ error: 'Wrong login credentials' });
    }
    
    // once valid username has been found grab emp associated with login
    const userRole = await Employees.findOne({
      where: {
        emp_id: user.dataValues.user_id,
      },
    });
    console.log(user.dataValues.username, "just logged in ");
    
    //compare with hashed pw in db
    const isSame = await bcrypt.compare(password, user.password);

    // if hash pw does not match return 401
    if (!isSame) {
      console.log('incorrect password');
      return res.status(401).send({ error: 'Wrong login credentials' });
    }

    // create token using jwt
    let token = jwt.sign({ id: user.id }, config.secretKey, {
      expiresIn: 1 * 24 * 60 * 60 * 1000,
    });

    // attach jwt token to res cookie
    res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

    // grab employee role from authorized user
    const userType = userRole.dataValues.emp_role;

    // user trying to login is a manager
    if (userType === 1) {
      res.status(201).json({
        Success: 'Manager',
        emp_id: userRole.dataValues.emp_id,
        first_name: userRole.dataValues.first_name,
      });
    } else {
      // user must be an employee
      res.status(201).json({
        Success: 'Worker',
        emp_id: userRole.dataValues.emp_id,
        first_name: userRole.dataValues.first_name,
      });
    }
  } catch (e) {
    console.log(e)
    return next({
      log: 'This is an error in userController',
      message: {
        err: `${e}`,
      },
    });
  }
};

module.exports = {
  createUser,
  login,
};

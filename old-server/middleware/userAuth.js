//importing modules
const express = require('express');
const db = require('../db.js');
//Assigning db.users to User variable
const Logins = db.logins;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const repeatUserCheck = async (req, res, next) => {
  //search the database to see if user exist
  try {
    //checking if username already exists
    const usernameExists = await Logins.findOne({
      where: {
        username: req.body.username,
      },
    });
    //if email exist in the database respond with a status of 409
    if (usernameExists) {
      return res.status(409).json('Username already in use.');
    }

    return next();
  } catch (error) {
    console.log(error);
  }
};

//exporting module
module.exports = {
  repeatUserCheck,
};

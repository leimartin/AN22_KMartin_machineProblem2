// CCS0043L - Finals Source Code for 3T AY 2022-2023
/*
    Program:    E-commerce API MVP requirements
    Programmer: Katryna Lei V. Martin
    Section:    AN22
    Start Date: July 16, 2023
    End Date:   July 17, 2023
*/

const express = require('express');
const route = express.Router();
const authController = require('../controllers/authController');

// User registration
route.post('/register', authController.registerUser);

// User login
route.post('/login', authController.loginUser);

module.exports = route;
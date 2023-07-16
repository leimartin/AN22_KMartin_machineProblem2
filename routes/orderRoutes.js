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
const orderController = require('../controllers/orderController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authenticationMiddleware');

// Delete Order (Non-admin only)
route.delete('/:orderId', authenticateUser, orderController.deleteOrder);

module.exports = route;

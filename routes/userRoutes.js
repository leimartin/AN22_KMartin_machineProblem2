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
const userController = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authenticationMiddleware');
const { authorizeAdmin } = require('../middlewares/authorizationMiddleware');

// User registration
route.post('/register', userController.registerUser);

// Get All Users
route.get('/', authenticateUser, authorizeAdmin, userController.getAllUsers);

// Get all orders for a user
route.get('/orders', authenticateUser, userController.getUserOrders);

// Create Order (Non-admin only)
route.post('/checkout', authenticateUser, userController.createOrder);

// Update Order Item Quantity
route.put('/:orderId/items/:itemId/quantity', authenticateUser, userController.updateOrderItemQuantity);

// Get User Details
route.get('/:userId/userDetails', authenticateUser, userController.getUserDetails);

// Update User
route.put('/:userId', authenticateUser, userController.updateUser);

// Get authenticated user's orders (Non-admin only)
route.get('/myOrders', authenticateUser, userController.getAuthenticatedUserOrders);

// Set user as admin (Admin only)
route.put('/:userId/setAsAdmin', authenticateUser, authorizeAdmin, userController.setUserAsAdmin);

// Remove a specific order product 
route.delete('/orders/:orderId/items/:itemId', authenticateUser, userController.removeOrderProduct);

module.exports = route;

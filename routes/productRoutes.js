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
const productController = require('../controllers/productController');
const { authenticateUser } = require('../middlewares/authenticationMiddleware');
const { authorizeAdmin } = require('../middlewares/authorizationMiddleware');

// Create Product (Admin only)
route.post('/', authenticateUser, authorizeAdmin, productController.createProduct);

// Retrieve all products
route.get('/', productController.getAllProducts);

// Retrieve all active products
route.get('/active', productController.getActiveProducts);

// Retrieve single product 
route.get('/:productId', productController.getProductById);

// Update Product info (Admin only)
route.put('/:productId', authenticateUser, authorizeAdmin, productController.updateProduct);

// Archive Product (Admin only)
route.put('/:productId/archive', authenticateUser, authorizeAdmin, productController.archiveProduct);

module.exports = route;

// CCS0043L - Finals Source Code for 3T AY 2022-2023
/*
    Program:    E-commerce API MVP requirements
    Programmer: Katryna Lei V. Martin
    Section:    AN22
    Start Date: July 16, 2023
    End Date:   July 17, 2023
*/

const Order = require('../models/Order');
const Product = require('../models/Product');

// Delete Order
const deleteOrder = (req, res) => {
    const { orderId } = req.params;

    Order.findByIdAndDelete(orderId)
    .then((order) => {
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to delete order' });
    });
};

// Calculate Subtotal
const calculateSubtotal = (product) => {
    return product.price * product.quantity;
};

// Calculate Total price
const calculateTotalAmount = (products) => {
    let totalPrice = 0;

    products.forEach((product) => {
        const subtotal = calculateSubtotal(product);
        totalPrice += subtotal;
    });

    return totalPrice;
};

// Retrieve User Details
const getUserDetails = (req, res) => {
    const userId = req.params.userId;

    User.findById(userId)
    .then((user) => {
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        user.password = '';

        res.status(200).json(user);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to retrieve user details' });
    });
};

module.exports = { 
    deleteOrder, 
    calculateSubtotal, 
    calculateTotalAmount, 
    getUserDetails 
};

// CCS0043L - Finals Source Code for 3T AY 2022-2023
/*
    Program:    E-commerce API MVP requirements
    Programmer: Katryna Lei V. Martin
    Section:    AN22
    Start Date: July 16, 2023
    End Date:   July 17, 2023
*/

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    products: [{
        productId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        },
        quantity: {
            type: Number,
        },
        subtotal: {
            type: Number,
        },
    }],
    totalAmount: {
        type: Number,
    },
    purchasedOn: { 
        type: Date, 
        default: Date.now 
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

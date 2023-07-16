// CCS0043L - Finals Source Code for 3T AY 2022-2023
/*
    Program:    E-commerce API MVP requirements
    Programmer: Katryna Lei V. Martin
    Section:    AN22
    Start Date: July 16, 2023
    End Date:   July 17, 2023
*/

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    isActive: { 
        type: Boolean, 
    },
    createdOn: { 
        type: Date, 
        default: Date.now 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    } 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

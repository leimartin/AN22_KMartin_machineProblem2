// CCS0043L - Finals Source Code for 3T AY 2022-2023
/*
    Program:    E-commerce API MVP requirements
    Programmer: Katryna Lei V. Martin
    Section:    AN22
    Start Date: July 16, 2023
    End Date:   July 17, 2023
*/

const Product = require('../models/Product');

// Create Product (Admin only)
const createProduct = (req, res) => {
    const { name, description, price } = req.body;

    if (!req.isAdmin) {
        return res.status(403).json({ error: 'Not authorized' });
    }

    const product = new Product({
        name,
        description,
        price,
        insertedBy: req.userId // Use the admin's user ID
    });

    product.save()
    .then(() => {
        res.status(200).json({ message: 'Product created successfully' });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to create product' });
    });
};

// Retrieve all products
const getAllProducts = (req, res) => {
    // Find all products
    Product.find()
    .then((products) => {
        res.status(200).json(products);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to retrieve products' });
    });
};

// Retrieve all active products
const getActiveProducts = (req, res) => {
    // Find active products
    Product.find({ isActive: true })
    .then((products) => {
        res.status(200).json(products);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to retrieve active products' });
    });
};

// Retrieve a single product
const getProductById = (req, res) => {
    const productId = req.params.productId;

    // Find the product by ID
    Product.findById(productId)
    .then((product) => {
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to retrieve product' });
    });
};

// Update Product info (Admin only)
const updateProduct = (req, res) => {
    const productId = req.params.productId;
    const { name, description, price, isActive } = req.body;

    Product.findByIdAndUpdate(productId, { name, description, price, isActive }, { new: true })
    .then((product) => {
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully' });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to update product' });
    });
};

// Archive Product (Admin only)
const archiveProduct = (req, res) => {
    const productId = req.params.productId;

    Product.findByIdAndUpdate(productId, { isActive: false })
    .then((product) => {
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product archived successfully' });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to archive product' });
    });
};

module.exports = { 
    createProduct, 
    updateProduct, 
    archiveProduct,
    getAllProducts, 
    getActiveProducts, 
    getProductById 
};

// CCS0043L - Finals Source Code for 3T AY 2022-2023
/*
    Program:    E-commerce API MVP requirements
    Programmer: Katryna Lei V. Martin
    Section:    AN22
    Start Date: July 16, 2023
    End Date:   July 17, 2023
*/

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// User registration
const registerUser = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
    .then((existingUser) => {
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const user = new User({ email, password });

        user.save()
        .then(() => {
            res.status(200).json({ message: 'User registered successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to register user' });
        });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to register user' });
    });
};

// User login
const loginUser = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
    .then((user) => {
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, 'secret_key');
        res.status(200).json({ token });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Authentication failed' });
    });
};

module.exports = { 
    registerUser, 
    loginUser 
};
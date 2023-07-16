// CCS0043L - Finals Source Code for 3T AY 2022-2023
/*
    Program:    E-commerce API MVP requirements
    Programmer: Katryna Lei V. Martin
    Section:    AN22
    Start Date: July 16, 2023
    End Date:   July 17, 2023
*/

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoute = require('./routes/authRoutes');
const orderRoute = require('./routes/orderRoutes');
const productRoute = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:leiganda2003@sandbox.1k0pz7g.mongodb.net/ecommerce_database?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Failed to connect to MongoDB', error);
});

app.use('/auth', authRoute);
app.use('/orders', orderRoute);
app.use('/products', productRoute);
app.use('/users', userRoute);

app.listen(process.env.PORT || 4000, () => { 
    console.log(`API server is running on port ${ process.env.PORT || 4000}`)
});

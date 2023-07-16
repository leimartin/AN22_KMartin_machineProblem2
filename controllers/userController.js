// CCS0043L - Finals Source Code for 3T AY 2022-2023
/*
    Program:    E-commerce API MVP requirements
    Programmer: Katryna Lei V. Martin
    Section:    AN22
    Start Date: July 16, 2023
    End Date:   July 17, 2023
*/

const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Create Order (Non-admin only)
const createOrder = async (req, res) => {
    const { userId, products } = req.body;

    try {
        const updatedProducts = [];
        let totalAmount = 0;

        for (const item of products) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const subtotal = product.price * item.quantity;
            totalAmount += subtotal;

            updatedProducts.push({
                productId: product._id,
                quantity: item.quantity,
                subtotal
            });
        }

        const order = new Order({
            userId,
            products: updatedProducts,
            totalAmount
        });

        await order.save();

        res.status(200).json({ message: 'Order created successfully', order });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

// Update User
const updateUser = (req, res) => {
    const userId = req.params.userId;
    const { email, password, isAdmin } = req.body;

    const updateObject = {};
    if (email) {
        updateObject.email = email;
    }
    if (password) {
        updateObject.password = password;
    }
    if (isAdmin !== undefined) {
        updateObject.isAdmin = isAdmin;
    }

    User.findByIdAndUpdate(userId, updateObject, { new: true })
    .then(user => {
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json({ error: 'Failed to update user' });
    });
};


// Retrieve User Details
const getUserDetails = (req, res) => {
    const userId = req.params.userId;
    const { email, password, isAdmin } = req.body;

    User.findById(userId)
    .then(user => {
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        user.password = undefined;
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json({ error: 'Failed to retrieve user details' });
    });
};


// Retrieve All Users
const getAllUsers = (req, res) => {
    User.find()
    .then(users => {
        // Exclude password field from the response for all users
        users.forEach(user => {
            user.password = undefined;
        });
        
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: 'Failed to retrieve users' });
    });
};

// Retrieve authenticated user's orders
const getAuthenticatedUserOrders = (req, res) => {
    const userId = req.userId;

    Order.find({ userId })
    .then((orders) => {
        res.status(200).json(orders);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to retrieve orders' });
    });
};

// Setting user as admin (Admin only)
const setUserAsAdmin = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.isAdmin = true;
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Remove a specific order
const removeOrderProduct = (req, res) => {
    const { orderId, itemId } = req.params;

    Order.findById(orderId)
    .then((order) => {
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const itemIndex = order.products.findIndex((item) => item._id.toString() === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ error: 'Order item not found' });
        }

        order.products.splice(itemIndex, 1);

        return order.save();
    })
    .then(() => {
        res.status(200).json({ message: 'Order item removed successfully' });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to remove order item' });
    });
};

// Retrieve all orders for a user
const getUserOrders = async (req, res) => {
    const userId = req.userId;

    try {
        const orders = await Order.find({ userId });
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve user orders' });
    }
};

// Update Order Item Quantity
const updateOrderItemQuantity = (req, res) => {
    const { orderId, itemId } = req.params;
    const { quantity } = req.body;

    Order.findOneAndUpdate(
        { _id: orderId, 'products._id': itemId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
    )
    .then((order) => {
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order item quantity updated successfully' });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to update order item quantity' });
    });
};

// Register User
const registerUser = (req, res) => {
  const { email, password, isAdmin } = req.body;

  // Check if the user with the same email already exists
  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Create a new user
      const newUser = new User({ email, password, isAdmin });
      newUser.save()
        .then(user => {
          res.status(200).json({ message: 'User registered successfully', user });
        })
        .catch(error => {
          res.status(500).json({ error: 'Failed to register user' });
        });
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to check user existence' });
    });
};

module.exports = {
    updateUser,
    getUserDetails,
    getAllUsers,
    getAuthenticatedUserOrders,
    setUserAsAdmin,
    removeOrderProduct,
    createOrder,
    getUserOrders,
    registerUser,
    updateOrderItemQuantity
};

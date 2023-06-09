const jwt = require('jsonwebtoken');
const config = require('../config');
const appointment = require("../models/appointment");


// Authentication middleware
const authenticateUser = (req, res, next) => {
    // Get the token from the request header
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token not provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'secretkey');

        // Attach the decoded user data to the request object
        appointment.findById(decoded.uid).then((user) => {
            req.user = user;
            next();
        });

        // Call the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
};

module.exports = {
    authenticateUser
};
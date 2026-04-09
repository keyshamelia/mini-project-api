const { body } = require('express-validator');
const appError = require('../utils/appError');
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                code: 401,
                message: "Unauthorized: No token provided"
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded; // nyimpen data user biar bisa dipake di controller
        next();
    } catch (error) {
        return res.status(403).json({
            code: 403,
            message: "Invalid or expired token"
        });
    }
};

const validateUpdatePassword = [
    body("email").isEmail().withMessage("Email is required").normalizeEmail(),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

// buat registration & login 
const validateRegistration = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 chars")
];

const validateLogin = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required")
];

module.exports = {
    validateRegistration,
    validateLogin,
    validateToken,
    validateUpdatePassword,
};


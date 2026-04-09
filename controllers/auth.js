require('dotenv').config();
const { validationResult } = require('express-validator');
const userModel = require('../models/users'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// registration
const authController = {
  registration: async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          errors: errors.array()
        });
      }

      const { name, email, password } = req.body;

      // cek email sudah terdaftar belum
      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          code: 400,
          message: "Email already registered",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await userModel.store({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        code: 201,
        message: "User registered successfully",
      });

    } catch (error) {
      next(error);
    }
  },


// login
  login: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // cek user ada tidak
      const user = await userModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          code: 401,
          message: "Invalid email or password",
        });
      }

      // cek password cocok tidak
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          code: 401,
          message: "Invalid email or password",
        });
      }

      // generate JWT 
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email },
        process.env.JWT_SECRET,
        { 
          expiresIn: "1d"
        }
      );

      res.json({
        code: 200,
        message: "Login successful",
    
        data: {token: token },
      });

    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const newPassword = await bcrypt.hash(password, 10);
      const checkEmail = await userModel.findByEmail(email);

      if (!checkEmail) {
        return res.status(400).json({
          code: 400,
          message: "Email is not found",
        });
      }

      await userModel.updatePassword(newPassword, checkEmail.id);

      res.json({
        code: 200,
        message: "Successfully update password",
      });

    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
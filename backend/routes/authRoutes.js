const express = require('express');
const { body } = require('express-validator');
const { signup, login } = require('../controllers/authController');
const validate = require('../middleware/validate');

const router = express.Router();

router.post('/signup', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate,
], signup);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
  validate,
], login);

module.exports = router;

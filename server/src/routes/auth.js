const router = require('express').Router();
import { authController } from '../controllers';

/**
 * @route Post '/api/auth/register'
 * @desc Register user
 * @access Public
 */
router.post('/register', authController.register);

/**
 * @route Post '/api/auth/login'
 * @desc Login user
 * @access Public
 */
router.post('/login', authController.login);

module.exports = router;

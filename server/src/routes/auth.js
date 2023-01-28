const router = require('express').Router();
import { authController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

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

/**
 * @route Get '/api/auth/user'
 * @desc Get user
 * @access Private
 */
router.get('/user', verifyToken, authController.getUser);

module.exports = router;

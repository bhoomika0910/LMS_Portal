import { Router } from 'express';
import { body, param } from 'express-validator';
import * as authController from '../controllers/auth.controller.js';
import { validateRequest } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

const emailValidator = body('email').isEmail().withMessage('Valid email is required').normalizeEmail();
const passwordValidator = body('password')
	.isLength({ min: 8 })
	.withMessage('Password must be at least 8 characters long');

router.post(
	'/register',
	authLimiter,
	[
		body('firstName').trim().notEmpty().withMessage('First name is required'),
		body('lastName').trim().notEmpty().withMessage('Last name is required'),
		emailValidator,
		passwordValidator,
	],
	validateRequest,
	authController.register,
);

router.post('/login', authLimiter, [emailValidator, passwordValidator], validateRequest, authController.login);

router.post(
	'/refresh-token',
	[body('refreshToken').optional().isString().withMessage('Refresh token must be provided')],
	validateRequest,
	authController.refreshSession,
);

router.post(
	'/logout',
	[body('refreshToken').optional().isString().withMessage('Refresh token must be provided')],
	validateRequest,
	authController.logout,
);

router.post('/forgot-password', authLimiter, [emailValidator], validateRequest, authController.forgotPassword);

router.post(
	'/reset-password/:token',
	[passwordValidator, param('token').isLength({ min: 32 }).withMessage('Invalid reset token')],
	validateRequest,
	authController.resetPassword,
);

router.get(
	'/verify-email/:token',
	[param('token').isLength({ min: 32 }).withMessage('Invalid verification token')],
	validateRequest,
	authController.verifyEmail,
);

router.get('/me', verifyToken, authController.me);

export default router;

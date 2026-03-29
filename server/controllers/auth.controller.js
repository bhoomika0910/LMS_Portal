import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import { sendEmail } from '../utils/sendEmail.js';

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const sanitizeUser = (user) => {
  if (!user) return null;
  if (typeof user.toSafeObject === 'function') {
    return user.toSafeObject();
  }
  const obj = user.toObject({ virtuals: true });
  delete obj.password;
  delete obj.refreshTokens;
  delete obj.passwordResetToken;
  delete obj.passwordResetExpires;
  delete obj.emailVerificationToken;
  delete obj.emailVerificationExpires;
  return obj;
};

const decodeJwtExpiry = (token) => {
  const decoded = jwt.decode(token);
  if (!decoded?.exp) return undefined;
  return new Date(decoded.exp * 1000);
};

const persistRefreshToken = async (user, refreshToken, meta = {}) => {
  const hashedToken = hashToken(refreshToken);
  const expiresAt = decodeJwtExpiry(refreshToken) ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  user.refreshTokens = (user.refreshTokens ?? []).filter((tokenDoc) => tokenDoc.expiresAt ? tokenDoc.expiresAt > new Date() : true);
  user.refreshTokens.push({
    token: hashedToken,
    userAgent: meta.userAgent,
    ip: meta.ip,
    expiresAt,
  });

  await user.save({ validateBeforeSave: false });
};

const removeRefreshToken = async (user, refreshToken) => {
  if (!refreshToken) return;
  const hashedToken = hashToken(refreshToken);
  user.refreshTokens = (user.refreshTokens ?? []).filter((entry) => entry.token !== hashedToken);
  await user.save({ validateBeforeSave: false });
};

const buildAuthPayload = (user, accessToken, refreshToken) => ({
  user: sanitizeUser(user),
  tokens: {
    accessToken,
    refreshToken,
    expiresIn: process.env.ACCESS_TOKEN_TTL ?? '15m',
  },
});

const issueTokenPair = async (user, req) => {
  const payload = { sub: user.id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  await persistRefreshToken(user, refreshToken, { userAgent: req.get('user-agent'), ip: req.ip });
  return buildAuthPayload(user, accessToken, refreshToken);
};

const ensureJwtSecrets = () => {
  if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new ApiError(500, 'JWT secrets are not configured');
  }
};

const createEmailVerificationToken = async (user) => {
  const token = crypto.randomBytes(40).toString('hex');
  user.emailVerificationToken = hashToken(token);
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save({ validateBeforeSave: false });
  return token;
};

const createPasswordResetToken = async (user) => {
  const token = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = hashToken(token);
  user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save({ validateBeforeSave: false });
  return token;
};

export const register = async (req, res, next) => {
  try {
    ensureJwtSecrets();
    const { firstName, lastName, email, password, role } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      throw new ApiError(409, 'An account with this email already exists');
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: role && ['student', 'instructor'].includes(role) ? role : 'student',
      status: 'active',
    });

    const hydratedUser = await User.findById(user._id).select('+refreshTokens');
    const verificationToken = await createEmailVerificationToken(hydratedUser);
    const verifyUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify-email?token=${verificationToken}`;

    await sendEmail({
      to: hydratedUser.email,
      subject: 'Verify your LearnSphere email',
      html: `<p>Welcome to LearnSphere, ${hydratedUser.firstName}!</p><p>Verify your email by visiting <a href="${verifyUrl}">this link</a>. The link expires in 24 hours.</p>`,
    });

    const payload = await issueTokenPair(hydratedUser, req);

    res.status(201).json({
      message: 'Registration successful. Please verify your email.',
      data: payload,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    ensureJwtSecrets();
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password +refreshTokens');

    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }

    if (user.status === 'suspended') {
      throw new ApiError(403, 'Your account is suspended. Contact support.');
    }

    user.lastLoginAt = new Date();
    await user.save({ validateBeforeSave: false });

    const payload = await issueTokenPair(user, req);

    res.json({
      message: 'Login successful',
      data: payload,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshSession = async (req, res, next) => {
  try {
    ensureJwtSecrets();
    const incomingToken = req.body.refreshToken || req.cookies?.refreshToken;
    if (!incomingToken) {
      throw new ApiError(400, 'Refresh token is required');
    }

    const decoded = jwt.verify(incomingToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.sub).select('+refreshTokens');
    if (!user) {
      throw new ApiError(401, 'User not found for this token');
    }

    const hashedToken = hashToken(incomingToken);
    const storedToken = (user.refreshTokens ?? []).find((entry) => entry.token === hashedToken);
    if (!storedToken) {
      throw new ApiError(401, 'Refresh token has been revoked');
    }

    await removeRefreshToken(user, incomingToken);
    const payload = await issueTokenPair(user, req);

    res.json({
      message: 'Session refreshed',
      data: payload,
    });
  } catch (error) {
    next(error.name === 'TokenExpiredError' ? new ApiError(401, 'Refresh token expired') : error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const incomingToken = req.body.refreshToken || req.cookies?.refreshToken;
    if (!incomingToken) {
      return res.json({ message: 'Logged out' });
    }

    let userId;
    try {
      const decoded = jwt.verify(incomingToken, process.env.JWT_REFRESH_SECRET);
      userId = decoded.sub;
    } catch (error) {
      return res.json({ message: 'Logged out' });
    }

    const user = await User.findById(userId).select('+refreshTokens');
    if (user) {
      await removeRefreshToken(user, incomingToken);
    }

    res.json({ message: 'Logged out' });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      const token = await createPasswordResetToken(user);
      const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
      await sendEmail({
        to: user.email,
        subject: 'Reset your LearnSphere password',
        html: `<p>You requested a password reset.</p><p><a href="${resetUrl}">Reset your password</a> within 60 minutes.</p>`,
      });
    }

    res.json({ message: 'If that email exists, password reset instructions were sent.' });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = hashToken(token);

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    }).select('+refreshTokens');

    if (!user) {
      throw new ApiError(400, 'Password reset link is invalid or has expired');
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordChangedAt = new Date();
    user.refreshTokens = [];
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const hashedToken = hashToken(token);
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new ApiError(400, 'Verification link is invalid or has expired');
    }

    user.emailVerifiedAt = new Date();
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save({ validateBeforeSave: false });

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};

export const me = (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
};

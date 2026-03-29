import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.js';

const getBearerToken = (req) => {
  if (req.headers.authorization?.startsWith('Bearer ')) {
    return req.headers.authorization.split(' ')[1];
  }
  if (req.cookies?.accessToken) {
    return req.cookies.accessToken;
  }
  return null;
};

export const verifyToken = async (req, _res, next) => {
  try {
    const token = getBearerToken(req);
    if (!token) {
      throw new ApiError(401, 'Authentication required');
    }

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(payload.sub);

    if (!user) {
      throw new ApiError(401, 'User not found for this token');
    }

    req.user = user;
    req.auth = { userId: user.id, role: user.role };
    next();
  } catch (error) {
    next(error.name === 'TokenExpiredError' ? new ApiError(401, 'Access token expired') : error);
  }
};

export const refreshToken = (_req, _res, next) => {
  next();
};

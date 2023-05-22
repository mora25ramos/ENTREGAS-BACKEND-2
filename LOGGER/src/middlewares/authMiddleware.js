import jwt from 'jsonwebtoken';
import JWT_SECRET from '../config.js';
import logger from '../logger.js';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    logger.error('Authorization token not found');
    return res.status(401).json({ message: 'Authorization token not found' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    logger.error('Invalid token');
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    logger.warn('Access denied');
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

export default {
  authMiddleware,
  adminMiddleware
};
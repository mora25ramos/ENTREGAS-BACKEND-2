import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import UserRepository from '../repositories/UserRepository.js';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

User.repository = UserRepository;

User.schema.statics.getUserByEmail = async function (email) {
  try {
    return await User.repository.getByEmail(email);
  } catch (error) {
    logger.error(`Error retrieving user by email: ${email}`, error);
    return null;
  }
};

export default User;
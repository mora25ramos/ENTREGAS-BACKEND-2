import UserDAO from '../dao/mongoDB/user.mongo.js';
import UserDTO from '../dto/UserDTO.js';
import logger from '../utils/logger.js';

class UserRepository {
  async findById(userId) {
    try {
      const userData = await UserDAO.findById(userId);
      const user = UserDTO.fromData(userData);
      return user;
    } catch (error) {
      logger.error(`Error finding user with ID: ${userId}`, error);
      throw new Error(`Error finding user with ID: ${userId}`);
    }
  }

  async findByEmail(email) {
    try {
      const userData = await UserDAO.findByEmail(email);
      const user = UserDTO.fromData(userData);
      return user;
    } catch (error) {
      logger.error(`Error finding user with email: ${email}`, error);
      throw new Error(`Error finding user with email: ${email}`);
    }
  }

  async createUser(userData) {
    try {
      const newUser = await UserDAO.createUser(userData);
      const user = UserDTO.fromData(newUser);
      return user;
    } catch (error) {
      logger.error('Error creating user', error);
      throw new Error('Error creating user');
    }
  }

  async updateUser(userId, userData) {
    try {
      const updatedUser = await UserDAO.updateUser(userId, userData);
      const user = UserDTO.fromData(updatedUser);
      return user;
    } catch (error) {
      logger.error(`Error updating user with ID: ${userId}`, error);
      throw new Error(`Error updating user with ID: ${userId}`);
    }
  }

  async deleteUser(userId) {
    try {
      const deletedUser = await UserDAO.deleteUser(userId);
      const user = UserDTO.fromData(deletedUser);
      return user;
    } catch (error) {
      logger.error(`Error deleting user with ID: ${userId}`, error);
      throw new Error(`Error deleting user with ID: ${userId}`);
    }
  }
}

export default new UserRepository();
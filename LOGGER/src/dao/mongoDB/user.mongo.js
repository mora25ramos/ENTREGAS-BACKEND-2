import { getDB } from '../../db/db.js';
import logger from '../../utils/logger.js';

export class UserDAO {
  static async create(user) {
    try {
      const db = getDB();
      const result = await db.collection('users').insertOne(user);
      return result.insertedId;
    } catch (error) {
      logger.error('Error occurred while creating a new user', error);
      throw new Error('Error creating a new user');
    }
  }

  static async getAll() {
    try {
      const db = getDB();
      const users = await db.collection('users').find().toArray();
      return users;
    } catch (error) {
      logger.error('Error occurred while retrieving users', error);
      throw new Error('Error retrieving users');
    }
  }

  static async getById(id) {
    try {
      const db = getDB();
      const user = await db.collection('users').findOne({ _id: id });
      // Omitir información sensible
      const { _id, name, email } = user;
      return { _id, name, email };
    } catch (error) {
      logger.error(`Error occurred while retrieving a user by ID: ${id}`, error);
      throw new Error(`Error retrieving a user by ID: ${id}`);
    }
  }

  static async getByEmail(email) {
    try {
      const db = getDB();
      const user = await db.collection('users').findOne({ email: email });
      // Omitir información sensible
      const { _id, name, email } = user;
      return { _id, name, email };
    } catch (error) {
      logger.error(`Error occurred while retrieving a user by email: ${email}`, error);
      throw new Error(`Error retrieving a user by email: ${email}`);
    }
  }

  static async update(email, updatedUser) {
    try {
      const db = getDB();
      const result = await db.collection('users').updateOne({ email: email }, { $set: updatedUser });
      return result.modifiedCount;
    } catch (error) {
      logger.error('Error occurred while updating a user', error);
      throw new Error('Error updating a user');
    }
  }
}

export default {
  create: UserDAO.create,
  update: UserDAO.update,
  getByEmail: UserDAO.getByEmail,
  getById: UserDAO.getById
};
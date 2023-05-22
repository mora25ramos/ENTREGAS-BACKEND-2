import { getLogger } from '../logger.js';

const logger = getLogger();

export class UserDTO {
  constructor(id, name, email, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  static fromModel(userModel) {
    try {
      const { _id, name, email, role } = userModel;
      return new UserDTO(_id, name, email, role);
    } catch (error) {
      logger.error('Error occurred while creating UserDTO from model:', error);
      throw error;
    }
  }
};
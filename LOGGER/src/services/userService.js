import UserRepository from '../repositories/UserRepository.js';
import UserDTO from '../dto/UserDTO.js';
import logger from '../logger.js';

export const getUserById = async (userId) => {
  try {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error(`No se encontró el usuario con ID: ${userId}`);
    }
    logger.info(`Usuario obtenido por ID: ${userId}`);
    return user;
  } catch (error) {
    logger.error(`Error al obtener el usuario con ID: ${userId}: ${error}`);
    throw new Error('Error al obtener el usuario');
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error(`No se encontró el usuario con email: ${email}`);
    }
    logger.info(`Usuario obtenido por email: ${email}`);
    return user;
  } catch (error) {
    logger.error(`Error al obtener el usuario con email: ${email}: ${error}`);
    throw new Error('Error al obtener el usuario');
  }
};

export const createUser = async (userData) => {
  try {
    const newUser = await UserRepository.createUser(userData);
    const user = UserDTO.fromData(newUser);
    logger.info('Usuario creado exitosamente');
    return user;
  } catch (error) {
    logger.error(`Error al crear el usuario: ${error}`);
    throw new Error('Error al crear el usuario');
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const updatedUser = await UserRepository.updateUser(userId, userData);
    if (!updatedUser) {
      throw new Error(`No se encontró el usuario con ID: ${userId}`);
    }
    const user = UserDTO.fromData(updatedUser);
    logger.info(`Usuario actualizado por ID: ${userId}`);
    return user;
  } catch (error) {
    logger.error(`Error al actualizar el usuario con ID: ${userId}: ${error}`);
    throw new Error('Error al actualizar el usuario');
  }
};

export const deleteUser = async (userId) => {
  try {
    const deletedUser = await UserRepository.deleteUser(userId);
    if (!deletedUser) {
      throw new Error(`No se encontró el usuario con ID: ${userId}`);
    }
    const user = UserDTO.fromData(deletedUser);
    logger.info(`Usuario eliminado por ID: ${userId}`);
    return user;
  } catch (error) {
    logger.error(`Error al eliminar el usuario con ID: ${userId}: ${error}`);
    throw new Error('Error al eliminar el usuario');
  }
};
import { Router } from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import adminMiddleware from '../../middlewares/authMiddleware.js';
import UserRepository from '../../repositories/UserRepository.js';
import logger from '../../logger.js';

const usersRouter = Router();

// Obtener todos los usuarios (solo para administradores)
usersRouter.get('/', authMiddleware, adminMiddleware('admin'), async (req, res) => {
  try {
    const users = await UserRepository.getAllUsers();
    res.json(users);

    logger.debug('Obtenidos todos los usuarios');
  } catch (error) {
    logger.error(`Error al obtener los usuarios: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Obtener un usuario por su ID
usersRouter.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await UserRepository.getUserById(req.params.id);
    if (!user) {
      logger.warn(`Usuario no encontrado, ID: ${req.params.id}`);
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);

    logger.debug(`Obtenido usuario por ID: ${req.params.id}`);
  } catch (error) {
    logger.error(`Error al obtener el usuario por ID: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Actualizar un usuario (solo para administradores)
usersRouter.put('/:id', authMiddleware, adminMiddleware('admin'), async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await UserRepository.updateUser(id, userData);
    if (!updatedUser) {
      logger.warn(`Usuario no encontrado para actualizar, ID: ${id}`);
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);

    logger.info(`Usuario actualizado, ID: ${id}`);
  } catch (error) {
    logger.error(`Error al actualizar el usuario, ID: ${id}: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Eliminar un usuario (solo para administradores)
usersRouter.delete('/:id', authMiddleware, adminMiddleware('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserRepository.deleteUser(id);
    if (!deletedUser) {
      logger.warn(`Usuario no encontrado para eliminar, ID: ${id}`);
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(deletedUser);

    logger.info(`Usuario eliminado, ID: ${id}`);
  } catch (error) {
    logger.error(`Error al eliminar el usuario, ID: ${id}: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default usersRouter;
import express from 'express';
import logger from '../../logger.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const profileRouter = express.Router();

// Ruta para el perfil de usuario
profileRouter.get('/profile', authMiddleware, (req, res) => {
  // Lógica para obtener y renderizar el perfil de usuario

  logger.info(`Se ha accedido al perfil del usuario: ${req.user.username}`);
  res.render('profile', { user: req.user });
});

export default profileRouter;
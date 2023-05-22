import express from 'express';
import logger from '../../logger.js';
import login from '../../dao/fileSystem/UserManager.js';
import logout from '../../dao/fileSystem/UserManager.js';

const loginRouter = express.Router();
const logoutRouter = express.Router();

// Ruta para iniciar sesión
loginRouter.post('/', (req, res) => {
  // Lógica para iniciar sesión

  logger.debug('Inicio de sesión exitoso');
  res.send('Inicio de sesión exitoso');
});

// Ruta para cerrar sesión
loginRouter.post('/logout', (req, res) => {
  // Lógica para cerrar sesión

  logger.debug('Cierre de sesión exitoso');
  res.send('Cierre de sesión exitoso');
});

export default {
  loginRouter,
  logoutRouter
};
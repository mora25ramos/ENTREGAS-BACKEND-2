import express from 'express';
import logger from '../../logger.js';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.send('Hello, World!');

  logger.debug('Página de inicio solicitada');
});

export default indexRouter;
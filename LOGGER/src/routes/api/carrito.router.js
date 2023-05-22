import { Router } from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import adminMiddleware from '../../middlewares/adminMiddleware.js'; // Corregir importación
import { CarritoManager } from '../../dao/fileSystem/CarritoManager.js';
import UserDTO from '../../dto/UserDTO.js';
import CartRepository from '../../repositories/CartRepository.js';
import logger from '../../logger.js';

const carritoRouter = Router();

// Obtiene el carrito de un usuario específico
carritoRouter.get('/:username', authMiddleware, async (req, res) => {
  try {
    const carritoManager = new CarritoManager();
    const carrito = await carritoManager.getCarritoByUsername(req.params.username);
    res.render('carrito', { carrito }); // Renderiza la plantilla "carrito.handlebars" con los datos del carrito

    logger.info(`Carrito obtenido para el usuario: ${req.params.username}`);
  } catch (error) {
    logger.error(`Error al obtener el carrito: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Agrega un producto al carrito de un usuario
carritoRouter.post('/:username', authMiddleware, async (req, res) => {
  const { productId, cantidad } = req.body;
  try {
    const cartRepository = new CartRepository(); // Crear una instancia de CartRepository
    const carrito = await cartRepository.addToCart(req.params.username, productId, cantidad);
    res.render('carrito', { carrito }); // Renderiza la plantilla "carrito.handlebars" con los datos del carrito actualizado

    logger.info(`Producto agregado al carrito para el usuario: ${req.params.username}, Producto ID: ${productId}`);
  } catch (error) {
    logger.error(`Error al agregar producto al carrito: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Elimina un producto del carrito de un usuario
carritoRouter.delete('/:username/:productId', authMiddleware, async (req, res) => {
  try {
    const cartRepository = new CartRepository(); // Crear una instancia de CartRepository
    const carrito = await cartRepository.removeFromCart(req.params.username, req.params.productId);
    res.render('carrito', { carrito }); // Renderiza la plantilla "carrito.handlebars" con los datos del carrito actualizado

    logger.info(`Producto eliminado del carrito para el usuario: ${req.params.username}, Producto ID: ${req.params.productId}`);
  } catch (error) {
    logger.error(`Error al eliminar producto del carrito: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default carritoRouter;
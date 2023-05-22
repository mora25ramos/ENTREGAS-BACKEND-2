import CartRepository from '../repositories/CartRepository.js';
import logger from '../logger.js';

export const getCarritoByUsername = async (username) => {
  try {
    const carrito = await CartRepository.getCartByUserId(username);
    logger.info(`Carrito obtenido para el usuario: ${username}`);
    return carrito;
  } catch (error) {
    logger.error(`Error al obtener el carrito: ${error}`);
    throw new Error('Error al obtener el carrito');
  }
};

export const addToCarrito = async (username, productId, cantidad) => {
  try {
    const carrito = await CartRepository.addToCart(username, productId, cantidad);
    logger.info(`Producto agregado al carrito para el usuario: ${username}, Producto ID: ${productId}`);
    return carrito;
  } catch (error) {
    logger.error(`Error al agregar producto al carrito: ${error}`);
    throw new Error('Error al agregar producto al carrito');
  }
};

export const removeFromCarrito = async (username, productId) => {
  try {
    const carrito = await CartRepository.removeFromCart(username, productId);
    logger.info(`Producto eliminado del carrito para el usuario: ${username}, Producto ID: ${productId}`);
    return carrito;
  } catch (error) {
    logger.error(`Error al eliminar producto del carrito: ${error}`);
    throw new Error('Error al eliminar producto del carrito');
  }
};
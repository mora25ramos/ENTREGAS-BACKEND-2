import { getCarritoByUserId, addToCart, removeFromCart } from '../database/carrito.mongo.js';

const CartRepository = {
  getCartByUserId: async (userId) => {
    try {
      const carrito = await getCarritoByUserId(userId);
      return carrito;
    } catch (error) {
      throw new Error(`Error al obtener el carrito del usuario: ${error}`);
    }
  },

  addToCart: async (userId, productId, cantidad) => {
    try {
      const carrito = await addToCart(userId, productId, cantidad);
      return carrito;
    } catch (error) {
      throw new Error(`Error al agregar producto al carrito: ${error}`);
    }
  },

  removeFromCart: async (userId, productId) => {
    try {
      const carrito = await removeFromCart(userId, productId);
      return carrito;
    } catch (error) {
      throw new Error(`Error al eliminar producto del carrito: ${error}`);
    }
  }
};

export default CartRepository;
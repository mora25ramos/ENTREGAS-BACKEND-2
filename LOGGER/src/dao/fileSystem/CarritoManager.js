import ProductManager from './ProductManager.js';
import { CarritoDTO } from '../../dto/carritoDTO.js';
import CartRepository from '../../repositories/CartRepository.js';
import logger from '../../logger.js';

export class CarritoManager {
  async getCarritoByUserId(userId) {
    try {
      const carritoData = await CartRepository.getCartByUserId(userId);
      const carrito = CarritoDTO.fromData(carritoData);
      return carrito;
    } catch (error) {
      logger.error(`Error getting carrito for user with ID: ${userId}`, error);
      throw new Error(`Error getting carrito for user with ID: ${userId}`);
    }
  }

  async addToCarrito(userId, productId, quantity) {
    try {
      const product = await ProductManager.getProductById(productId);
      if (!product) {
        const errorMessage = `Product with ID: ${productId} does not exist`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      const canAddToCarrito = await ProductManager.checkStock(productId, quantity);
      if (!canAddToCarrito) {
        const errorMessage = `Insufficient stock for product with ID: ${productId}`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      const carritoData = await CartRepository.getCartByUserId(userId);
      const carrito = CarritoDTO.fromData(carritoData);
      const existingItem = carrito.getItemByProductId(productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        carrito.addItem({ productId, quantity });
      }

      await CartRepository.updateCart(carrito.toData(), userId);

      return carrito;
    } catch (error) {
      logger.error('Error adding product to carrito', error);
      throw new Error('Error adding product to carrito');
    }
  }

  async removeFromCarrito(userId, productId, quantity) {
    try {
      const carritoData = await CartRepository.getCartByUserId(userId);
      const carrito = CarritoDTO.fromData(carritoData);

      const existingItem = carrito.getItemByProductId(productId);

      if (existingItem) {
        if (quantity >= existingItem.quantity) {
          carrito.removeItemByProductId(productId);
        } else {
          existingItem.quantity -= quantity;
        }
      }

      await CartRepository.updateCart(carrito.toData(), userId);

      return carrito;
    } catch (error) {
      logger.error('Error removing product from carrito', error);
      throw new Error('Error removing product from carrito');
    }
  }

  async emptyCarrito(userId) {
    try {
      await CartRepository.deleteCart(userId);
    } catch (error) {
      logger.error('Error emptying carrito', error);
      throw new Error('Error emptying carrito');
    }
  }

  async purchaseCarrito(userId) {
    try {
      const carritoData = await CartRepository.getCartByUserId(userId);
      const carrito = CarritoDTO.fromData(carritoData);
      const productsToPurchase = [];

      for (const item of carrito.items) {
        const { productId, quantity } = item;
        const canPurchase = await ProductManager.checkStock(productId, quantity);

        if (canPurchase) {
          productsToPurchase.push({ productId, quantity });
        }
      }

      const purchasedProducts = [];

      for (const { productId, quantity } of productsToPurchase) {
        const product = await ProductManager.getProductById(productId);
        product.stock -= quantity;
        await ProductManager.updateProduct(productId, product);
        purchasedProducts.push({ productId, quantity });
      }

      const nonPurchasedProducts = carrito.items.filter(
        (item) => !productsToPurchase.some((product) => product.productId === item.productId)
      );

      carrito.items = nonPurchasedProducts;
      await CartRepository.updateCart(carrito.toData(), userId);

      return { purchasedProducts, nonPurchasedProducts };
    } catch (error) {
      logger.error('Error purchasing carrito', error);
      throw new Error('Error purchasing carrito');
    }
  }  
};

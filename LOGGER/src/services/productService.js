import ProductRepository from '../repositories/ProductRepository.js';
import logger from '../logger.js';

export const getAllProducts = async () => {
  try {
    const products = await ProductRepository.getAll();
    logger.info('Obtenidos todos los productos');
    return products;
  } catch (error) {
    logger.error(`Error al obtener todos los productos: ${error}`);
    throw new Error('Error al obtener todos los productos');
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await ProductRepository.getById(productId);
    if (!product) {
      throw new Error(`No se encontró el producto con ID: ${productId}`);
    }
    logger.info(`Producto obtenido por ID: ${productId}`);
    return product;
  } catch (error) {
    logger.error(`Error al obtener el producto con ID: ${productId}: ${error}`);
    throw new Error('Error al obtener el producto');
  }
};

export const createProduct = async (productData) => {
  try {
    const product = await ProductRepository.create(productData);
    logger.info('Producto creado exitosamente');
    return product;
  } catch (error) {
    logger.error(`Error al crear el producto: ${error}`);
    throw new Error('Error al crear el producto');
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const product = await ProductRepository.update(productId, productData);
    if (!product) {
      throw new Error(`No se encontró el producto con ID: ${productId}`);
    }
    logger.info(`Producto actualizado por ID: ${productId}`);
    return product;
  } catch (error) {
    logger.error(`Error al actualizar el producto con ID: ${productId}: ${error}`);
    throw new Error('Error al actualizar el producto');
  }
};

export const deleteProduct = async (productId) => {
  try {
    const product = await ProductRepository.delete(productId);
    if (!product) {
      throw new Error(`No se encontró el producto con ID: ${productId}`);
    }
    logger.info(`Producto eliminado por ID: ${productId}`);
    return product;
  } catch (error) {
    logger.error(`Error al eliminar el producto con ID: ${productId}: ${error}`);
    throw new Error('Error al eliminar el producto');
  }
};
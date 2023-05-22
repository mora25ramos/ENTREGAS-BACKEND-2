import { Router } from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import adminMiddleware from '../../middlewares/authMiddleware.js';
import ProductRepository from '../../repositories/ProductRepository.js';
import logger from '../../logger.js';

const productsRouter = Router();

// Obtener todos los productos
productsRouter.get('/', async (req, res) => {
  try {
    const products = await ProductRepository.getAllProducts();
    res.json(products);

    logger.debug('Obtenidos todos los productos');
  } catch (error) {
    logger.error(`Error al obtener los productos: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Obtener un producto por su ID
productsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductRepository.getProductById(id);
    if (!product) {
      logger.warn(`Producto no encontrado, ID: ${id}`);
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);

    logger.debug(`Obtenido producto por ID: ${id}`);
  } catch (error) {
    logger.error(`Error al obtener el producto por ID: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Crear un nuevo producto (solo para administradores)
productsRouter.post('/', authMiddleware, adminMiddleware('admin'), async (req, res) => {
  const productData = req.body;
  try {
    const createdProduct = await ProductRepository.addProduct(productData);
    res.json(createdProduct);

    logger.info(`Producto creado, ID: ${createdProduct.id}`);
  } catch (error) {
    logger.error(`Error al crear el producto: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Actualizar un producto (solo para administradores)
productsRouter.put('/:id', authMiddleware, adminMiddleware('admin'), async (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  try {
    const updatedProduct = await ProductRepository.updateProduct(id, productData);
    if (!updatedProduct) {
      logger.warn(`Producto no encontrado para actualizar, ID: ${id}`);
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);

    logger.info(`Producto actualizado, ID: ${id}`);
  } catch (error) {
    logger.error(`Error al actualizar el producto, ID: ${id}: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Eliminar un producto (solo para administradores)
productsRouter.delete('/:id', authMiddleware, adminMiddleware('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductRepository.deleteProduct(id);
    if (!deletedProduct) {
      logger.warn(`Producto no encontrado para eliminar, ID: ${id}`);
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(deletedProduct);

    logger.info(`Producto eliminado, ID: ${id}`);
  } catch (error) {
    logger.error(`Error al eliminar el producto, ID: ${id}: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default productsRouter;
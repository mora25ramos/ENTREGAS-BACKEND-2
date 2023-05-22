import ProductRepository from '../../repositories/ProductRepository.js';
import { ProductoDTO } from '../../dto/productDTO.js';
import Logger from '../../utils/Logger.js';

class ProductManager {
  async getAllProducts() {
    try {
      const productsData = await ProductRepository.getAll();
      const products = productsData.map((productData) => ProductoDTO.fromData(productData));
      Logger.info('Successfully retrieved all products');
      return products;
    } catch (error) {
      Logger.error('Error getting all products', error);
      throw new Error('Error getting all products');
    }
  }

  async getProductById(productId) {
    try {
      const productData = await ProductRepository.getById(productId);
      const product = ProductoDTO.fromData(productData);
      Logger.info(`Successfully retrieved product with ID: ${productId}`);
      return product;
    } catch (error) {
      Logger.error(`Error getting product with ID: ${productId}`, error);
      throw new Error(`Error getting product with ID: ${productId}`);
    }
  }

  async addProduct(productData) {
    try {
      const newProductData = await ProductRepository.create(productData);
      const newProduct = ProductoDTO.fromData(newProductData);
      Logger.info(`Successfully added a new product with ID: ${newProduct.id}`);
      return newProduct;
    } catch (error) {
      Logger.error('Error adding product', error);
      throw new Error('Error adding product');
    }
  }

  async updateProduct(productId, productData) {
    try {
      const updatedProductData = await ProductRepository.update(productId, productData);
      const updatedProduct = ProductoDTO.fromData(updatedProductData);
      Logger.info(`Successfully updated product with ID: ${productId}`);
      return updatedProduct;
    } catch (error) {
      Logger.error(`Error updating product with ID: ${productId}`, error);
      throw new Error(`Error updating product with ID: ${productId}`);
    }
  }

  async deleteProduct(productId) {
    try {
      const deletedProductData = await ProductRepository.delete(productId);
      const deletedProduct = ProductoDTO.fromData(deletedProductData);
      Logger.info(`Successfully deleted product with ID: ${productId}`);
      return deletedProduct;
    } catch (error) {
      Logger.error(`Error deleting product with ID: ${productId}`, error);
      throw new Error(`Error deleting product with ID: ${productId}`);
    }
  }

  async checkStock(productId, quantity) {
    try {
      const productData = await ProductRepository.getById(productId);
      const product = ProductoDTO.fromData(productData);
      if (product && product.stock >= quantity) {
        Logger.info(`Stock check passed for product with ID: ${productId}`);
        return true;
      }
      Logger.info(`Stock check failed for product with ID: ${productId}`);
      return false;
    } catch (error) {
      Logger.error(`Error checking stock for product with ID: ${productId}`, error);
      throw new Error(`Error checking stock for product with ID: ${productId}`);
    }
  }
}

export default new ProductManager();
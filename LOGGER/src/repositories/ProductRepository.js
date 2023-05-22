import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const Product = mongoose.model('Product');

export default class ProductRepository {
  async getAll() {
    try {
      const products = await Product.find({});
      return products;
    } catch (error) {
      logger.error('Error occurred while retrieving all products:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      logger.error(`Error occurred while retrieving product with ID ${id}:`, error);
      throw error;
    }
  }

  async create(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      logger.error('Error occurred while creating a new product:', error);
      throw error;
    }
  }

  async update(id, productData) {
    try {
      const product = await Product.findByIdAndUpdate(id, productData, { new: true });
      return product;
    } catch (error) {
      logger.error(`Error occurred while updating product with ID ${id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const product = await Product.findByIdAndDelete(id);
      return product;
    } catch (error) {
      logger.error(`Error occurred while deleting product with ID ${id}:`, error);
      throw error;
    }
  }
};
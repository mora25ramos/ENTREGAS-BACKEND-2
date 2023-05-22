import { getDB } from '../../db/db.js';
import logger from '../../utils/logger.js';

class ProductDAO {
  constructor(db) {
    this.db = db;
    this.collection = 'products';
  }

  async getAll() {
    try {
      const products = await this.db.collection(this.collection).find().toArray();
      return products;
    } catch (error) {
      logger.error('Error occurred while retrieving products', error);
      throw new Error('Error getting all products');
    }
  }

  async getProductById(id) {
    try {
      const product = await this.db.collection(this.collection).findOne({ id });
      return product;
    } catch (error) {
      logger.error(`Error occurred while retrieving product with ID: ${id}`, error);
      throw new Error(`Error getting product with ID: ${id}`);
    }
  }

  async addProduct(productData) {
    try {
      const result = await this.db.collection(this.collection).insertOne(productData);
      const insertedProduct = { id: result.insertedId, ...productData };
      return insertedProduct;
    } catch (error) {
      logger.error('Error occurred while adding product', error);
      throw new Error('Error adding product');
    }
  }

  async updateProduct(id, productData) {
    try {
      await this.db.collection(this.collection).updateOne({ id }, { $set: productData });
      const updatedProduct = { id, ...productData };
      return updatedProduct;
    } catch (error) {
      logger.error(`Error occurred while updating product with ID: ${id}`, error);
      throw new Error(`Error updating product with ID: ${id}`);
    }
  }

  async deleteProduct(id) {
    try {
      const product = await this.getProductById(id);
      if (!product) {
        return null;
      }
      await this.db.collection(this.collection).deleteOne({ id });
      return product;
    } catch (error) {
      logger.error(`Error occurred while deleting product with ID: ${id}`, error);
      throw new Error(`Error deleting product with ID: ${id}`);
    }
  }
}

export default ProductDAO;
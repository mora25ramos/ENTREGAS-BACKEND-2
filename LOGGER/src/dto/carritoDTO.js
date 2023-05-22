import { getLogger } from '../logger.js';
import { ProductoDTO } from './productoDTO.js';

const logger = getLogger();

export class CarritoDTO {
  constructor(id, productos, total) {
    this.id = id;
    this.productos = productos;
    this.total = total;
  }

  static fromModel(carrito) {
    try {
      const productosDTO = carrito.productos.map((producto) => ProductoDTO.fromModel(producto));
      return new CarritoDTO(carrito.id, productosDTO, carrito.total);
    } catch (error) {
      logger.error('Error occurred while creating CarritoDTO from model:', error);
      throw error;
    }
  }
};
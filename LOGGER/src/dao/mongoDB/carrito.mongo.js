import mongoose from 'mongoose';
import logger from '../logger.js';

const { Schema } = mongoose;

const carritoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    productos: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Producto',
          required: true
        },
        cantidad: {
          type: Number,
          default: 1
        }
      }
    ]
  },
  { timestamps: true }
);

const Carrito = mongoose.model('Carrito', carritoSchema);

const getCarritoByUserId = async (userId) => {
  try {
    const carrito = await Carrito.findOne({ userId }).populate('productos.productId');
    return carrito;
  } catch (error) {
    logger.error(`Error al obtener el carrito del usuario: ${error}`);
    throw error;
  }
};

const addToCart = async (userId, productId, cantidad) => {
  try {
    const carrito = await getCarritoByUserId(userId);
    const existingProduct = carrito.productos.find((p) => p.productId.toString() === productId);

    if (existingProduct) {
      existingProduct.cantidad += cantidad;
    } else {
      carrito.productos.push({ productId, cantidad });
    }

    await carrito.save();
    return carrito;
  } catch (error) {
    logger.error(`Error al agregar producto al carrito: ${error}`);
    throw error;
  }
};

const removeFromCart = async (userId, productId) => {
  try {
    const carrito = await getCarritoByUserId(userId);
    carrito.productos = carrito.productos.filter((p) => p.productId.toString() !== productId);
    await carrito.save();
    return carrito;
  } catch (error) {
    logger.error(`Error al eliminar producto del carrito: ${error}`);
    throw error;
  }
};

export { getCarritoByUserId, addToCart, removeFromCart };
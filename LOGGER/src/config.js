import dotenv from "dotenv";
import winston from "winston";

dotenv.config();

// Configuración del logger
const logger = winston.createLogger({
  level: "debug", // Nivel mínimo de logeo
  transports: [
    new winston.transports.Console(), // Transporte para mostrar logs en consola
    new winston.transports.File({ filename: "logs/errors.log", level: "error" }), // Transporte para registrar errores en un archivo
  ],
});

// Función para registrar un log
const log = (level, message) => {
  logger.log(level, message);
};

// Configuración de la aplicación
const config = {
  dbMongoURI: process.env.DB_MONGO_URI,
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret: process.env.JWT_SECRET,
};

// Reemplazar las referencias a console.log por la función de logeo
console.log = (message) => log("debug", message);
console.error = (message) => log("error", message);
console.warn = (message) => log("warning", message);

export default config;
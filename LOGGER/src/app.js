import express from 'express';
import path from 'path';
import { urlencoded, json } from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Importar middlewares
import { authMiddleware, adminMiddleware } from './middlewares/authMiddleware.js';
import passportMiddleware from './middlewares/passportMiddleware.js';

// Importar rutas
import apiProductRouter from './routes/api/product.router.js';
import apiCarritoRouter from './routes/api/carrito.router.js';
import apiUserRouter from './routes/api/user.router.js';
import indexRouter from './routes/web/index.router.js';
import profileRouter from './routes/web/profile.router.js';
import loginRouter from './routes/web/login.router.js';

// Importar socketConfig
import io from './socketConfig.js';

// Configuración
const app = express();
const port = 3000;

// Middleware de body-parser
app.use(urlencoded({ extended: false }));
app.use(json());

// Middleware de sesión
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true,
}));

// Middleware de Passport
app.use(passport.initialize());
app.use(passport.session());
passportMiddleware(passport);

// Configuración de rutas
app.use('/api/products', apiProductRouter);
app.use('/api/carrito', apiCarritoRouter);
app.use('/api/users', apiUserRouter);
app.use('/', indexRouter);
app.use('/profile', authMiddleware, profileRouter);
app.use('/login', loginRouter);

// Configuración de vistas
app.set('views', path.join(import.meta.url, 'views'));
app.set('view engine', 'handlebars');

// Configuración de archivos estáticos
app.use(express.static(path.join(import.meta.url, 'public')));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error del servidor');
});

// Iniciar el servidor
const server = createServer(app);
server.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

// Configuración de web sockets
const socketIO = io;

// Conexión de web socket
socketIO.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Evento de desconexión de web socket
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});
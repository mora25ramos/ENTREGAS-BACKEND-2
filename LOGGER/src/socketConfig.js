import { createServer } from 'http';
import { Server } from 'socket.io';

// Crear servidor HTTP
const server = createServer(app);

// Configurar web sockets
const io = new Server(server);

// Conexión de web socket
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Evento de desconexión de web socket
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

export default io;
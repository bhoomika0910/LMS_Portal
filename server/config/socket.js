export const configureSockets = (io) => {
  io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);

    socket.on('joinRoom', (room) => socket.join(room));
    socket.on('leaveRoom', (room) => socket.leave(room));

    socket.on('disconnect', () => {
      console.log('Socket disconnected', socket.id);
    });
  });
};

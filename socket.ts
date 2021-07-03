import { Server } from 'socket.io'
import { httpServer } from './http'
import { MessagePackage, onConnect, onDisconnect, onReceivePrivateMessage } from './packages';

export const io = new Server(httpServer, { cors: { origin: '*' } });

io.on("connection", (socket) => {

    socket.emit('onConnect')

    socket.on('onConnect', (username: string) => onConnect({ id: socket.id, username, }, io))

    socket.on('disconnect', () => onDisconnect(socket.id, io))

    socket.on('onReceivePrivateMessage', (messagePackage: MessagePackage) => onReceivePrivateMessage(messagePackage, io))

});

httpServer.listen(3500)
import { Server } from 'socket.io'
import { httpServer } from './http'
import { onConnect, onDisconnect } from './packages';

export const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

io.on("connection", (socket) => {


    socket.emit('onConnect')

    socket.on('onConnect', (username: string) => {

        onConnect({
            id: socket.id,
            username,
        }, io)

    })

    socket.on('disconnect', function () {

        onDisconnect(socket.id, io)

    });
});

httpServer.listen(3500)
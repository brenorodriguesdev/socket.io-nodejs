import { Server } from 'socket.io'

var users: User[] = []

export type MessagePackage = {
    id: string
    message: string
}

export function onConnect(user: User, server: Server) {
    users.push(user)
    server.emit('sendPlayers', users)
}

export function onDisconnect(id: string, server: Server) {
    users = users.filter(user => user.id != id)
    server.emit('sendPlayers', users)
}

export function onReceivePrivateMessage(messagePackage: MessagePackage, server: Server) {
    server.to(messagePackage.id).emit('onReceivePrivateMessage', messagePackage.message)
}
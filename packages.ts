import { Server } from 'socket.io'

var users: User[] = []

export function onConnect(user: User, server: Server) {
    users.push(user)
    server.emit('sendPlayers', users)
}

export function onDisconnect(id: string, server: Server) {
    users = users.filter(user => user.id != id)
    server.emit('sendPlayers', users)
}
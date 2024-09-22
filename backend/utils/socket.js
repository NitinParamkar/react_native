const {getUsers, users} = require("./getUsers");

function socket(io) {
    io.on('connection', (socket) => {
        
        socket.on('user-online', (socket) => {

            var user = {};
            user[socket.id] = data.username;

            if(users[data.roomname]) {
                users[data.roomname].push(user);
            }
            else {
                users[data.roomname] = [user];
            }

            socket.join(data.roomname);
        });

        socket.on('doubt', (data) => {
            socket.broadcast.to(data.roomname).emit('call', data);
        });

        socket.on('join-room', (roomId, userId) => {
            socket.join(roomId);
            socket.broadcast.emit('user-connected', userId);

            socket.on('disconnect', () => {
                socket.broadcast.emit('user-disconnected', userId);
            })
        })
    })
}

module.exports = socket;
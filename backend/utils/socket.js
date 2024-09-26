const {getUsers, users} = require("./getUsers");

function socket(io) {
    io.on('connection', (socket) => {
        
        socket.on('user-online', (data) => {

            var user = {};
            user[socket.id] = data.id;

            if(users[data.type] === "mentor" || user[data.type] === "both") {
                users["mentor"].push(user);
            }
            else {
                users["student"] = [user];
            }

            socket.join(data.type);
        });

        socket.on('doubt', (data) => {
            console.log(data);
            socket.broadcast.to("mentor").emit('doubt', data);
        });

        socket.on('join-room', (senderID, receiverID) => {
            socket.join(roomId);
            //socket.broadcast.emit('user-connected', userId);

            socket.on('disconnect', () => {
                socket.broadcast.emit('user-disconnected', userId);
            })
        })
    })
}

module.exports = socket;
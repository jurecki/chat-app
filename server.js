const express = require('express')
const app = express()
var cors = require('cors')
const path = require('path')
const socket = require('socket.io');


const messages = [];
const users = [];
app.use(cors());

app.use(express.static(path.join(__dirname, '/client')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});


const server = app.listen(8000, () => console.log('Server is running at http://localhost:8000'))
const io = socket(server);

io.on('connection', (socket) => {
    socket.on('join', (login) => {
        console.log('Oh, I\'ve new user ' + socket.id);
        users.push(login);
        console.log(users)
    });
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log('Oh, socket ' + socket.id + ' has left')
        users.splice(users.findIndex(item => item.id === socket.id), 1)
        console.log(users)
    });

});

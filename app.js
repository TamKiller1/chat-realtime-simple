const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)


app.get('/', (req, res) => {
    res.sendfile('index.html')
})

app.use('/js', express.static('js'))

io.on('connection',  (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

io.on('connect_failed', () => {
    document.write("Sorry, there seems to be an issue with the connection!");
})

http.listen(3000, () => {
    console.log('Server running on port: 3000')
})
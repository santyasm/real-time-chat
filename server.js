import express, { application } from "express";
const app = express();
import { createServer} from 'http';
import {Server} from 'socket.io';

const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.set('views', 'public');
app.set('view engine', 'ejs');

app.use('/', (req, res) => {
    res.render('index')
});

let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
        messages.push(data)
        console.log(messages)
        socket.broadcast.emit('receivedMessage', data);
    })
})

server.listen(3000, () => console.log('Server rodando!'));
import http from 'http';
import express from 'express';

import { Server } from 'socket.io';

import IOEVENTS from './public/io-events.js';
import dayjs from 'dayjs';

const PORT = 8787;

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

app.use(express.static('public'));
app.use(express.static('www'));

httpServer.listen(PORT, () => {
    console.log(`Server listening on *:${PORT}`);
});




// Connexion des clients
socketServer.on(IOEVENTS.CONNECTION,socket =>{
    console.log(socket.id);
    newUser(socket);

    socket.on(IOEVENTS.SEND_MESSAGE,message =>{
       const messageToBroadcast ={
           text:message.text,
           timestamp:dayjs().toISOString(),
           socketId:socket.id,
           avatar:socket.data.identity.avatar,
           name:socket.data.identity.name

       };
       socketServer.emit(IOEVENTS.NEW_MESSAGE,messageToBroadcast);

    });
    socket.on(IOEVENTS.CHANGE_NAME,identity =>{
        socket.data.identity.name = identity.name;
        sendUserIdentities();
    });
    socket.on(IOEVENTS.DISCONNECT,reason =>{
        socket.data.identity.name = identity.name;
        sendUserIdentities();
    });


});


async function newUser(socket) {
    const newUser={
        id:socket.id,
        avatar:randomAvatarImage(),
        name:'Anonymes'
    }
    socket.data.identity = newUser;
    await sendUserIdentities();


}


async function sendUserIdentities() {
    const clients = await socketServer.fetchSockets();
    const users =clients.map(c=> c.data.identity);

    socketServer.emit(IOEVENTS.LIST_USERS,users);

    
    
}

function randomAvatarImage() {
    const avatarNumber = Math.floor(Math.random() * 8 + 1);
    return `./images/avatar${avatarNumber}.png`;
}
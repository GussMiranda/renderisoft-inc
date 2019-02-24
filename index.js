'use strict'
const path = require('path');//archivo para concatenar
const express = require('express');//llamamos a express
const app = express();
const http = require('http').createServer(app);
const iostream = require('socket.io')(http);
const publicDir = `${__dirname}/public`;
//configuracion servidor
app.set('port', process.env.PORT|| 3000); //escucha el puerto configurado o sino pone 3000
require('./config/conexion');
//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//iniciar el server
const server = app.listen(app.get('port'), () =>{//escucha el puerto
    console.log('Servidor en puerto',app.get('port'));
    });

//Web sockets
const SocketIO = require('socket.io'); //utilizamos socket
const io = SocketIO(server); //recibe el servidor ya inicializado

io.on('connection', (socket) =>{
    console.log('nueva conexion', socket.id);
    
    socket.on('chat:mensaje',(data)=>{
   io.sockets.emit('chat:mensaje', data)
    });
    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);//emite a todos excepto  al emisor
    });
});
//stream
app
	.get('/cliente', (req, res) => {
		res.sendFile(`${publicDir}/client.html`)
	})
	.get('/streaming', (req, res) => {
		res.sendFile(`${publicDir}/server.html`)		
	})

io.on('connection', (socket) => {
	socket.on('streaming', (image) => {
		io.emit('playstream', image)
		console.log(image)
	})	
})







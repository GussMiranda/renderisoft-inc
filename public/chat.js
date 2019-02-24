const socket= io() //inicia el hilo y trae el server
let message= document.getElementById('message');//obtiene l variable con su nombre
let username= document.getElementById('username');
let btn= document.getElementById('send');
let outpout= document.getElementById('outpout');
let actions= document.getElementById('actions');

btn.addEventListener('click', function(){//enviar informacion capturada al servidor

    socket.emit('chat:mensaje',{
       username: username.value,
       message:  message.value

    });
message.value='';
});

message.addEventListener('keypress', function(){

socket.emit('chat:typing', username.value);
});

socket.on('chat:mensaje', function(data){//escucha el mensaje
    actions.innerHTML='';

    outpout.innerHTML += `<p>
<strong> ${data.username}</strong>: ${data.message}
</p>`
});

socket.on('chat:typing', function(data){//escucha el mensaje
    actions.innerHTML='';
    actions.innerHTML += `<p>
    <em> ${data} esta escribiendo un mensaje. </em></p>`
  
    });
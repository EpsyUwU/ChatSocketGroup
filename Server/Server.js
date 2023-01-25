const net = require('net');
const clients = []; //aqui almaceno los usuarios que se conecten



const server = net.createServer();


server.on('connection', (socket)=>{
    clients.push(socket)

    socket.on('data',(data)=>{
        clients.forEach((clients) =>{
            clients.write(data)  
            console.log('\nSe recibio el mensaje: ' + data)
        })
    })

    socket.on('error',(error)=>{
        console.log('el error fue: '+ error.message)
    })

    socket.on('end',()=>{//se cierra la secion del usuario
        const endSesion = clients.indexOf(socket);
        clients.splice(endSesion,1)
        console.log('se fue un pibe')
    })
})

server.listen(4000, ()=>{
    console.log('si calo si tu chingadera en el puerto', server.address().port)
})


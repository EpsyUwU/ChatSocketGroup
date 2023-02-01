//Carlos Esteban Rivea Perez 213530

const net = require('net');
let names = []//aqui almaceno los usuarios que se conecten

const server = net.createServer((socket) =>{
    console.log("llego un papu")

    socket.on('data',(data)=>{

        

        let message = data.toString().trim()//quito los espacios
        let bai = message.substring(5)
        console.log(message.substring(5))
        if(bai === "0"){
            socket.end()
        }
        
        if(message.startsWith("userName")){
            let userName = message.substring(8)//obtiene los datos del string despues del 8 digito

            let flag = false

            names.forEach(name =>{
                if(name.userName === userName){
                    flag = true
                }
            })

            if(!flag){
                names.push({socket, userName})
                socket.write("bienvenido al chat")
            }else{
                socket.write("nombre ya usado")
            }
        }else{

            console.log('\nSe recibio el mensaje: ' + data)   
            names.forEach(client => {
                if (client.socket != socket) {
                    client.socket.write(data)   
                }
            });
        }  
    })

    socket.on('error',(error)=>{//por si falla algo 
        console.log('el error fue: '+ error.message)
    })
    
    socket.on('end',()=>{//se cierra la secion del usuario
        const endSesion = names.indexOf(socket);
        names.splice(endSesion,1)
        console.log('se fue un pibe')
    })
});
 

server.listen(4000, ()=>{
    console.log('si calo si el puerto', server.address().port)
})


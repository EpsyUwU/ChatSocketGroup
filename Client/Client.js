const net = require('net')
const readline = require('readline-sync')

const options = {
    port: 4000,
    host: '127.0.0.1' 
}

const client = net.createConnection(options);

client.on('connect', () => {
    console.log('conexion exitosa')
    sentLine()
})

client.on('data',(data) =>{
    console.log('recibes del server: ' + data.toString())
    sentLine()
})

client.on('error', (error) =>{
    console.log(error.message)
})

client.on('end',()=>{
    console.log('ayoooooo usuario')
})

function sentLine(){

    let line = readline.question('\nescribe algo: \t')
    
    if(line =='0'){
        client.end()
    }else{
        client.write(line)
    }
}
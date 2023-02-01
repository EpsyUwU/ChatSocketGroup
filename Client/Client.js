//Carlos Esteban Rivea Perez 213530

const readline = require('readline-sync')


let name = readline.question("Cual es tu nombre?> ")
let stdin = process.openStdin()

const net = require('net')
const options = {
    port: 4000,
    host: '127.0.0.1' 
}

const client = net.createConnection(options, () =>{
    client.write("userName"+name)

    client.on('data', (data) => {//recibe el mensaje

        if(data.toString() === "nombre ya usado"){
            console.log(data.toString())
            name = readline.question("Cual es tu nombre?> ")
        }else{
            process.stdout.write("\n" + data)
            process.stdout.write("\nyo>")  
        }

        stdin.addListener('data', (data) => {//mando el mensaje
                process.stdout.write("\nyo>")
                client.write(name + ">" + data)
            })
    });
    
    
})


client.on('error', (error) =>{
    console.log(error.message)
})

client.on('end',()=>{
    console.log('ayoooooo usuario')
})

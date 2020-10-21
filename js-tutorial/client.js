const net = require('net');

const client = net.Socket();

const clientConnected = () => {

    client.write("ROMAN_TO_ARABIC III");
    
    client.on("data", (data) => {
        console.log("Number as arabic: " + data.toString());
    
        client.write("FINISHED");
    });
}

client.connect(3000, "www.ecp.ufma.br", clientConnected)
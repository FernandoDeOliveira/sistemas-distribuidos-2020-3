const net = require("net");

function roman_to_arabic(roman) {
     let total = 0;
     roman_dict = {'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000}
     for (var i = 0; i < roman.length - 1; i++) {
          if (roman_dict[roman[i]] < roman_dict[roman[i+1]]){
               total = total - roman_dict[roman[i]];
          } else{
               total = total + roman_dict[roman[i]];
          }
        }
     total = total + roman_dict[roman.slice(-1)];
     return total
}

const connectionListener = (socket) => {

    socket.on("data", (data) => {
        const command = data.toString();
        console.log(command);

        const parametros = command.split(" ");
        console.log(parametros);

        if (parametros[0] === "ROMAN_TO_ARABIC") {
            let arabic_number;

            if (parametros.length > 1) {
                arabic_number = roman_to_arabic(parametros[1]);
            }

            socket.write(arabic_number.toString());
        } else if (parametros[0] === "FINISH") {
            socket.end();
        } else {
            socket.write("WRONG INPUT");
        }
    });

    socket.on("end", () => {
        console.log("Client disconnected!");
    });
}

const server = net.createServer(connectionListener);

server.listen(3000, "0.0.0.0");
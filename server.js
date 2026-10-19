const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server);
const salas = {};

app.use(express.static(__dirname));

io.on("connection", (socket) => {

    console.log(
        "Jugador conectado:",
        socket.id
    );

    socket.on(
    "unirseSala",
    (codigoSala) => {

        if(!salas[codigoSala]){
            salas[codigoSala] = [];
        }

        if(salas[codigoSala].length >= 5){

            socket.emit(
                "salaLlena"
            );

            return;
        }

        socket.join(codigoSala);

        salas[codigoSala].push(
            socket.id
        );

        console.log(
            `${socket.id} unido a ${codigoSala}`
        );
    }
);

    socket.on(
        "moverJugador",
        (datos) => {

            console.log(
                "Movimiento recibido:",
                datos
            );

            socket.to(
                datos.sala
            ).emit(
                "actualizarJugador",
                {
                    id: socket.id,
                    x: datos.x,
                    y: datos.y,
                    nombre: datos.nombre,
                    color: datos.color,
                    sala: datos.sala
                }
            );

        }
    );

    socket.on(
        "tareaCompletada",
        (datos) => {

            io.to(
                datos.sala
            ).emit(
                "eliminarTarea",
                datos.id
            );

        }
    );

    socket.on(
        "victoria",
        (sala) => {

            console.log(
                "VICTORIA EN:",
                sala
            );

            io.to(sala).emit(
                "victoriaGlobal"
            );
        }
    );

    socket.on(
        "derrota",
        (sala) => {

            io.to(sala).emit(
                "derrotaGlobal"
            );
        }
    );

    socket.on(
        "disconnect",
        () => {
for(const codigoSala in salas){

    salas[codigoSala] =
        salas[codigoSala].filter(
            id => id !== socket.id
        );

    if(
        salas[codigoSala].length === 0
    ){
        delete salas[codigoSala];
    }
}

            console.log(
                "Jugador desconectado:",
                socket.id
            );

            io.emit(
                "jugadorDesconectado",
                socket.id
            );
        }
    );

});

const PORT =
    process.env.PORT || 3000;

server.listen(
    PORT,
    () => {

        console.log(
            `Servidor iniciado en puerto ${PORT}`
        );

    }
);
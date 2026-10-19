const mapa = document.querySelector(".mapa");
const socket = io();
const codigoSala =
    localStorage.getItem(
        "codigoSala"
    ) || "GENERAL";

socket.emit(
    "unirseSala",
    codigoSala
);

console.log(
    "Sala:",
    codigoSala
);
const datosJugador =
    JSON.parse(
        localStorage.getItem("jugador")
    );

const nombreJugador =
    datosJugador?.usuario ||
    "Jugador";

const colorJugador =
    localStorage.getItem("colorJugador")
    || "#3498db";
    console.log(
    "Color local:",
    colorJugador
);
const jugadoresRemotos = {};
const zonas =
    document.querySelectorAll(".zona");
const contenedorJugador = document.getElementById("contenedorJugador");

const basura = document.getElementById("basura");
const pizarron = document.getElementById("pizarron");
const silla = document.getElementById("silla");
const foco =
    document.getElementById("foco");
    const contenedorTareas =
    document.getElementById("contenedorTareas");

const enemigo = document.getElementById("enemigo");

const estadoTexto = document.getElementById("estadoEscuela");
const barraEstado = document.getElementById("barraEstado");
const notificacion = document.getElementById("notificacion");
const btnArriba =
    document.getElementById("btnArriba");

const btnAbajo =
    document.getElementById("btnAbajo");

const btnIzquierda =
    document.getElementById("btnIzquierda");

const btnDerecha =
    document.getElementById("btnDerecha");

const btnInteractuar =
    document.getElementById("btnInteractuar");
    btnArriba.addEventListener(
    "mousedown",
    () => iniciarMovimiento(0,-velocidad)
);

btnAbajo.addEventListener(
    "mousedown",
    () => iniciarMovimiento(0,velocidad)
);

btnIzquierda.addEventListener(
    "mousedown",
    () => iniciarMovimiento(-velocidad,0)
);

btnDerecha.addEventListener(
    "mousedown",
    () => iniciarMovimiento(velocidad,0)
);

btnArriba.addEventListener(
    "mouseup",
    detenerMovimiento
);

btnAbajo.addEventListener(
    "mouseup",
    detenerMovimiento
);

btnIzquierda.addEventListener(
    "mouseup",
    detenerMovimiento
);

btnDerecha.addEventListener(
    "mouseup",
    detenerMovimiento
);

const controlesMovil =
    document.getElementById("controlesMovil");
const cuentaAtras =
    document.getElementById("cuentaAtras");
    const paredes =
    document.querySelectorAll(".pared");
    const tareasExtra =
    document.querySelectorAll(".tareaExtra");
if (
    !mapa ||
    !contenedorJugador ||
    !basura ||
    !pizarron ||
    !silla ||
    !foco ||
    !enemigo ||
    !estadoTexto ||
    !barraEstado ||
    !notificacion
) {
    console.error("Faltan elementos necesarios en el HTML.");
} else {
    let x = 420;
    let y = 280;

    let enemigoX = 1000;
    let enemigoY = 500;

    let estadoEscuela = 0;

let vidas = 3;

let tiempoRestante = 120;

const temporizadorTexto =
    document.getElementById("temporizador");

    let victoriaMostrada = false;
    let juegoTerminado = false;

const vidasTexto =
    document.getElementById("vidas");
    let congelado = false;
    let colisionBloqueada = false;
    let temporizadorNotificacion;

    const velocidad = 10;
    const esMovil =
    /Android|iPhone|iPad|iPod/i
    .test(navigator.userAgent);

if(esMovil){

    controlesMovil.style.display =
        "flex";
}
    const velocidadEnemigo =  11;
    const distanciaMaxima = 80;
    const distanciaCongelacion = 40;
    const distanciaParaReactivar = 60;

    function mostrarNotificacion(texto) {
        notificacion.textContent = texto;
        notificacion.style.display = "block";

        clearTimeout(temporizadorNotificacion);

        temporizadorNotificacion = setTimeout(() => {
            notificacion.style.display = "none";
        }, 2500);
    }

    function actualizarVidas(){

    if(vidas === 3){

        vidasTexto.textContent =
            "❤️ ❤️ ❤️";

    }

    if(vidas === 2){

        vidasTexto.textContent =
            "❤️ ❤️ 🖤";

    }

    if(vidas === 1){

        vidasTexto.textContent =
            "❤️ 🖤 🖤";

    }

    if(
    vidas <= 0 &&
    !juegoTerminado
){
``

        vidasTexto.textContent =
            "🖤 🖤 🖤";

        document.body.innerHTML = `
            <div
            style="
            background:black;
            color:red;
            height:100vh;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            font-family:Arial;
            ">

                <h1 style="font-size:60px;">
                🤖
                </h1>

                <h1>
                💀 ESCUELA EN DETERIORO
                </h1>

                <p>
                Has perdido todas tus vidas.
                </p>

                <button
                onclick="window.location.href='menu-principal.html'">
                VOLVER AL MENÚ
                </button>

            </div>
        `;
    }
}

function actualizarTemporizador(){

    const minutos =
        Math.floor(
            tiempoRestante / 60
        );

    const segundos =
        tiempoRestante % 60;

    temporizadorTexto.textContent =
        `⏳ ${
            String(minutos).padStart(2,"0")
        }:${
            String(segundos).padStart(2,"0")
        }`;
}

function actualizarEstado() {
        estadoTexto.textContent =
    `Estado de la Escuela: ${Math.round(estadoEscuela)}%`;

        barraEstado.style.width = `${estadoEscuela}%`;

        if (
    estadoEscuela >= 100 &&
    !victoriaMostrada
) {
    console.log(
    "ENTRE A LA VICTORIA"
);
 socket.emit(
        "victoria",
        codigoSala
    );

    juegoTerminado = true;

    victoriaMostrada = true;

    document.body.innerHTML = `
    <div
    style="
    background:#1b5e20;
    color:white;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    font-family:Arial;
    ">

        <h1 style="font-size:70px;">
        🏆
        </h1>

        <h1>
        MISIÓN CUMPLIDA
        </h1>

        <p>
        La escuela ha sido restaurada.
        </p>

        <button
        onclick="
        window.location.href='menu-principal.html'
        ">
        VOLVER AL MENÚ
        </button>

    </div>
    `;
}

}

    function obtenerCentro(elemento) {
        const rect = elemento.getBoundingClientRect();

        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }

    function distanciaEntreElementos(elementoA, elementoB) {
        const centroA = obtenerCentro(elementoA);
        const centroB = obtenerCentro(elementoB);

        return Math.hypot(
            centroA.x - centroB.x,
            centroA.y - centroB.y
        );
    }

    function hayColisionConZona(
    nuevoX,
    nuevoY
){

    const jugadorRect = {

        left: nuevoX,

        top: nuevoY,

        right:
            nuevoX +
            contenedorJugador.offsetWidth,

        bottom:
            nuevoY +
            contenedorJugador.offsetHeight
    };

    for(const zona of zonas){

        const rect =
            zona.getBoundingClientRect();

        const mapaRect =
            mapa.getBoundingClientRect();

        const zonaRect = {

            left:
                rect.left -
                mapaRect.left,

            top:
                rect.top -
                mapaRect.top,

            right:
                rect.right -
                mapaRect.left,

            bottom:
                rect.bottom -
                mapaRect.top
        };

        const colision =

            jugadorRect.left <
            zonaRect.right &&

            jugadorRect.right >
            zonaRect.left &&

            jugadorRect.top <
            zonaRect.bottom &&

            jugadorRect.bottom >
            zonaRect.top;

        if(colision){

            return true;
        }
    }

    return false;
}

    function hayColisionConPared(
    nuevoX,
    nuevoY
){

    const jugadorRect = {
        left: nuevoX,
        top: nuevoY,
        right:
            nuevoX +
            contenedorJugador.offsetWidth,

        bottom:
            nuevoY +
            contenedorJugador.offsetHeight
    };

    for(const pared of paredes){

        const rect =
            pared.getBoundingClientRect();

        const mapaRect =
            mapa.getBoundingClientRect();

        const paredRect = {

            left:
                rect.left -
                mapaRect.left,

            top:
                rect.top -
                mapaRect.top,

            right:
                rect.right -
                mapaRect.left,

            bottom:
                rect.bottom -
                mapaRect.top
        };

        const colision =

            jugadorRect.left <
            paredRect.right &&

            jugadorRect.right >
            paredRect.left &&

            jugadorRect.top <
            paredRect.bottom &&

            jugadorRect.bottom >
            paredRect.top;

        if(colision){

            return true;
        }
    }

    return false;
}

   function realizarAccion(elemento, mensaje) {

    if (getComputedStyle(elemento).display === "none") {
        return false;
    }

    if (
        distanciaEntreElementos(
            contenedorJugador,
            elemento
        ) > distanciaMaxima
    ) {
        return false;
    }

    elemento.style.display = "none";

    socket.emit(
        "tareaCompletada",
        {
            sala: codigoSala,
            id: elemento.id
        }
    );

    estadoEscuela = Math.min(
        100,
        estadoEscuela + 4.76190476
    );

    if(estadoEscuela > 99.9){
        estadoEscuela = 100;
    }

    actualizarEstado();

    mostrarNotificacion(
        mensaje
    );

    return true;
}
    function limitarPosicionJugador() {
        const limiteX = Math.max(
            0,
            mapa.clientWidth - contenedorJugador.offsetWidth
        );

        const limiteY = Math.max(
            0,
            mapa.clientHeight - contenedorJugador.offsetHeight
        );

        x = Math.max(0, Math.min(x, limiteX));
        y = Math.max(0, Math.min(y, limiteY));
    }

    function moverJugador(dx, dy) {

    if(congelado) return;

    const nuevoX = x + dx;
    const nuevoY = y + dy;
    
if(
    hayColisionConPared(
        nuevoX,
        nuevoY
    )
){
    return;
}

    const limiteX =
        mapa.clientWidth -
        contenedorJugador.offsetWidth;

    const limiteY =
        mapa.clientHeight -
        contenedorJugador.offsetHeight;

    if(
        nuevoX < 50 ||
        nuevoX > limiteX - 50
    ){
        return;
    }

    if(
        nuevoY < 50 ||
        nuevoY > limiteY - 50
    ){
        return;
    }

    x = nuevoX;
    y = nuevoY;

    contenedorJugador.style.left =
        x + "px";

    contenedorJugador.style.top =
        y + "px";
      socket.emit(
    "moverJugador",
    {

        sala: codigoSala,

        x,
        y,

        nombre: nombreJugador,

        color: colorJugador

    }
);

}


    function limitarPosicionEnemigo() {
        const limiteX = Math.max(
            0,
            mapa.clientWidth - enemigo.offsetWidth
        );

        const limiteY = Math.max(
            0,
            mapa.clientHeight - enemigo.offsetHeight
        );

        enemigoX = Math.max(0, Math.min(enemigoX, limiteX));
        enemigoY = Math.max(0, Math.min(enemigoY, limiteY));
    }

    // Ajusta y aplica las posiciones iniciales dentro del mapa.
    limitarPosicionJugador();
    limitarPosicionEnemigo();

    contenedorJugador.style.left = `${x}px`;
    contenedorJugador.style.top = `${y}px`;

    enemigo.style.left = `${enemigoX}px`;
    enemigo.style.top = `${enemigoY}px`;

    actualizarEstado();
actualizarVidas();
actualizarTemporizador();
tareasExtra.forEach((tarea) => {

    tarea.style.left =
        (100 + Math.random() * 1100) + "px";

    tarea.style.top =
        (100 + Math.random() * 650) + "px";
});
const tareas = [];

const iconos = [
    "🗑️",
    "🧽",
    "🪑",
    "💡"
];

for(let i = 0; i < 12; i++){

    const tarea =
        document.createElement("div");

        tarea.id =
    "tareaExtra" + i;

    tarea.textContent =
        iconos[
            Math.floor(
                Math.random() * iconos.length
            )
        ];

    tarea.style.position =
        "absolute";

   const posicionesSeguras = [

    {x:150,y:250},
    {x:550,y:250},
    {x:1000,y:250},

    {x:200,y:500},
    {x:650,y:500},
    {x:1100,y:500},

    {x:200,y:750},
    {x:650,y:750},
    {x:1050,y:750}

];


const pos =
    posicionesSeguras[
        Math.floor(
            Math.random() *
            posicionesSeguras.length
        )
    ];

tarea.style.left =
    pos.x + "px";

tarea.style.top =
    pos.y + "px";

    tarea.classList.add("tareaExtra");

    contenedorTareas.appendChild(
        tarea
    );

    tareas.push(tarea);
}

document.addEventListener("keydown", (event) => {
        const tecla = event.key.toLowerCase();

        if (tecla.startsWith("arrow")) {
            event.preventDefault();
        }

        if (tecla === "w" || tecla === "arrowup") {
            moverJugador(0, -velocidad);
        } else if (tecla === "s" || tecla === "arrowdown") {
            moverJugador(0, velocidad);
        } else if (tecla === "a" || tecla === "arrowleft") {
            moverJugador(-velocidad, 0);
        } else if (tecla === "d" || tecla === "arrowright") {
            moverJugador(velocidad, 0);
       } else if (tecla === "e") {

    const tareas =
        document.querySelectorAll(
            "#basura, #pizarron, #silla, #foco, .tareaExtra"
        );

    for (const tarea of tareas) {

        if (
            realizarAccion(
                tarea,
                "✅ Tarea completada"
            )
        ) {
            return;
        }
    }
}

});

    setInterval(() => {
        if(juegoTerminado){
    return;
}
        const jugador = obtenerCentro(contenedorJugador);
        const centroEnemigo = obtenerCentro(enemigo);

        const dx = jugador.x - centroEnemigo.x;
        const dy = jugador.y - centroEnemigo.y;
        const distancia = Math.hypot(dx, dy);

        if (distancia > 0) {
            enemigoX += (dx / distancia) * velocidadEnemigo;
            enemigoY += (dy / distancia) * velocidadEnemigo;

            limitarPosicionEnemigo();

            enemigo.style.left = `${enemigoX}px`;
            enemigo.style.top = `${enemigoY}px`;
        }

        const distanciaChoque =
            distanciaEntreElementos(contenedorJugador, enemigo);

        // Permite otro congelamiento solo después de que se separen.
        if (distanciaChoque > distanciaParaReactivar) {
            colisionBloqueada = false;
        }

        if (
            distanciaChoque < distanciaCongelacion &&
            !congelado &&
            !colisionBloqueada
        ) {
            congelado = true;
            colisionBloqueada = true;
vidas--;

actualizarVidas();
            mostrarNotificacion("❄️ ¡Congelado durante 5 segundos!");

            setTimeout(() => {
                congelado = false;
                mostrarNotificacion("✅ Ya puedes moverte");
            }, 5000);
        }
        }, 100);
if(btnArriba){

    let moverInterval;

    function iniciarMovimiento(dx, dy){

        clearInterval(moverInterval);

        moverInterval = setInterval(
            () => moverJugador(dx, dy),
            50
        );
    }

    function detenerMovimiento(){

        clearInterval(
            moverInterval
        );
    }

    btnArriba.addEventListener(
        "touchstart",
        () => iniciarMovimiento(0,-velocidad)
    );

    btnAbajo.addEventListener(
        "touchstart",
        () => iniciarMovimiento(0,velocidad)
    );

    btnIzquierda.addEventListener(
        "touchstart",
        () => iniciarMovimiento(-velocidad,0)
    );

    btnDerecha.addEventListener(
        "touchstart",
        () => iniciarMovimiento(velocidad,0)
    );

    btnArriba.addEventListener(
        "touchend",
        detenerMovimiento
    );

    btnAbajo.addEventListener(
        "touchend",
        detenerMovimiento
    );

    btnIzquierda.addEventListener(
        "touchend",
        detenerMovimiento
    );

    btnDerecha.addEventListener(
        "touchend",
        detenerMovimiento
    );

    btnInteractuar.addEventListener(
        "click",
        () => {

            const tareas =
                document.querySelectorAll(
                    "#basura, #pizarron, #silla, #foco, .tareaExtra"
                );

            for(const tarea of tareas){

                if(
                    realizarAccion(
                        tarea,
                        "✅ Tarea completada"
                    )
                ){
                    return;
                }
            }
        }
    );

}
    actualizarTemporizador();

    setInterval(() => {

        if (vidas <= 0) {
            return;
        }

        tiempoRestante--;

        actualizarTemporizador();

   if (
    tiempoRestante <= 0 &&
    !juegoTerminado
) {

    juegoTerminado = true;

    socket.emit(
        "derrota",
        codigoSala
    );

    document.body.innerHTML = `
    <div
    style="
    background:black;
    color:red;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    font-family:Arial;
    ">

        <h1>⏳ TIEMPO AGOTADO</h1>

        <p>
        La escuela cayó en deterioro.
        </p>

        <button
        onclick="window.location.href='menu-principal.html'">
        VOLVER AL MENÚ
        </button>

    </div>
    `;
}

    }, 1000);
let numeroCuenta = 3;

const intervaloCuenta = setInterval(() => {

    numeroCuenta--;

    if(numeroCuenta > 0){

        cuentaAtras.textContent =
            numeroCuenta;

    }

    else if(numeroCuenta === 0){

        cuentaAtras.textContent =
            "¡YA!";

    }

    else{

        cuentaAtras.style.display =
            "none";

        clearInterval(
            intervaloCuenta
        );
    }

},1000);
socket.on(
    "actualizarJugador",
    (datos) => {
        console.log(
    "Jugador recibido:",
    datos
);

        console.log(
            "Jugador recibido:",
            datos
        );

        let jugador =
            jugadoresRemotos[
                datos.id
            ];

        if (!jugador) {

            const contenedor =
                document.createElement("div");

            contenedor.style.position =
                "absolute";

            contenedor.style.textAlign =
                "center";

            const nombre =
                document.createElement("div");

            nombre.style.color =
                "white";

            nombre.style.fontWeight =
                "bold";

            nombre.style.fontSize =
                "14px";

            const avatar =
                document.createElement("div");

            avatar.style.width =
                "30px";

            avatar.style.height =
                "30px";

            avatar.style.borderRadius =
                "50%";

            avatar.style.margin =
                "0 auto";

            contenedor.appendChild(nombre);

            contenedor.appendChild(avatar);

            mapa.appendChild(contenedor);

            jugadoresRemotos[
                datos.id
            ] = contenedor;

            jugador = contenedor;
        }

        jugador.style.left =
            datos.x + "px";

        jugador.style.top =
            datos.y + "px";

        jugador.children[0].textContent =
            datos.nombre || "Jugador";

        jugador.children[1].style.background =
            datos.color || "#3498db";
    }
);
socket.on(
    "jugadorDesconectado",
    (id) => {

        if(
            jugadoresRemotos[id]
        ){

            jugadoresRemotos[id]
            .remove();

            delete jugadoresRemotos[id];
        }
    }
);
socket.on(
    "eliminarTarea",
    (id) => {

        const tarea =
            document.getElementById(id);

        if(tarea){

            tarea.style.display =
                "none";
        }
    }
);

socket.on(
    "derrotaGlobal",
    () => {

        if(juegoTerminado){
            return;
        }

        juegoTerminado = true;

        document.body.innerHTML = `
        <div
        style="
        background:black;
        color:red;
        height:100vh;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        font-family:Arial;
        ">

            <h1>
            ⏳ TIEMPO AGOTADO
            </h1>

            <p>
            La escuela cayó en deterioro.
            </p>

            <button
            onclick="window.location.href='menu-principal.html'">
                VOLVER AL MENÚ
            </button>

        </div>
        `;
    }
);
socket.on(
    "victoriaGlobal",
    () => {

        console.log(
            "VICTORIA GLOBAL RECIBIDA"
        );

        juegoTerminado = true;

        document.body.innerHTML = `
        <div
        style="
        background:#1b5e20;
        color:white;
        height:100vh;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        font-family:Arial;
        ">

            <h1 style="font-size:70px;">
            🏆
            </h1>

            <h1>
            MISIÓN CUMPLIDA
            </h1>

            <p>
            La escuela ha sido restaurada.
            </p>

            <button
            onclick="
            window.location.href='menu-principal.html'
            ">
                VOLVER AL MENÚ
            </button>

        </div>
        `;
    }
);
socket.on(
    "salaLlena",
    () => {

        alert(
            "La sala ya tiene 5 jugadores."
        );

        window.location.href =
            "menu-principal.html";
    }
);
}
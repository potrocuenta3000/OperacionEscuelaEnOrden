// =====================
// PANTALLA PRINCIPAL
// =====================

const btnEmpezar = document.getElementById("btnEmpezar");

if (btnEmpezar) {
    btnEmpezar.addEventListener("click", () => {
        window.location.href = "pages/acceso.html";
    });
}

// =====================
// REGISTRO
// =====================

const formRegistro =
    document.getElementById("formRegistro");

if (formRegistro) {

    formRegistro.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const usuario =
                document.getElementById("usuario").value.trim();

            const personaje =
                document.getElementById("personaje").value.trim();

            const password =
                document.getElementById("password").value;

            if (
                !usuario ||
                !personaje ||
                !password
            ) {
                alert("Completa todos los campos.");
                return;
            }

            const jugador = {
                usuario,
                personaje,
                password
            };

            localStorage.setItem(
                "jugador",
                JSON.stringify(jugador)
            );

            alert("Cuenta creada correctamente.");

            window.location.href =
                "login.html";
        }
    );
}

// =====================
// LOGIN
// =====================

const formLogin =
    document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const usuario =
                document.getElementById("loginUsuario").value.trim();

            const password =
                document.getElementById("loginPassword").value;

            const jugadorGuardado =
                JSON.parse(
                    localStorage.getItem("jugador")
                );

            if (!jugadorGuardado) {

                alert(
                    "No existe ninguna cuenta registrada."
                );

                return;
            }

            if (
                usuario === jugadorGuardado.usuario &&
                password === jugadorGuardado.password
            ) {

                window.location.href =
                    "menu-principal.html";

            } else {

                alert(
                    "Usuario o contraseña incorrectos."
                );
            }
        }
    );
}

// =====================
// PERSONALIZACIÓN
// =====================

const colorPersonaje =
    document.getElementById("colorPersonaje");

const previewPersonaje =
    document.getElementById("previewPersonaje");

if (
    colorPersonaje &&
    previewPersonaje
) {

    colorPersonaje.addEventListener(
        "change",
        () => {

            previewPersonaje.style.backgroundColor =
                colorPersonaje.value;
        }
    );
}

const btnGuardarPersonaje =
    document.getElementById("btnGuardarPersonaje");

if (btnGuardarPersonaje) {

    btnGuardarPersonaje.addEventListener(
        "click",
        () => {

            const nombreVisible =
                document.getElementById("nombreVisible").value;

            const color =
                document.getElementById("colorPersonaje").value;

            localStorage.setItem(
                "personalizacion",
                JSON.stringify({
                    nombreVisible,
                    color
                })
            );

            alert(
                "Personalización guardada."
            );
        }
    );
}

// =====================
// VOLVER MENÚ
// =====================

const btnVolverMenu =
    document.getElementById("btnVolverMenu");

if (btnVolverMenu) {

    btnVolverMenu.addEventListener(
        "click",
        () => {

            window.location.href =
                "menu-principal.html";
        }
    );
}
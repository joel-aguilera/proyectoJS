const tasaNominalAnual = 150;
const tasaNominalMensual = tasaNominalAnual / 12;
const historialPrestamos = [];
const registros = [];


class Usuario {
    constructor(nombre, email, edad) {
        this.nombre = nombre;
        this.email = email;
        this.edad = edad;
    }
}

function verificarExistenciaUsuario(email) {
    return registros.some(usuario => usuario.email === email);
}

function guardarRegistros() {
    localStorage.setItem('registros', JSON.stringify(registros));
}


function cargarRegistros() {
    const registrosJSON = localStorage.getItem('registros');
    registros = registrosJSON ? JSON.parse(registrosJSON) : [];
}


function guardarHistorial() {
    localStorage.setItem('historialPrestamos', JSON.stringify(historialPrestamos));
}


function cargarHistorial() {
    const historialJSON = localStorage.getItem('historialPrestamos');
    historialPrestamos = historialJSON ? JSON.parse(historialJSON) : [];
}

function agregarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const edad = document.getElementById('edad').value;

    if (!(nombre && email && edad)) {
        mostrarMensajeSweetAlert("error", "Campos vacíos", "Por favor complete todos los datos.");
        return;
    }

    if (edad <= 18) {
        mostrarMensajeSweetAlert("error", "Edad no válida", "Debe tener 18 años o más para acceder a un prestamo")
    }
    if (verificarExistenciaUsuario(email)) {
        mostrarMensajeSweetAlert("error", "Correo electrónico duplicado", "El correo electrónico ingresado ya está registrado.");
        return;
    }

    const usuario = new Usuario(nombre, email, edad);
    registros.push(usuario);
    guardarRegistros();
    mostrarRegistrosUsuarios();
    mostrarMensajeSweetAlert("success", "Registro exitoso", "Su registro fue guardado con éxito");
}

function mostrarRegistrosUsuarios() {
    const registroUsuarios = document.getElementById('registroUsuarios');
    registroUsuarios.innerHTML = "";
    registros.forEach((usuario, index) => {
        const usuarioHTML = document.createElement('div');
        usuarioHTML.innerHTML = `
            <p><strong>Usuario ${index + 1}:</strong></p>
            <p>Nombre: ${usuario.nombre}</p>
            <p>Email: ${usuario.email}</p>
            <p>Edad: ${usuario.edad}</p>
            <hr>
        `;
        registroUsuarios.appendChild(usuarioHTML);
    });
}

function calcularCuota() {
    const monto = parseInt(document.getElementById('monto').value);
    const tiempo = parseInt(document.getElementById('tiempo').value);
    if ([1000, 5000, 10000, 20000, 50000, 100000].includes(monto) && [6, 9, 12, 18].includes(tiempo)) {
        const cuota = (monto / tiempo) + (monto * tasaNominalMensual) / 100;
        alert("Tu cuota mensual es " + cuota.toFixed(2));
        const prestamo = { monto, tiempo, cuota };
        historialPrestamos.push(prestamo);
        guardarHistorial();
        mostrarHistorialPrestamos();
        mostrarMensajeSweetAlert("success", "Préstamo realizado", "Su prestamo fue gestionado correctamente");
        return;
    }
}

function mostrarHistorialPrestamos() {
    const historial = document.getElementById('historialPrestamos');
    historial.innerHTML = "";
    historialPrestamos.forEach((prestamo, index) => {
        const prestamoHTML = document.createElement('div');
        prestamoHTML.innerHTML = `
            <p><strong>Préstamo ${index + 1}:</strong></p>
            <p>Monto: ${prestamo.monto}</p>
            <p>Tiempo: ${prestamo.tiempo}</p>
            <p>Cuota Mensual: ${prestamo.cuota.toFixed(1)}</p>
            <hr>
        `;
        historial.appendChild(prestamoHTML);
    });
}
function mostrarMensajeSweetAlert(icono, titulo, texto) {
    Swal.fire({
        icon: icono,
        title: titulo,
        text: texto,
        showConfirmButton: false,
        timer: 1500
    });
}
const contenedor = document.getElementById('principal');
const boton = document.getElementById('mode');


boton.onclick = () => {
    if (localStorage.getItem('mode') == 'dark') {
        pasarALight();
    } else {
        pasarADark();
    }
}

function pasarADark() {
    localStorage.setItem('mode', 'dark');
    boton.innerText = 'Light Mode';
    contenedor.classList.replace('light', 'dark');
    document.body.className = 'dark';
}

function pasarALight() {
    localStorage.setItem('mode', 'light');
    boton.innerText = 'Dark Mode';
    contenedor.classList.replace('dark', 'light');
    document.body.className = 'light';
}
if (localStorage.getItem('mode') == 'dark') {

    pasarADark();

} else {

    pasarALight();

}

document.getElementById('registrarUsuario').addEventListener('click', agregarUsuario);
document.getElementById('calcularCuota').addEventListener('click', calcularCuota);


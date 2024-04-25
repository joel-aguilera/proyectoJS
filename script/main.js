const tasaNominalAnual = 150;
const tasaNominalMensual = tasaNominalAnual / 12;
let historialPrestamos = [];
let registros = [];

class Usuario {
    constructor(nombre, email, edad) {
        this.nombre = nombre;
        this.email = email;
        this.edad = edad;
    }
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

    if (!nombre || !email || !edad) {
        alert("Por favor complete todos los campos.");
        return;
    }

    if (isNaN(edad) || edad <= 0) {
        alert("Por favor ingrese una edad válida.");
        return;
    }

    const usuario = new Usuario(nombre, email, edad);
    registros.push(usuario);
    guardarRegistros();
    mostrarRegistrosUsuarios();
    alert("Registro exitoso");
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
    if ((monto === 1000 || monto === 5000 || monto === 10000 || monto === 20000 || monto === 50000 || monto === 100000) && (tiempo === 6 || tiempo === 9 || tiempo === 12 || tiempo === 18)) {
        const cuota = (monto / tiempo) + (monto * tasaNominalMensual) / 100;
        alert("Tu cuota mensual es " + cuota.toFixed(1));
        const prestamo = { monto, tiempo, cuota };
        historialPrestamos.push(prestamo);
        guardarHistorial();
        mostrarHistorialPrestamos();
        alert("Préstamo registrado con éxito");
    } else {
        alert("No ingresó un número válido");
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


document.addEventListener('DOMContentLoaded', () => {
    cargarRegistros();
    cargarHistorial();
    mostrarRegistrosUsuarios();
    mostrarHistorialPrestamos();
});

document.getElementById('registrarUsuario').addEventListener('click', agregarUsuario);
document.getElementById('calcularCuota').addEventListener('click', calcularCuota);
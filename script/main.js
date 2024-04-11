const tasaNominalAnual = 150;

const tasaNominalMensual = tasaNominalAnual / 12;

const historialPrestamos = [];

const registros = [];

function calcularCuota(monto, tiempo) {

    const cuota = (monto / tiempo) + (monto * tasaNominalMensual) / 100;

    return Number(cuota.toFixed(1));

}

class Usuario {
    constructor(nombre, email, edad) {
        this.nombre = nombre;
        this.email = email;
        this.edad = edad;
    }
}

function agregarUsuario() {
    const nombre = prompt("Ingrese su nombre:");
    const email = prompt("Ingrese su email:");
    const edad = prompt("Ingrese su edad:");

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
}

const cantidadUsuarios = prompt("¿Cuántos usuarios desea registrar?");
for (let i = 0; i < cantidadUsuarios; i++) {
    agregarUsuario();
}

console.log("Registros de usuarios:");
for (let i = 0; i < registros.length; i++) {
    const usuario = registros[i];
    console.log("Usuario " + (i + 1) + ":");
    console.log("Nombre: " + usuario.nombre);
    console.log("Email: " + usuario.email);
    console.log("Edad: " + usuario.edad);
    console.log("--------------------------");
}


while (true) {

    const monto = parseInt(prompt("Ingrese cantidad a pedir: \n1.000 \n5.000 \n10.000 \n20.000 \n50.000 \n100.000"));

    const tiempo = parseInt(prompt("Ingrese cantidad de meses en los que desea devolver: \n6 \n9 \n12 \n18"));

    if ((monto == 1000 || monto == 5000 || monto == 10000 || monto == 20000 || monto == 50000 || monto == 100000) && (tiempo == 6 || tiempo == 9 || tiempo == 12 || tiempo == 18)) {

        const cuota = calcularCuota(monto, tiempo);

        alert("Tu cuota mensual es " + cuota);

        const prestamo = { monto, tiempo, cuota };

        historialPrestamos.push(prestamo);

        break;

    } else {

        alert("No ingresó un número válido");

    }

}

console.log("Historial de préstamos:");

console.log(historialPrestamos);


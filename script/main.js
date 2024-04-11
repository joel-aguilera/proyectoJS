const tasaNominalAnual = 150;

const tasaNominalMensual = tasaNominalAnual / 12;

const historialPrestamos = [];

function calcularCuota(monto, tiempo) {

const cuota = (monto / tiempo) + (monto * tasaNominalMensual) / 100;

return Number(cuota.toFixed(1));

}

while (true) {

const monto = parseInt(prompt("Ingrese cantidad a pedir: \n1.000 \n5.000 \n10.000 \n20.000 \n50.000 \n100.000"));

const tiempo = parseInt(prompt("Ingrese cantidad de meses en los que desea devolver: \n6 \n9 \n12 \n18"));

if ((monto==1000||monto==5000||monto==10000||monto==20000||monto==50000||monto==100000)&&(tiempo==6||tiempo==9||tiempo==12||tiempo==18)){

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
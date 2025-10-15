cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

movimientos = [
    { numeroCuenta: "02234567", monto: 10.24, tipo: "D" },
    { numeroCuenta: "02345211", monto: 45.90, tipo: "D" },
    { numeroCuenta: "02234567", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 12.0, tipo: "D" },
]
//mostar Divs
mostrarOpcionTransaciones = function () {

    ocultarComponente("divCuentas");
    mostrarComponente("divTransacciones");
    ocultarComponente("divMovimientos");
    let divTrans = document.getElementById("divTransacciones");
    if (!divTrans) return;

    let botones = divTrans.querySelectorAll("input[type='button']");
    for (let i = 0; i < botones.length; i++) {
        let b = botones[i];
        if (b.value === "BUSCAR") {
            b.onclick = ejecutarBusqueda;
        } else if (b.value === "DEPOSITAR") {
            b.onclick = ejecutarDeposito;
        } else if (b.value === "RETIRAR") {
            b.onclick = ejecutarRetiro;
        }
    }



}
mostrarOpcionCuentas = function () {

    ocultarComponente("divTransacciones");
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    mostrarCuentas();




}

mostrarOpcionMovimientos = function () {

    ocultarComponente("divCuentas");
    mostrarComponente("divMovimientos");
    ocultarComponente("divTransacciones");



}


//cuentas


mostrarCuentas = function () {
    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
    let cmpTabla = document.getElementById("tablaCuentas");
    let cuentasTabla = "<table><tr>" + "<th>NUMERO CUENTA</th>" + "<th>NOMBRE</th>" + "<th>SALDO</th></tr>";
    let elementoCuentas;
    for (let i = 0; i < cuentas.length; i++) {
        elementoCuentas = cuentas[i];
        cuentasTabla += "<tr><td>" + elementoCuentas.numeroCuenta + "</td>" + "<td>" + elementoCuentas.nombre + " " + elementoCuentas.apellido + "</td>" + "<td>" + elementoCuentas.saldo + "</td></tr>";
    }
    cuentasTabla += "</table>"
    cmpTabla.innerHTML = cuentasTabla
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
    let cuentaEncontrada = null;
    let elementoCuenta
    for (let i = 0; i < cuentas.length; i++) {
        elementoCuenta = cuentas[i];
        if (elementoCuenta.numeroCuenta == numeroCuenta) {
            cuentaEncontrada = elementoCuenta;
            break;
        }
    }
    return cuentaEncontrada;
}

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
agregarCuenta = function (cuenta) {
    //Si ya existe mostrar un alert CUENTA EXISTENTE
    //Si se agrega, mostrar un alert CUENTA AGREGADA
    let cuentaExistente = buscarCuenta(cuenta.numeroCuenta);
    if (cuentaExistente == null) {
        cuentas.push(cuenta)
        alert("CUENTA AGREGADA");
    } else {
        alert("CUENTA EXISTENTE");
    }

}

agregar = function () {
    //Toma los valores de las cajas de texto, sin validaciones
    //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    //Invoca a agregarCuenta
    //Invoca a mostrarCuentas

    let valorCedula = recuperarTexto("txtCedula");
    let valorNombre = recuperarTexto("txtNombre");
    let valorApellido = recuperarTexto("txtApellido");
    let valorCuenta = recuperarTexto("txtCuenta");

    let cuenta = {};

    cuenta.cedula = valorCedula;
    cuenta.nombre = valorNombre;
    cuenta.apellido = valorApellido;
    cuenta.numeroCuenta = valorCuenta;
    cuenta.saldo = 0;

    agregarCuenta(cuenta);
    mostrarCuentas();
}


//Transacciones
mostrarEnPantallaTransacciones = function (mensaje) {
    let divTrans = document.getElementById("divTransacciones");
    if (!divTrans) return;
    let zona = divTrans.querySelector(".resultadoTrans");
    if (!zona) {
        zona = document.createElement("div");
        zona.className = "resultadoTrans";
        zona.style.marginTop = "10px";
        zona.style.padding = "6px";
        zona.style.border = "1px solid #ccc";
        zona.style.background = "#fafafa";
        divTrans.appendChild(zona);
    }
    zona.innerText = mensaje;
}


buscarCuenta = function (numeroCuenta) {
    for (let i = 0; i < cuentas.length; i++) {
        let c = cuentas[i];
        if (c.numeroCuenta === numeroCuenta) {
            return c;
        }
    }
    return null;

}

ejecutarBusqueda = function () {
    let divTrans = document.getElementById("divTransacciones");
    if (!divTrans) return;

    let cajas = divTrans.querySelectorAll(".caja");
    if (cajas.length < 1) {
        alert("No se encontro la caja de numero de cuenta");
        return;
    }

    let numero = cajas[0].value.trim();
    if (numero === "") {
        alert("Inegrese un numero de cuenta");
        return;
    }

    let resultado = buscarCuenta(numero);
    if (resultado !== null) {
        let msg = "Cuenta encontrada:\n" +
            "Numero :" + resultado.numeroCuenta + "\n" +
            "Titular :" + resultado.nombre + " " + resultado.apellido + "\n" +
            "Saldo :" + resultado.saldo.toFixed(2);

        mostrarEnPantallaTransacciones(msg);

    } else {
        alert("cuenta no existe");
        mostrarEnPantallaTransacciones("cuenta no existe :" + numero);
    }
}

depositar = function (numeroCuenta, monto) {
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    if (cuentaAfectada === null) {
        alert("cuenta no encontrada");
        return false;
    }

    let m = parseFloat(monto);
    if (isNaN(m) || m <= 0) {
        alert("Monto invalido. Ingrese un numero mayor a 0");
        return false;
    }
    cuentaAfectada.saldo = cuentaAfectada.saldo + m;
    return true;


}

ejecutarDeposito = function () {
    let divTrans = document.getElementById("divTransacciones");
    let movimiento = {};
    if (!divTrans) return;

    let cajas = divTrans.querySelectorAll(".caja");
    if (cajas.length < 2) {
        alert("Falta campos (cuenta/monto).");
        return;
    }
    let numero = cajas[0].value.trim();
    let monto = cajas[1].value.trim();

    if (numero === "" || monto === "") {
        alert("Complete numero de cuenta y monto");
        return;
    }

    let ok = depositar(numero, monto);
    if (ok) {
        let cuenta = buscarCuenta(numero);
        alert("TRANSACCION EXITOSA");
        movimiento.numeroCuenta = numero;
        movimiento.monto = monto;
        movimiento.tipo = "C";
        movimientos.push(movimiento);
        mostrarEnPantallaTransacciones("Deposito relizado. Nuevo saldo de " + numero + ": " + cuenta.saldo.toFixed(2));


    }
}


retirar = function (numeroCuenta, monto) {
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    if (cuentaAfectada === null) {
        alert("Cuenta no encontrada");
        return false;
    }
    let m = parseFloat(monto);
    if (isNaN(m) || m <= 0) {
        alert("Monto inválido. Ingrese un número mayor a 0.");
        return false;
    }

    if (cuentaAfectada.saldo >= m) {
        cuentaAfectada.saldo = cuentaAfectada.saldo - m;
        return true;
    } else {
        alert("SALDO INSUFICIENTE");
        return false;
    }
}

ejecutarRetiro = function () {
    let divTrans = document.getElementById("divTransacciones");
    let movimiento= {};
    if (!divTrans) return;

    let cajas = divTrans.querySelectorAll(".caja");
    if (cajas.length < 2) {
        alert("Faltan campos (cuenta/monto).");
        return;
    }

    let numero = cajas[0].value.trim();
    let monto = cajas[1].value.trim();

    if (numero === "" || monto === "") {
        alert("Complete número de cuenta y monto.");
        return;
    }

    let ok = retirar(numero, monto);
    if (ok) {
        let cuenta = buscarCuenta(numero);
        alert("TRANSACCIÓN EXITOSA");
         movimiento.numeroCuenta = numero;
        movimiento.monto = monto;
        movimiento.tipo = "D";
        movimientos.push(movimiento);
        mostrarEnPantallaTransacciones("Retiro realizado. Nuevo saldo de " + numero + ": " + cuenta.saldo.toFixed(2));
    }
}

//Movimientos
verMovimientos = function () {
    let numeroCuenta = recuperarTexto("numeroCuenta");
    filtrarMovimientos(numeroCuenta);

}

filtrarMovimientos = function (numeroCuenta) {
    let movimientosCuenta = [];
    //Se barre el arreglo de movimientos
    //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
    //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
    //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
    let movimientoEncontrado;
    for (let i = 0; i < movimientos.length; i++) {
        movimientoEncontrado = movimientos[i];
        if (movimientoEncontrado.numeroCuenta == numeroCuenta) {
            movimientosCuenta.push(movimientoEncontrado);
        }
    }

    mostrarMovimientos(movimientosCuenta);

}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos = function (misMovimientos) {
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    //Columnas: NUMERO CUENTA, MONTO, TIPO
    //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
    //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
    //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
    let generarTabla = "<table><tr> <th>CUENTA</th> <th>MONTO</th> <th>OPERACION</th></tr>"
    let movimientoEncontrado;
    let montoModificado = 0;
    let componenteTabla = document.getElementById("tablaMovimientos");
    for (let i = 0; i < misMovimientos.length; i++) {
        movimientoEncontrado = misMovimientos[i];
        generarTabla += "<tr> <td>" + movimientoEncontrado.numeroCuenta + "</td>";

        if (movimientoEncontrado.tipo == "D") {

            montoModificado = movimientoEncontrado.monto * -1;
            generarTabla += "<td>" + montoModificado + "</td>"
                + "<td>" + movimientoEncontrado.tipo + "</td></tr>";
        } else if (movimientoEncontrado.tipo == "C") {
            generarTabla += "<td>" + movimientoEncontrado.monto + "</td>"
                + "<td>" + movimientoEncontrado.tipo + "</td></tr>";
        }
    }
    generarTabla += "</table>"
    componenteTabla.innerHTML = generarTabla;
}


/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/

//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte


//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos

//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos



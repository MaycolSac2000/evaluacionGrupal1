cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

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

cargar=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
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
    


buscarCuenta=function(numeroCuenta){
    for(let i =0; i<cuentas.length;i++){
        let c = cuentas[i];
        if(c.numeroCuenta===numeroCuenta){
            return c;
        }
    }
    return null;

}

ejecutarBusqueda=function(){
    let divTrans = document.getElementById("divTransacciones");
    if(!divTrans) return;

    let cajas = divTrans.querySelectorAll(".caja");
    if(cajas.length <1){
        alert("No se encontro la caja de numero de cuenta");
        return;
    }

    let numero = cajas[0].value.trim();
    if(numero=== ""){
        alert("Inegrese un numero de cuenta");
        return;
    }

    let resultado = buscarCuenta(numero);
    if (resultado !== null){
        let msg = "Cuenta encontrada:\n" +
        "Numero :" + resultado.numeroCuenta+"\n"+
        "Titular :" + resultado.nombre+ " " +resultado.apellido + "\n" +
        "Saldo :" + resultado.saldo.toFixed(2); 

        mostrarEnPantallaTransacciones(msg);

    }else{
        alert("cuenta no existe");
        mostrarEnPantallaTransacciones("cuenta no existe :" +numero);
    }
}

depositar=function(numeroCuenta,monto){
    let cuentaAfectada = buscarCuenta ( numeroCuenta);
    if (cuentaAfectada === null){
        alert("cuenta no encontrada");
        return false;
    }

    let m = parseFloat(monto);
    if (isNaN(m) || m<=0){
        alert ("Monto invalido. Ingrese un numero mayor a 0");
        return false;
    }
    cuentaAfectada.saldo=cuentaAfectada.saldo + m;
    return true;

    
}

ejecutarDeposito=function(){
    let divTrans = document.getElementById("divTransacciones");
    if (!divTrans) return;

    let cajas = divTrans.querySelectorAll(".caja");
    if (cajas.length <2){
        alert("Falta campos (cuenta/monto).");
        return;
    }
    let numero = cajas [0].value.trim();
    let monto = cajas[1].value.trim();

    if ( numero==="" || monto === ""){
        alert("Complete numero de cuenta y monto");
        return;
    }

    let ok = depositar(numero,monto);
    if (ok){
        let cuenta = buscarCuenta(numero);
        alert("TRANSACCION EXITOSA");
        mostrarEnPantallaTransacciones("Deposito relizado. Nuevo saldo de " + numero + ": " + cuenta.saldo.toFixed(2));

    }
}


retirar=function(numeroCuenta,monto){
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    if (cuentaAfectada ===  null){
        alert("Cuenta no encontrada");
        return false ;
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
        mostrarEnPantallaTransacciones("Retiro realizado. Nuevo saldo de " + numero + ": " + cuenta.saldo.toFixed(2));
    }
}
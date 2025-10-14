movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

cargar=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    
}

verMovimientos =function (){
    let numeroCuenta = recuperarTexto("numeroCuenta");
    filtrarMovimientos(numeroCuenta);

}

filtrarMovimientos=function(numeroCuenta){
    let movimientosCuenta=[];
    //Se barre el arreglo de movimientos
    //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
    //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
    //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
    let  movimientoEncontrado;
    for(let i=0; i<movimientos.length;i++){
        movimientoEncontrado = movimientos[i];
        if(movimientoEncontrado.numeroCuenta ==numeroCuenta ){
            movimientosCuenta.push(movimientoEncontrado);
        }
    }

    mostrarMovimientos(movimientosCuenta);

}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos=function(misMovimientos){
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    //Columnas: NUMERO CUENTA, MONTO, TIPO
    //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
    //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
    //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)

    let generarTabla = "<table><tr> <th>CUENTA</th> <th>MONTO</th> <th>OPERACION</th></tr>"
    let movimientoEncontrado;
    let componenteTabla = document.getElementById("tablaMovimientos");
    for(let i =0; i<misMovimientos.length;i++){
        movimientoEncontrado = misMovimientos[i];
        generarTabla += "<tr> <td>"+movimientoEncontrado.numeroCuenta+"</td>" 
        + "<td>"+movimientoEncontrado.monto+"</td>"
        + "<td>"+movimientoEncontrado.tipo+"</td></tr>"
    }

    generarTabla+= "</table>"
    componenteTabla.innerHTML = generarTabla;


    
}





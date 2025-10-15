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

filtrarMovimientos=function(numeroCuenta){
    let movimientosCuenta=[];
    //Se barre el arreglo de movimientos
    for (let i = 0; i <numeroCuenta.lengt;i++){
        let mov = movimientos[i];
        if(mov.numeroCuenta === numeroCuenta){
            movimientosCuenta.push(mov);
        }

    }

    mostrarMovimientos(movimientosCuenta);
}

mostrarMovimientos=function(misMovimientos){
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    //Columnas: NUMERO CUENTA, MONTO, TIPO
    //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
    //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
    //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
}





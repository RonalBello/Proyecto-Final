function cargarDatos() {
    transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");

    tabla = document.getElementById("tablaDeMovimientos");

    tabla.innerHTML = "";

    for (let i = 0; i < transacciones.length; i++) {

        fila = document.createElement("tr");

        celdaInformacion = document.createElement("td");

        celdaInformacion.innerHTML = transacciones[i].tipo.toUpperCase() + " : " + transacciones[i].valor + " COP";
        celdaInformacion.classList.add("tdInformacion")

        celdaFecha = document.createElement("td");
        celdaFecha.innerHTML = transacciones[i].fecha;
        celdaFecha.classList.add("tdFecha")

        fila.appendChild(celdaInformacion);
        fila.appendChild(celdaFecha);

        tabla.appendChild(fila);
    }
}
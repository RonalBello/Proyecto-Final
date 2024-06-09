idTemporal = 0;

function guardar() {
  transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");
  cuentasBancarias = JSON.parse(localStorage.getItem("cuentasBancarias") || "[]");

  tipoTransaccion = document.getElementById("tipoTransaccion");
  tipoEgresoOIngreso = document.getElementById("tipoEgresoOIngreso");
  valorTransaccion = document.getElementById("valorTransaccion");
  cuentaBancaria = document.getElementById("cuentaBancaria");
  fechaTransaccion = document.getElementById("fechaTransaccion");
  descripcion = document.getElementById("descripcion");
  archivoAdjunto = document.getElementById("archivoAdjunto");

  for (let i = 0; i < cuentasBancarias.length; i++) {
    if (cuentasBancarias[i].numero == cuentaBancaria.value) {
      if (tipoTransaccion.value == "egreso") {
        if (cuentasBancarias[i].saldoActual < valorTransaccion.value) {
          alert(
            "El saldo actual de la cuenta es insuficiente para realizar la transacción"
          );
          return;
        } else {
          cuentasBancarias[i].saldoActual -= valorTransaccion.value;
        }
      } else if (tipoTransaccion.value == "ingreso") {
        cuentasBancarias[i].saldoActual += Number(valorTransaccion.value);
      }
    }
  }

  if (
    tipoTransaccion.value === "" ||
    tipoEgresoOIngreso.value === "" ||
    valorTransaccion.value === "" ||
    cuentaBancaria.value === "" ||
    fechaTransaccion.value === ""
  ) {
    alert("Por favor, llene todos los campos");
    return;
  }

  let existe = transacciones.findIndex(
    (transaccion) => transaccion.id == idTemporal
  );

  if (existe !== -1) {
    actualizar(idTemporal);
  } else {
    identificadorDeTransaccion = Date.now();

    transaccion = new Transaccion(
      identificadorDeTransaccion,
      tipoTransaccion.value,
      tipoEgresoOIngreso.value,
      valorTransaccion.value,
      cuentaBancaria.value,
      fechaTransaccion.value,
      descripcion.value,
      archivoAdjunto.value
    );

    transacciones.push(transaccion);

    localStorage.setItem("transacciones", JSON.stringify(transacciones));

    cargarTabla();
    nuevo();
  }

 localStorage.setItem("cuentasBancarias", JSON.stringify(cuentasBancarias));

  cargarTabla();
  idTemporal = 0;
}

function actualizar(id) {
  transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");

  tipoTransaccion = document.getElementById("tipoTransaccion");
  tipoEgresoOIngreso = document.getElementById("tipoEgresoOIngreso");
  valorTransaccion = document.getElementById("valorTransaccion");
  cuentaBancaria = document.getElementById("cuentaBancaria");
  fechaTransaccion = document.getElementById("fechaTransaccion");
  descripcion = document.getElementById("descripcion");
  archivoAdjunto = document.getElementById("archivoAdjunto");

  for (let i = 0; i < transacciones.length; i++) {
    if (transacciones[i].id == id) {
      transacciones[i].tipo = tipoTransaccion.value;
      transacciones[i].tipoAsociado = tipoEgresoOIngreso.value;
      transacciones[i].valor = valorTransaccion.value;
      transacciones[i].cuentaRelacionada = cuentaBancaria.value;
      transacciones[i].fecha = fechaTransaccion.value;
      transacciones[i].descripcion = descripcion.value;
      transacciones[i].archivo = archivoAdjunto.value;
      break;
    }
  }

  localStorage.setItem("transacciones", JSON.stringify(transacciones));

  cargarTabla();
  nuevo();
}

function cargarTabla() {
  transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");

  tabla = document.getElementById("tablaDeTransacciones");

  tabla.innerHTML = "";

  for (let i = 0; i < transacciones.length; i++) {
    fila = document.createElement("tr");

    id = document.createElement("td");
    id.innerHTML = transacciones[i].id;
    id.classList.add("ocultar");

    datosAMostar = document.createElement("td");
    datosAMostar.innerText = transacciones[i].tipo.toUpperCase() + " : " +
      transacciones[i].tipoAsociado +
      " : " +
      
      
      transacciones[i].valor;
    datosAMostar.classList.add("tdInformacion");

    celdaAcciones = document.createElement("td");
    celdaAcciones = document.createElement("td");
    celdaAcciones.classList.add("tdBotones");
    botonActualizar = document.createElement("button");
    botonActualizar.textContent = "Actualizar";
    botonActualizar.addEventListener("click", mostrarDatos);

    botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", eliminar);

    celdaAcciones.appendChild(botonActualizar);
    celdaAcciones.appendChild(botonEliminar);

    fila.appendChild(id);
    fila.appendChild(datosAMostar);
    fila.appendChild(celdaAcciones);

    tabla.appendChild(fila);
  }
}

function mostrarDatos() {
  transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");

  id = this.parentNode.parentNode.children[0].textContent;

  for (let i = 0; i < transacciones.length; i++) {
    if (transacciones[i].id == id) {
      tipoTransaccion = document.getElementById("tipoTransaccion");
      tipoEgresoOIngreso = document.getElementById("tipoEgresoOIngreso");
      valorTransaccion = document.getElementById("valorTransaccion");
      cuentaBancaria = document.getElementById("cuentaBancaria");
      fechaTransaccion = document.getElementById("fechaTransaccion");
      descripcion = document.getElementById("descripcion");
      archivoAdjunto = document.getElementById("archivoAdjunto");

      tipoTransaccion.value = transacciones[i].tipo;
      tipoEgresoOIngreso.value = transacciones[i].tipoAsociado;
      valorTransaccion.value = transacciones[i].valor;
      cuentaBancaria.value = transacciones[i].cuentaRelacionada;
      fechaTransaccion.value = transacciones[i].fecha;
      descripcion.value = transacciones[i].descripcion;
      archivoAdjunto.value = transacciones[i].archivo;
      break;
    }
  }
  idTemporal = id;
}

function eliminar() {
  transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");

  id = this.parentNode.parentNode.children[0].textContent;

  for (let i = 0; i < transacciones.length; i++) {
    if (transacciones[i].id == id) {
      transacciones.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("transacciones", JSON.stringify(transacciones));

  cargarTabla();
  nuevo();
}

function nuevo() {
  tipoTransaccion = document.getElementById("tipoTransaccion");
  tipoEgresoOIngreso = document.getElementById("tipoEgresoOIngreso");
  valorTransaccion = document.getElementById("valorTransaccion");
  cuentaBancaria = document.getElementById("cuentaBancaria");
  fechaTransaccion = document.getElementById("fechaTransaccion");
  descripcion = document.getElementById("descripcion");
  archivoAdjunto = document.getElementById("archivoAdjunto");
  labelDelArchivo = document.getElementById("labelDelArchivo");

  labelDelArchivo.innerHTML = "Cargar";

  tipoTransaccion.value = "";
  tipoEgresoOIngreso.value = "";
  valorTransaccion.value = "";
  cuentaBancaria.value = "";
  fechaTransaccion.value = "";
  descripcion.value = "";
  archivoAdjunto.value = "";

  tipoTransaccion.focus();
}

function borrarDatos() {
  localStorage.removeItem("transacciones");
}

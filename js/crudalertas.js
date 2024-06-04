idTemporal = 0;

function guardar() {
  alertas = JSON.parse(localStorage.getItem("alertas") || "[]");

  tipoAlerta = document.getElementById("tipoAlerta");
  descripcion = document.getElementById("descripcion");
  fecha = document.getElementById("fecha");
  hora = document.getElementById("hora");
  opcionesRepetciones = document.getElementById("opcionesRepetciones");

  let existe = alertas.findIndex((alerta) => alerta.id == idTemporal);

  if (existe !== -1) {
    actualizar(idTemporal);
  } else {
    id = Date.now();

    alerta = new Alerta(
      id,
      tipoAlerta.value,
      descripcion.value,
      fecha.value,
      hora.value,
      opcionesRepetciones.value
    );

    alertas.push(alerta);

    localStorage.setItem("alertas", JSON.stringify(alertas));

    console.log(alertas);
    nuevo();
    cargarTabla();
  }
  cargarTabla();
  idTemporal = 0;
}

function actualizar(id) {
  alertas = JSON.parse(localStorage.getItem("alertas") || "[]");

  tipoAlerta = document.getElementById("tipoAlerta");
  descripcion = document.getElementById("descripcion");
  fecha = document.getElementById("fecha");
  hora = document.getElementById("hora");
  opcionesRepetciones = document.getElementById("opcionesRepetciones");

  for (let i = 0; i < alertas.length; i++) {
    if (alertas[i].id == id) {
      alertas[i].tipoAlerta = tipoAlerta.value;
      alertas[i].descripcion = descripcion.value;
      alertas[i].fecha = fecha.value;
      alertas[i].hora = hora.value;
      alertas[i].opcionesRepetciones = opcionesRepetciones.value;
      break;
    }
  }

  localStorage.setItem("alertas", JSON.stringify(alertas));

  console.log(alertas);

  cargarTabla();
  nuevo();
}

function cargarTabla() {
  alertas = JSON.parse(localStorage.getItem("alertas") || "[]");

  tabla = document.getElementById("tablaDeAlertas");

  tabla.innerHTML = "";

  for (let i = 0; i < alertas.length; i++) {
    fila = document.createElement("tr");

    id = document.createElement("td");
    id.innerHTML = alertas[i].id;
    id.classList.add("ocultar");

    tipoAlerta = document.createElement("td");
    tipoAlerta.innerHTML =
      alertas[i].tipoAlerta +
      " : " +
      alertas[i].fecha +
      " : " +
      alertas[i].hora;
    tipoAlerta.classList.add("alerta");

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
    fila.appendChild(tipoAlerta);
    fila.appendChild(celdaAcciones);

    tabla.appendChild(fila);
  }
}

function mostrarDatos() {
  alertas = JSON.parse(localStorage.getItem("alertas") || "[]");

  fila = this.parentNode.parentNode;
  id = fila.getElementsByTagName("td")[0].innerHTML;

  for (let i = 0; i < alertas.length; i++) {
    if (alertas[i].id == id) {
      document.getElementById("tipoAlerta").value = alertas[i].tipoAlerta;
      document.getElementById("descripcion").value = alertas[i].descripcion;
      document.getElementById("fecha").value = alertas[i].fecha;
      document.getElementById("hora").value = alertas[i].hora;
      document.getElementById("opcionesRepetciones").value =
        alertas[i].opcionesRepetciones;
      break;
    }
  }
  idTemporal = id;
}

function eliminar() {
  alertas = JSON.parse(localStorage.getItem("alertas") || "[]");

  fila = this.parentNode.parentNode;
  id = fila.getElementsByTagName("td")[0].innerHTML;

  for (let i = 0; i < alertas.length; i++) {
    if (alertas[i].id == id) {
      alertas.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("alertas", JSON.stringify(alertas));

  cargarTabla();
  nuevo();
}

function nuevo() {
  document.getElementById("tipoAlerta").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("hora").value = "";
  document.getElementById("opcionesRepetciones").value = "";

  document.getElementById("tipoAlerta").focus();
}

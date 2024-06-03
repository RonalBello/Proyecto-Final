function guardar() {
  tipoIngresoOEgresos = JSON.parse(
    localStorage.getItem("tipoIngresoOEgresos") || "[]"
  );

  codigo = document.getElementById("codigo");
  nombre = document.getElementById("nombreTipo");
  descripcion = document.getElementById("descripcion");
  tipo = document.getElementById("tipo");
  categoria = document.getElementById("categoria");

  if (codigo.value === "" || nombre.value === "" || tipo.value === "" || categoria.value === "") {
    alert("Por favor, llene todos los campos.");
    return;
  }

  let existe = tipoIngresoOEgresos.findIndex(
    (item) => item.codigo === codigo.value
  );

  if (existe !== -1) {
    actualizar(codigo);
  } else {
    ingresoOEgreso = new IngresoOEgreso(
      codigo.value,
      nombre.value,
      descripcion.value,
      tipo.value,
      categoria.value
    );

    tipoIngresoOEgresos.push(ingresoOEgreso);

    localStorage.setItem(
      "tipoIngresoOEgresos",
      JSON.stringify(tipoIngresoOEgresos)
    );

    console.log(tipoIngresoOEgresos);

    nuevo();
    cargarTabla();
  }
  cargarTabla();
}

function cargarTabla() {
  tipoIngresoOEgresos = JSON.parse(
    localStorage.getItem("tipoIngresoOEgresos") || "[]"
  );

  tabla = document.getElementById("tablaDeIngresosYEgresos");

  tabla.innerHTML = "";

  for (let i = 0; i < tipoIngresoOEgresos.length; i++) {
    fila = document.createElement("tr");
    columnaCodigo = document.createElement("td");
    columnaCodigo.classList.add("tdCodigo");
    columnaCodigo.innerText = tipoIngresoOEgresos[i].codigo;
    columnaNombre = document.createElement("td");
    columnaNombre.classList.add("tdNombreIngreso");
    columnaNombre.innerText = tipoIngresoOEgresos[i].nombre;
    columnaAcciones = document.createElement("td");
    columnaAcciones.classList.add("tdBotones");
    botonActualizar = document.createElement("button");
    botonActualizar.textContent = "Actualizar";
    botonActualizar.addEventListener("click", mostrarDatos);
    botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", eliminar);

    columnaAcciones.appendChild(botonActualizar);
    columnaAcciones.appendChild(botonEliminar);

    fila.appendChild(columnaCodigo);
    fila.appendChild(columnaNombre);
    fila.appendChild(columnaAcciones);

    tabla.appendChild(fila);
  }
}

function actualizar(codigo) {
  tipoIngresoOEgresos = JSON.parse(
    localStorage.getItem("tipoIngresoOEgresos") || "[]"
  );

  nombre = document.getElementById("nombreTipo");
  descripcion = document.getElementById("descripcion");
  tipo = document.getElementById("tipo");
  categoria = document.getElementById("categoria");

  for (let i = 0; i < tipoIngresoOEgresos.length; i++) {
    if (tipoIngresoOEgresos[i].codigo == codigo.value) {
      tipoIngresoOEgresos[i].nombre = nombre.value;
      tipoIngresoOEgresos[i].descripcion = descripcion.value;
      tipoIngresoOEgresos[i].tipo = tipo.value;
      tipoIngresoOEgresos[i].categoria = categoria.value;

      break;
    }
  }

  localStorage.setItem(
    "tipoIngresoOEgresos",
    JSON.stringify(tipoIngresoOEgresos)
  );

  nuevo();

  console.log(tipoIngresoOEgresos);
}

function mostrarDatos() {
  let codigo = null;
  let nombre = null;
  let descripcion = null;
  let tipo = null;
  let categoria = null;
  let codigoAMostrar = null;

  tipoIngresoOEgresos = JSON.parse(
    localStorage.getItem("tipoIngresoOEgresos") || "[]"
  );

  nombre = document.getElementById("nombreTipo");
  descripcion = document.getElementById("descripcion");
  tipo = document.getElementById("tipo");
  categoria = document.getElementById("categoria");
  codigoAMostrar = document.getElementById("codigo");

  codigo = this.parentNode.parentNode.children[0].textContent;

  for (let i = 0; i < tipoIngresoOEgresos.length; i++) {
    if (tipoIngresoOEgresos[i].codigo == codigo) {
      codigoAMostrar.value = codigo;
      nombre.value = tipoIngresoOEgresos[i].nombre;
      descripcion.value = tipoIngresoOEgresos[i].descripcion;
      tipo.value = tipoIngresoOEgresos[i].tipo;
      categoria.value = tipoIngresoOEgresos[i].categoria;
      break;
    }
  }
}

function eliminar() {
  tipoIngresoOEgresos = JSON.parse(
    localStorage.getItem("tipoIngresoOEgresos") || "[]"
  );

  codigo = this.parentNode.parentNode.children[0].textContent;

  for (let i = 0; i < tipoIngresoOEgresos.length; i++) {
    if (tipoIngresoOEgresos[i].codigo == codigo) {
      tipoIngresoOEgresos.splice(i, 1);

      break;
    }
  }

  localStorage.setItem(
    "tipoIngresoOEgresos",
    JSON.stringify(tipoIngresoOEgresos)
  );

  cargarTabla();
  console.log(tipoIngresoOEgresos);
}

function nuevo() {
  codigo = document.getElementById("codigo");
  nombre = document.getElementById("nombreTipo");
  descripcion = document.getElementById("descripcion");
  tipo = document.getElementById("tipo");
  categoria = document.getElementById("categoria");

  codigo.value = "";
  nombre.value = "";
  descripcion.value = "";
  tipo.value = "";
  categoria.value = "";

  codigo.focus();
}

function borrarDatos() {
  localStorage.removeItem("tipoIngresoOEgresos");
  cargarTabla();
}

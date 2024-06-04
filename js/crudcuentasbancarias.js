function guardar() {
    cuentasBancarias = JSON.parse(
        localStorage.getItem("cuentasBancarias") || "[]"
    );

    numeroCuenta = document.getElementById("numeroCuenta");
    nombreBanco = document.getElementById("nombreBanco");
    tipoCuenta = document.getElementById("tipoCuenta");
    saldoActual = document.getElementById("saldoActual");
    estadoCuenta = document.getElementById("estadoCuenta");
    fechaApertura = document.getElementById("fecha");
    descripcion = document.getElementById("descripcion");

    if (
        numeroCuenta.value === "" ||
        nombreBanco.value === "" ||
        tipoCuenta.value === "" ||
        saldoActual.value === "" ||
        estadoCuenta.value === ""
    ) {
        alert("Todos los campos son obligatorios");
        return;
    }

    let existe = cuentasBancarias.findIndex(
        (item) => item.numero === numeroCuenta.value
    );

    if (existe !== -1) {
        actualizar(numeroCuenta);
    } else {
        cuentaBancaria = new CuentaBancaria(
            numeroCuenta.value,
            nombreBanco.value,
            tipoCuenta.value,
            saldoActual.value,
            estadoCuenta.value,
            fechaApertura.value,
            descripcion.value
        );

        cuentasBancarias.push(cuentaBancaria);

        localStorage.setItem("cuentasBancarias", JSON.stringify(cuentasBancarias));

        console.log(cuentasBancarias);

        cargarTabla();
        nuevo();
    }
    cargarTabla();
}

function actualizar(numeroCuenta) {
  cuentasBancarias = JSON.parse(
    localStorage.getItem("cuentasBancarias") || "[]"
  );

  numeroCuenta = document.getElementById("numeroCuenta");
  nombreBanco = document.getElementById("nombreBanco");
  tipoCuenta = document.getElementById("tipoCuenta");
  saldoActual = document.getElementById("saldoActual");
  estadoCuenta = document.getElementById("estadoCuenta");
  fechaApertura = document.getElementById("fecha");
  descripcion = document.getElementById("descripcion");

  for (let i = 0; i < cuentasBancarias.length; i++) {
    if (cuentasBancarias[i].numero == numeroCuenta.value) {
      cuentasBancarias[i].nombreBanco = nombreBanco.value;
      cuentasBancarias[i].tipoCuenta = tipoCuenta.value;
      cuentasBancarias[i].saldoActual = saldoActual.value;
      cuentasBancarias[i].estadoCuenta = estadoCuenta.value;
      cuentasBancarias[i].fecha = fechaApertura.value;
      cuentasBancarias[i].descripcion = descripcion.value;
      break;
    }
  }

  localStorage.setItem("cuentasBancarias", JSON.stringify(cuentasBancarias));

  console.log(cuentasBancarias);

  cargarTabla();
  nuevo();
}

function cargarTabla() {
  cuentasBancarias = JSON.parse(
    localStorage.getItem("cuentasBancarias") || "[]"
  );

  tabla = document.getElementById("tablaDeCuentas");

  tabla.innerHTML = "";

  for (let i = 0; i < cuentasBancarias.length; i++) {
    fila = document.createElement("tr");

    celdaNumeroCuentaAUsar = document.createElement("td");
    celdaNumeroCuentaAUsar.textContent = cuentasBancarias[i].numero;
    celdaNumeroCuentaAUsar.classList.add("numeroCuenta");
    fila.appendChild(celdaNumeroCuentaAUsar);
    celdaNumeroCuentayNombreBanco = document.createElement("td");
    celdaNumeroCuentayNombreBanco.innerText =
      cuentasBancarias[i].numero + " : " + cuentasBancarias[i].nombreBanco;
    celdaNumeroCuentayNombreBanco.classList.add("tdNombreYNumero");
    fila.appendChild(celdaNumeroCuentayNombreBanco);

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

    fila.appendChild(celdaAcciones);

    tabla.appendChild(fila);
  }
}

function mostrarDatos() {
  cuentaBancaria = JSON.parse(localStorage.getItem("cuentasBancarias") || "[]");

  numeroCeunta = this.parentNode.parentNode.children[0].textContent;

  for (let i = 0; i < cuentasBancarias.length; i++) {
    if (cuentasBancarias[i].numero == numeroCeunta) {
      numeroCuenta = document.getElementById("numeroCuenta");
      nombreBanco = document.getElementById("nombreBanco");
      tipoCuenta = document.getElementById("tipoCuenta");
      saldoActual = document.getElementById("saldoActual");
      estadoCuenta = document.getElementById("estadoCuenta");
      fechaApertura = document.getElementById("fecha");
      descripcion = document.getElementById("descripcion");

      numeroCuenta.value = cuentasBancarias[i].numero;
      nombreBanco.value = cuentasBancarias[i].nombreBanco;
      tipoCuenta.value = cuentasBancarias[i].tipoCuenta;
      saldoActual.value = cuentasBancarias[i].saldoActual;
      estadoCuenta.value = cuentasBancarias[i].estadoCuenta;
      fechaApertura.value = new Date(cuentasBancarias[i].fecha)
        .toISOString()
        .split("T")[0];
      descripcion.value = cuentasBancarias[i].descripcion;
      break;
    }
  }
}

function eliminar() {
  cuentaBancaria = JSON.parse(localStorage.getItem("cuentasBancarias") || "[]");

  numeroCeunta = this.parentNode.parentNode.children[0].textContent;

  for (let i = 0; i < cuentasBancarias.length; i++) {
    if (cuentasBancarias[i].numero == numeroCeunta) {
      cuentasBancarias.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("cuentasBancarias", JSON.stringify(cuentasBancarias));

  nuevo();
  cargarTabla();
  console.log(cuentasBancarias);
}

function filtrarCuentas() {
    cuentasBancarias = JSON.parse(
        localStorage.getItem("cuentasBancarias") || "[]"
    );
    
    tabla = document.getElementById("tablaDeCuentas");
    
    tabla.innerHTML = "";
    
    filtro = document.getElementById("filtro").value;
    
    let encontrados = false;
    
    for (let i = 0; i < cuentasBancarias.length; i++) {
        if (
        cuentasBancarias[i].numero.includes(filtro) ||
        cuentasBancarias[i].nombreBanco.includes(filtro)
        ) {
        encontrados = true;
        fila = document.createElement("tr");
    
        celdaNumeroCuentaAUsar = document.createElement("td");
        celdaNumeroCuentaAUsar.textContent = cuentasBancarias[i].numero;
        celdaNumeroCuentaAUsar.classList.add("numeroCuenta");
        fila.appendChild(celdaNumeroCuentaAUsar);
        celdaNumeroCuentayNombreBanco = document.createElement("td");
        celdaNumeroCuentayNombreBanco.innerText =
            cuentasBancarias[i].numero + " : " + cuentasBancarias[i].nombreBanco;
        celdaNumeroCuentayNombreBanco.classList.add("tdNombreYNumero");
        fila.appendChild(celdaNumeroCuentayNombreBanco);
    
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
    
        fila.appendChild(celdaAcciones);
    
        tabla.appendChild(fila);
        }
    }
    
    if (!encontrados) {
        filaNoEncontrado = document.createElement("tr");
        celdaNoEncontrado = document.createElement("td");
        celdaNoEncontrado.setAttribute("colspan", "3");
        celdaNoEncontrado.textContent = "No se encontraron resultados";
        filaNoEncontrado.appendChild(celdaNoEncontrado);
        tabla.appendChild(filaNoEncontrado);
    }
    
}

function nuevo() {
  numeroCuenta = document.getElementById("numeroCuenta");
  nombreBanco = document.getElementById("nombreBanco");
  tipoCuenta = document.getElementById("tipoCuenta");
  saldoActual = document.getElementById("saldoActual");
  estadoCuenta = document.getElementById("estadoCuenta");
  fechaApertura = document.getElementById("fecha");
  descripcion = document.getElementById("descripcion");

  numeroCuenta.value = "";
  nombreBanco.value = "";
  tipoCuenta.value = "";
  saldoActual.value = "";
  estadoCuenta.value = "";
  fechaApertura.value = "";
  descripcion.value = "";

  numeroCuenta.focus();
}

function borrarDatos() {
  localStorage.removeItem("cuentasBancarias");
  cargarTabla();
}

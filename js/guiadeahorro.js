idTemporal = 0;

function guardar() {
  consejos = JSON.parse(localStorage.getItem("consejos") || "[]");

  titulo = document.getElementById("titulo");
  contenido = document.getElementById("contenido");

  let existe = consejos.findIndex((consejo) => consejo.id == idTemporal);

  if (existe !== -1) {
    actualizar(idTemporal);
  } else {
    id = Date.now();

    consejo = new Consejo(id, titulo.value, contenido.value);

    consejos.push(consejo);

    localStorage.setItem("consejos", JSON.stringify(consejos));

    console.log(consejos);
    cargarGuiaConsejosLocalStorage();
  }
  cargarGuiaConsejosLocalStorage();
  idTemporal = 0;
  nuevo();
  cerrarVentana();
}

function mostarVentana(id) {
  consejos = consejos = JSON.parse(localStorage.getItem("consejos") || "[]");
  ventana = document.getElementById("ventanaConsejo");
  botonActualizar = document.getElementById("boton")
  titulo = document.getElementById("titulo")
  
  titulo.focus();

  if (consejos.length < 1) {
    ventana.style.display = "block";
  } else {
    for (let i = 0; i < consejos.length; i++) {
      if (consejos[i].id == id) {
        botonActualizar.innerText = "Actualizar"
        ventana.style.display = "block";
        break;
      } else {
        botonActualizar.textContent = "Crear"
        ventana.style.display = "block";
        break;
      }
    }
  }
}

function cerrarVentana() {
  ventana = document.getElementById("ventanaConsejo");

  titulo = document.getElementById("titulo");
  contenido = document.getElementById("contenido");

  titulo.value = "";
  contenido.value = "";

  ventana.style.display = "none";
}

function actualizar(id) {
  consejos = JSON.parse(localStorage.getItem("consejos") || "[]");

  titulo = document.getElementById("titulo");
  contenido = document.getElementById("contenido");

  for (let i = 0; i < consejos.length; i++) {
    if (consejos[i].id == id) {
      consejos[i].titulo = titulo.value;
      consejos[i].contenido = contenido.value;
      break;
    }
  }

  localStorage.setItem("consejos", JSON.stringify(consejos));

  nuevo();
  cargarGuiaConsejosLocalStorage();
}

function eliminar() {
  consejos = JSON.parse(localStorage.getItem("consejos") || "[]");

  id = this.parentNode.parentNode.parentNode.children[0].textContent;
  console.log(id);

  for (let i = 0; i < consejos.length; i++) {
    console.log(consejos[i].id);

    if (consejos[i].id == id) {
      consejos.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("consejos", JSON.stringify(consejos));
  cargarGuiaConsejosLocalStorage();
}

function cargarGuiaConsejos() {
  fetch("../recursos/datos/consejos.json")
    .then((response) => response.json())
    .then((data) => {
      consejos = data;
      tabla = document.getElementById("tablaDeConsejos");

      console.log(consejos.length);

      tabla.innerHTML = "";

      for (let i = 0; i < consejos.length; i++) {
        fila = document.createElement("tr");

        consejo = document.createElement("td");

        divTitulo = document.createElement("div");
        divTitulo.classList.add("divTitulo");
        divTitulo.textContent = consejos[i].titulo;

        divContenido = document.createElement("div");
        divContenido.classList.add("divContenido");
        divContenido.textContent = consejos[i].contenido;

        consejo.appendChild(divTitulo);
        consejo.appendChild(divContenido);

        fila.appendChild(consejo);

        tabla.appendChild(fila);
      }

      consejos = JSON.parse(localStorage.getItem("consejos") || "[]");

      tabla = document.getElementById("tablaDeConsejos");

      for (let i = 0; i < consejos.length; i++) {
        fila = document.createElement("tr");

        //crear el primer td
        id = document.createElement("td");
        id.innerText = consejos[i].id;
        id.classList.add("oculto");

        //creando el egundo td
        consejo = document.createElement("td");

        divTitulo = document.createElement("div");
        divTitulo.classList.add("divTitulo");
        titulo = document.createElement("label");
        titulo.innerText = consejos[i].titulo;
        divTitulo.appendChild(titulo);
        consejo.appendChild(divTitulo);

        divContenido = document.createElement("div");
        divContenido.classList.add("divContenido");
        contenido = document.createElement("p");
        contenido.innerText = consejos[i].contenido;
        divContenido.appendChild(contenido);
        consejo.appendChild(divContenido);

        fila.appendChild(id);
        fila.appendChild(consejo);
        tabla.appendChild(fila);
      }
    });
}

function cargarGuiaConsejosLocalStorage() {
  consejos = JSON.parse(localStorage.getItem("consejos") || "[]");

  tabla = document.getElementById("tablaDeConsejos");

  tabla.innerHTML = "";

  for (let i = 0; i < consejos.length; i++) {
    fila = document.createElement("tr");

    //crear el primer td
    id = document.createElement("td");
    id.innerText = consejos[i].id;
    id.classList.add("oculto");

    //creando el egundo td
    consejo = document.createElement("td");

    divTitulo = document.createElement("div");
    divTitulo.classList.add("divTitulo");
    titulo = document.createElement("label");
    titulo.innerText = consejos[i].titulo;
    divTitulo.appendChild(titulo);
    consejo.appendChild(divTitulo);

    divContenido = document.createElement("div");
    divContenido.classList.add("divContenido");
    contenido = document.createElement("p");
    contenido.innerText = consejos[i].contenido;
    divContenido.appendChild(contenido);
    consejo.appendChild(divContenido);

    //creando del td para los botones
    botones = document.createElement("td");
    botones.classList.add("tdBotones");
    divBotones = document.createElement("div");
    divBotones.classList.add("divBotones");
    botonEliminar = document.createElement("button");
    botonEliminar.classList.add("botonAcciones");
    botonEliminar.innerText = "Eliminar";
    botonEliminar.addEventListener("click", eliminar);

    botonEditar = document.createElement("button");
    botonEditar.classList.add("botonAcciones");
    botonEditar.innerText = "Editar";
    botonEditar.addEventListener("click", mostrarDatos);

    divBotones.appendChild(botonEliminar);
    divBotones.appendChild(botonEditar);

    botones.appendChild(divBotones);

    fila.appendChild(id);
    fila.appendChild(consejo);
    fila.appendChild(botones);
    tabla.appendChild(fila);
  }
}

function mostrarDatos() {
  consejos = JSON.parse(localStorage.getItem("consejos") || "[]");

  id = this.parentNode.parentNode.parentNode.children[0].textContent;

  for (let i = 0; i < consejos.length; i++) {
    if (consejos[i].id == id) {
      titulo = document.getElementById("titulo");
      titulo.value = consejos[i].titulo;

      contenido = document.getElementById("contenido");
      contenido.value = consejos[i].contenido;
    }
  }
  mostarVentana(id);
  idTemporal = id;
}

function nuevo() {
  titulo = document.getElementById("titulo");
  contenido = document.getElementById("contenido");

  titulo.value = "";
  contenido.value = "";

  titulo.focus();
}

function borrarDatos() {
  localStorage.removeItem("consejos");
}

function validarDatos() {
  usuario = document.getElementById("usuario");
  contrasena = document.getElementById("contrasena");

  if (usuario.value == "" || contrasena.value == "") {
    alert("Todos los campos son obligatorios");
    return false;
  } else if (usuario.value == "admin" && contrasena.value == "123") {
    window.location.href = "../html/menuadministrador.html";
 
  } else if (usuario.value == "general" && contrasena.value == "123") {
    window.location.href = "../html/menugeneral.html"

  } else {
    alert("Usuario o contraseña incorrectos");
  }
  nuevo();
}

function nuevo() {
  usuario = document.getElementById("usuario");
  contrasena = document.getElementById("contrasena");

  usuario.value = "";
  contrasena.value = "";
}

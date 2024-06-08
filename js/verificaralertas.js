function verificarAlertas() {
  fecha = 0;
  hora = 0;
  minuto = 0;

  let alertas = JSON.parse(localStorage.getItem("alertas") || "[]");

  for (let i = 0; i < alertas.length; i++) {
    let fecha = new Date(alertas[i].fecha);
    let [hora, minuto] = alertas[i].hora.split(":").map(Number);

    fecha.setHours(hora, minuto);

    if (
      fecha <= new Date() &&
      hora <= new Date().getHours() &&
      minuto <= new Date().getMinutes()
    ) {
      let year;
      let month;
      let day;

      switch (alertas[i].opcionesRepetciones) {
        case "Anual":
          alert(alertas[i].tipoAlerta + " : " + alertas[i].descripcion);
          [year, month, day] = alertas[i].fecha.split("-").map(Number);
          year++;
          alertas[i].fecha = `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
          break;
        case "Mensual":
          alert(alertas[i].tipoAlerta + " : " + alertas[i].descripcion);
          [year, month, day] = alertas[i].fecha.split("-").map(Number);
          month++;
          if (month > 12) {
            month = 1;
            year++;
          }
          alertas[i].fecha = `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
          break;
        case "Semanal":
          alert(alertas[i].tipoAlerta + " : " + alertas[i].descripcion);
          [year, month, day] = alertas[i].fecha.split("-").map(Number);
          day += 7;
          if (day > 30) {
            day -= 30;
            month++;
            if (month > 12) {
              month = 1;
              year++;
            }
          }
          alertas[i].fecha = `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
          break;
        case "Diario":
          alert(alertas[i].tipoAlerta + " : " + alertas[i].descripcion);
          [year, month, day] = alertas[i].fecha.split("-").map(Number);
          day++;
          if (day > 30) {
            day = 1;
            month++;
            if (month > 12) {
              month = 1;
              year++;
            }
          }
          alertas[i].fecha = `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
          break;
        case "Una vez":
          alert(alertas[i].tipoAlerta + " : " + alertas[i].descripcion);
          alertas.splice(i, 1);
          i--;
          break;
      }
    }
  }

  localStorage.setItem("alertas", JSON.stringify(alertas));
}

setInterval(() => {
    let alertas = JSON.parse(localStorage.getItem("alertas") || "[]");

    const fechaActual = new Date();
    const horaActual = fechaActual.getHours();
    const minutoActual = fechaActual.getMinutes();

    for (let i = 0; i < alertas.length; i++) {
        let [hora, minuto] = alertas[i].hora.split(":").map(Number);

        if (hora !== horaActual || minuto !== minutoActual) {
            verificarAlertas();
            hora = horaActual;
            minuto = minutoActual;
        }
    }
    verificarAlertas();
}, 1000);

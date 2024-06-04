function caragarGrafico() {
  transacciones = JSON.parse(localStorage.getItem("transacciones") || "[]");

  // Sacar los datos como su tipo para obtener solo los egresos
  const egresos = transacciones.filter(
    (transaccion) => transaccion.tipo === "egreso"
  );

  console.log(egresos);

  const categorias = [];

  for (let i = 0; i < egresos.length; i++) {
    const categoria = egresos[i].tipoAsociado;
    if (categorias.indexOf(categoria) === -1) {
      categorias.push(categoria);
    }
  }

  console.log(categorias);
  //sumar los valores de cada categoria
const valores = [];
for (let i = 0; i < categorias.length; i++) {
    const categoria = categorias[i];
    let suma = 0;
    for (let j = 0; j < egresos.length; j++) {
        if (egresos[j].tipoAsociado === categoria) {
            suma += parseFloat(egresos[j].valor);
        }
    }
    valores.push(suma.toFixed(2));
}

    console.log(valores);

    grafica = document.getElementById("graficoDeEgresos");

    new Chart(grafica, {
        type: "bar",
        data: {
            labels: categorias,
            datasets: [
                {
                    label: "Gastos por categoria",
                    data: valores,
                    borderWidth: 1,
                    backgroundColor: generateColors(categorias.length),
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    function generateColors(numColors) {
        const colors = ["red", "blue", "yellow", "green", "purple", "orange", "black", "white", "pink", "cyan", "magenta", "brown", "gray", "lightblue", "lightgreen", "lightyellow", "lightred", "lightpurple", "lightorange"];

        const generatedColors = [];
        for (let i = 0; i < numColors; i++) {
            generatedColors.push(colors[i % colors.length]);
        }
        return generatedColors;
    }
}

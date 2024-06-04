class Transaccion  {
    constructor(id, tipo, tipoAsociado, valor, cuentaRelacionada, fecha, descripcion, archivo) {
        this.id = id;
        this.tipo = tipo;
        this.tipoAsociado = tipoAsociado;
        this.valor = valor;
        this.cuentaRelacionada = cuentaRelacionada;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.archivo = archivo;
    }
}
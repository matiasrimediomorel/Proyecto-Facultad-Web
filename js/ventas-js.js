// Helpers específicos para el recurso Ventas
// Expone window.apiClientes con métodos: listar, obtener, crear, actualizar, eliminar

(function (global) {
  const base = '/Ventas'; // se concatenará a API_CONFIG.apiBase => /api/Ventas

  async function listar() {
    return global.apiClient.get(base);
  }

  async function listarProd() {
    const base1 = '/Productos';
    return global.apiClient.get(base1);
  }

  async function listarCli() {
    const base2 = '/clientes';
    return global.apiClient.get(base2);
  }

  async function buscaCli(id) {
    const base2 = '/clientes';
    return global.apiClient.get(`${base2}/${id}`);
  }

  async function obtener(id) {
    if (!id) throw new Error('Id es requerido');
    return global.apiClient.get(`${base}/${id}`);
  }

  async function crear(Venta) {
    if (!Venta) throw new Error('Venta es requerida');
    return global.apiClient.post(base, Venta);
  }

  async function actualizar(Venta) {
    if (!Venta || !Venta.Codigo) throw new Error('Venta con Codigo válido es requerida');
    return global.apiClient.put(base, Venta);
  }

//  async function eliminar(id) {
//    if (!id) throw new Error('Id es requerido');
//    return global.apiClient.delete(`${base}/${id}`);
//  }

  global.apiClientes = {
    listar,
    listarProd,
    listarCli,
    buscaCli,
    obtener,
    crear,
    actualizar
  };
})(window);
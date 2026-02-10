// Helpers específicos para el recurso Clientes
// Expone window.apiClientes con métodos: listar, obtener, crear, actualizar, eliminar

(function (global) {
  const base = '/Clientes'; // se concatenará a API_CONFIG.apiBase => /api/Clientes

  async function listar() {
    return global.apiClient.get(base);
  }

  async function obtener(id) {
    if (!id) throw new Error('Id es requerido');
    return global.apiClient.get(`${base}/${id}`);
  }

  async function crear(cliente) {
    if (!cliente) throw new Error('Cliente es requerido');
    return global.apiClient.post(base, cliente);
  }

  async function actualizar(cliente) {
    if (!cliente || !cliente.Codigo) throw new Error('Cliente con Codigo válido es requerido');
    return global.apiClient.put(base, cliente);
  }

  async function eliminar(id) {
    if (!id) throw new Error('Id es requerido');
    return global.apiClient.delete(`${base}/${id}`);
  }

  global.apiClientes = {
    listar,
    obtener,
    crear,
    actualizar,
    eliminar
  };
})(window);
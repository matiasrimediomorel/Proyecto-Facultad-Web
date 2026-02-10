// Helpers específicos para el recurso Productos
// Expone window.apiClientes con métodos: listar, obtener, crear, actualizar, eliminar

(function (global) {
  const base = '/Productos'; // se concatenará a API_CONFIG.apiBase => /api/Productos

  async function listar() {
    return global.apiClient.get(base);
  }

  async function obtener(id) {
    if (!id) throw new Error('Id es requerido');
    return global.apiClient.get(`${base}/${id}`);
  }

  async function crear(producto) {
    if (!producto) throw new Error('Producto es requerido');
    return global.apiClient.post(base, producto);
  }

  async function actualizar(producto) {
    if (!producto || !producto.Codigo) throw new Error('Producto con Codigo válido es requerido');
    return global.apiClient.put(base, producto);
  }

//  async function eliminar(id) {
//    if (!id) throw new Error('Id es requerido');
//    return global.apiClient.delete(`${base}/${id}`);
//  }

  global.apiClientes = {
    listar,
    obtener,
    crear,
    actualizar
  };
})(window);
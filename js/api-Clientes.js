// Cliente HTTP pequeño usando fetch para llamadas JSON.
// Provee funciones: get(path), post(path, body), put(path, body), del(path)
// Retorna promesas que resuelven con el body JSON o rechazan con Error.

(function (global) {
  const cfg = global.API_CONFIG || { apiBase: '/api', credentials: 'same-origin' };

  async function request(method, path, body) {
    const url = cfg.apiBase + path;
    const opts = {
      method,
      headers: {
        'Accept': 'application/json'
      },
      credentials: cfg.credentials // 'include' para cookies; 'same-origin' por defecto
    };

    if (body != null) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }

    const res = await fetch(url, opts);

    // Si es 204 No Content devolvemos null
    if (res.status === 204) return null;

    // Intentar parsear JSON; si falla devolvemos texto
    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';
    const data = contentType.includes('application/json') && text ? JSON.parse(text) : text;

    if (!res.ok) {
      // Normalizar errores: si viene un objeto con mensaje, lo mostramos
      const message = (data && data.message) || (typeof data === 'string' ? data : res.statusText);
      const err = new Error(message || 'Error en la petición');
      err.status = res.status;
      err.body = data;
      throw err;
    }

    return data;
  }

  // Exportar funciones sencillas
  global.apiClient = {
    get: (path) => request('GET', path),
    post: (path, body) => request('POST', path, body),
    put: (path, body) => request('PUT', path, body),
    delete: (path) => request('DELETE', path)
  };
})(window);
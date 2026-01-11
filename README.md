# Wireframes estáticos - Proyecto Facultad (Frontend)

Contenido:
- login.html — pantalla de login
- dashboard.html — layout con sidebar / topbar (puntos de entrada a las demás pantallas)
- clientes.html — listado de clientes (tabla) + botón "Nuevo"
- cliente-form.html — formulario para crear/editar cliente
- productos.html — listado de productos
- producto-form.html — formulario producto
- ventas.html — crear venta (estructura de line items y totales)
- reportes.html — listados / filtros de reportes
- admin-backup.html — Backup / Restore (admin)
- css/styles.css — estilos comunes

Cómo usar:
1. Coloca todos los archivos en la misma carpeta (mantén la estructura de nombres).
2. Abre `login.html` en tu navegador.
3. Navega usando los links del sidebar o botones (en este wireframe los links son archivos locales).
4. Si querés convertir a proyecto real más adelante, puedes:
   - Importar el HTML como plantillas en una SPA,
   - Reemplazar botones por llamadas a tu API,
   - Añadir autenticación JWT y protección de rutas.

Notas:
- Estos wireframes usan Bootstrap CDN para acelerar el diseño visual.
- Están hechos para ser una base visual/estructural; no contienen lógica JS ni llamadas al backend.
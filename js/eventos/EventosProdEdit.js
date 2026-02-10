const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

document.addEventListener('DOMContentLoaded', async () => {
  if (idProducto > 0) {
    try {   
    // Cargar datos del producto para edición
    const producto = await window.apiClientes.obtener(idProducto); 
    document.getElementById("codigo").value = producto.Codigo ?? producto.codigo;
    document.getElementById("descripcion").value = producto.Descripcion ?? producto.descripcion;
    document.getElementById("precio").value = producto.Valor ?? producto.valor;
    document.getElementById("stock").value = producto.Cantidad ?? producto.cantidad;
    } catch (err) {
      console.error('Error al cargar producto:', err);
      alert('Error al cargar producto: ' + (err.message || err.status));
    } 
} else {return;}});


const btnGuarda = document.getElementById('btnGuardar');  

btnGuarda.addEventListener('click', async () => {
  try {
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;

    if (idProducto > 0) {
      // Editar cliente existente
      await window.apiClientes.actualizar({Codigo:idProducto, Descripcion: descripcion, Valor: precio, Cantidad: stock });
    } 
    //else {
      // Crear nuevo cliente
     // await window.apiClientes.crear({ Nombre: nombre, Apellido: apellido, Dni: dni });
    //}

    alert('Producto guardado correctamente');
    window.location.href = "productos.html";
  } catch (err) {
    console.error('Error al guardar producto:', err);
    alert('Error al guardar producto: ' + (err.message || err.status));
  }
});
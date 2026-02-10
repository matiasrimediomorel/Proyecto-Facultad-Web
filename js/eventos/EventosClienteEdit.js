const params = new URLSearchParams(window.location.search);
const idCliente = params.get("id");

document.addEventListener('DOMContentLoaded', async () => {
  if (idCliente > 0) {
    try {   
    // Cargar datos del cliente para edición
    const cliente = await window.apiClientes.obtener(idCliente); 
    document.getElementById("inputNombre").value = cliente.Nombre ?? cliente.nombre;
    document.getElementById("inputApellido").value = cliente.Apellido ?? cliente.apellido;
    document.getElementById("inputDni").value = cliente.Dni ?? cliente.dni;

    } catch (err) {
      console.error('Error al cargar cliente:', err);
      alert('Error al cargar cliente: ' + (err.message || err.status));
    } 
} else {return;}});


const btnGuarda = document.getElementById('btnGuardar');  

btnGuarda.addEventListener('click', async () => {
  try {
    const nombre = document.getElementById("inputNombre").value;
    const apellido = document.getElementById("inputApellido").value;
    const dni = document.getElementById("inputDni").value;

    if (idCliente > 0) {
      // Editar cliente existente
      await window.apiClientes.actualizar({Codigo:idCliente, Nombre: nombre, Apellido: apellido, Dni: dni });
    } else {
      // Crear nuevo cliente
      await window.apiClientes.crear({ Nombre: nombre, Apellido: apellido, Dni: dni });
    }

    alert('Cliente guardado correctamente');
    window.location.href = "clientes.html";
  } catch (err) {
    console.error('Error al guardar cliente:', err);
    alert('Error al guardar cliente: ' + (err.message || err.status));
  }
});
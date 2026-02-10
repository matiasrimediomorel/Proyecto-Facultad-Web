

document.addEventListener('DOMContentLoaded', async () => {
      try {
       const clientes = await window.apiClientes.listar();
       const tbody = document.getElementById('lista-clientes');
       if (!tbody) return;
       clientes.forEach(c => {
         const tr = document.createElement('tr');
                  tr.innerHTML = `<td id="cod">${c.Codigo ?? c.codigo}</td>
                <td>${c.Nombre ?? c.nombre}</td>
                <td>${c.Apellido ?? c.apellido}</td>
                <td>${c.Dni ?? c.dni}</td>
                <td>
                  <button id="btnEdit" class="btn btn-ghost btn-sm">Editar</button> 
                  <button id="btnDelete" class="btn btn-ghost btn-sm">Eliminar</button>
                </td>`;
         tbody.appendChild(tr);
       });       
      } catch (err) {
        console.error('Error al cargar clientes:', err);
        alert('Error al cargar clientes: ' + (err.message || err.status));
      }
    });


const tbody = document.getElementById('lista-clientes');  

tbody.addEventListener("click", async(e) => {
  try {
    if (e.target.id === "btnEdit") {
    // Encontrar la fila
    let fila = e.target.closest("tr");
    let valcod = fila.querySelector("#cod").textContent;

    window.location.href = "cliente-form.html?id=" + valcod;
  }

  if (e.target.id === "btnDelete") {
    let fila = e.target.closest("tr");
    let valcod = fila.querySelector("#cod").textContent;
    const confirmado = confirm("¿Estás seguro de que deseas eliminar este cliente?");
    if (confirmado) { 
      await window.apiClientes.eliminar(valcod);
    }
    location.reload();
    // Aquí podrías llamar a tu API para eliminar
  }
  } catch (err) {
    console.error('Error en acción de cliente:', err);
    alert('Error en acción de cliente: ' + (err.message || err.status));
  }
});




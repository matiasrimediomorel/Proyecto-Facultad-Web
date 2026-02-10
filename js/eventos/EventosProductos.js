

document.addEventListener('DOMContentLoaded', async () => {
      try {
       const producto = await window.apiClientes.listar();
       const tbody = document.getElementById('lista-productos');
       if (!tbody) return;
       producto.forEach(p => {
         const tr = document.createElement('tr');
                  tr.innerHTML = `<td id="cod">${p.Codigo ?? p.codigo}</td>
                <td>${p.Descripcion ?? p.descripcion}</td>
                <td>${p.Valor ?? p.valor}</td>
                <td>${p.Cantidad ?? p.cantidad}</td>
                <td>
                  <button id="btnEdit" class="btn btn-ghost btn-sm">Editar</button> 
                </td>`;
         tbody.appendChild(tr);
       });       
      } catch (err) {
        console.error('Error al cargar productos:', err);
        alert('Error al cargar productos: ' + (err.message || err.status));
      }
    });


const tbody = document.getElementById('productos-venta');  

tbody.addEventListener("click", async(e) => {
  try {
    if (e.target.id === "btnEdit") {
    // Encontrar la fila
    let fila = e.target.closest("tr");
    let valcod = fila.querySelector("#cod").textContent;

    window.location.href = "producto-form.html?id=" + valcod;
  }
  } catch (err) {
    console.error('Error en acción de producto:', err);
    alert('Error en acción de producto: ' + (err.message || err.status));
  }
});




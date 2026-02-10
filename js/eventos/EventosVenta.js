let productos;
let clientes;
let clienteSeleccionado;
let ProductoSel;
let productosSeleccionado = [];

document.addEventListener('DOMContentLoaded', async () => {
      try {
       productos = await window.apiClientes.listarProd();
       clientes = await window.apiClientes.listarCli();       
       calcularTotales();
      } catch (err) {
        console.error('Error al cargar productos:', err);
        alert('Error al cargar productos: ' + (err.message || err.status));
      }
    });


const tBuscaCliente = document.getElementById("buscaCliente");
const filtroClientes = document.getElementById("filtroClientes");
const btnAgregar = document.getElementById("btnAgregarProducto");
const tBuscaProducto = document.getElementById("buscaProducto");
const filtroProductos = document.getElementById("filtroProductos");
const tbodyProductos = document.getElementById('productos-venta');
const tCantidad = document.getElementById("cantidadProducto");
const subtotalSpan = document.getElementById("subtotal");
const descuentoSpan = document.getElementById("descuento");
const totalSpan = document.getElementById("total");
const btnFinalizar = document.getElementById("btnFinalizarVenta");

tBuscaCliente.addEventListener("input", (e) => {
  const filtro = e.target.value.toLowerCase();
  filtroClientes.innerHTML = "";
  if (filtro.length === 0) return;
  const coincidencias = clientes.filter(c => 
    c.nombre.toLowerCase().includes(filtro) || 
    c.apellido.toLowerCase().includes(filtro) 
  );
  coincidencias.forEach(c => {
    const div = document.createElement("div");
    div.id = "seleccion";
    div.textContent =`${c.codigo} - ${c.nombre} ${c.apellido} (${c.dni})`;
    div.addEventListener("click", () => {
      tBuscaCliente.value = `${c.codigo} - ${c.nombre} ${c.apellido} (${c.dni})`;
      filtroClientes.innerHTML = "";
    });
    filtroClientes.appendChild(div);
    clienteSeleccionado = c;
  });
});


tBuscaProducto.addEventListener("input", (e) => {
  const filtro = e.target.value.toLowerCase();
  filtroProductos.innerHTML = "";
  if (filtro.length === 0) return;
  const coincidencias = productos.filter(p => 
    p.descripcion.toLowerCase().includes(filtro) 
  );
  coincidencias.forEach(c => {
    const div = document.createElement("div");
    div.id = "seleccion";
    div.textContent =`${c.codigo} - ${c.descripcion} (${c.valor})`;
    div.addEventListener("click", () => {
      tBuscaProducto.value = `${c.codigo} - ${c.descripcion} (${c.valor})`;
      filtroProductos.innerHTML = "";
      ProductoSel = c;
    });
    filtroProductos.appendChild(div);
  });
});



function eliminarProducto(codigo) {
  const index = productosSeleccionado.findIndex(p => p.codigo === codigo);
  if (index !== -1) {
    productosSeleccionado.splice(index, 1);
  }
  actualizarListaProductos();
}

function actualizarListaProductos() {
  tbodyProductos.innerHTML = "";
  productosSeleccionado.forEach(p => {
    const tr = document.createElement('tr');
               tr.innerHTML = `<td id="cod">${p.Codigo ?? p.codigo}</td>
              <td>${p.Descripcion ?? p.descripcion}</td>
              <td>${p.Valor ?? p.valor}</td>
              <td>${p.Cantidad ?? p.cantidad}</td>
              <td>${p.valor * p.cantidad}</td>
              <td>
                  <button id="btnQuitar" class="btn btn-ghost btn-sm">Quitar</button> 
              </td>`;
    tbodyProductos.appendChild(tr);
})
calcularTotales();
};

let subtotal = 0;
let descuento = 0;
let total = 0;
function calcularTotales() {
  try {
      if (productosSeleccionado.length === 0) {
        subtotalSpan.textContent = "0";
        descuentoSpan.textContent = "0";
        totalSpan.textContent = "0";
        return;
      } else {
        subtotal = 0;
        descuento = 0;
        total = 0;
        productosSeleccionado.forEach(p => {
          subtotal = subtotal + (p.valor * p.cantidad);
          descuento = 0;
          total = subtotal - descuento;
          subtotalSpan.textContent = subtotal;
          descuentoSpan.textContent = descuento;
          totalSpan.textContent = total;
        });
      }

  } catch (err) {
    console.error('Error al calcular totales:', err);
    alert('Error al calcular totales: ' + (err.message || err.status));
  }
}

btnAgregar.addEventListener("click", () => {
  if (tBuscaProducto.value.length === 0) {
    alert("Seleccione un producto primero.");
    return;
  } else {
    if (productosSeleccionado.length > 0 && productosSeleccionado.filter(p => p.codigo === ProductoSel.codigo).length > 0) {
      const agregaCanti = parseInt(ProductoSel.cantidad) + parseInt(tCantidad.value);
      ProductoSel.cantidad = agregaCanti;
    }else{
      ProductoSel.cantidad = tCantidad.value;
      productosSeleccionado.push(ProductoSel);   
    }
    actualizarListaProductos();   
  } 
});


tbodyProductos.addEventListener("click", async(e) => {
  try {
    if (e.target.id === "btnQuitar") {
    // Encontrar la fila
    let fila = e.target.closest("tr");
    let valcod = fila.querySelector("#cod").textContent;
    
    eliminarProducto(parseInt(valcod));
  }
  } catch (err) {
    console.error('Error en acción de producto:', err);
    alert('Error en acción de producto: ' + (err.message || err.status));
  }
});

btnFinalizar.addEventListener("click", async() => {
  try {
    if (!clienteSeleccionado) { 
      alert("Seleccione un cliente primero.");
      return;
    } else if (productosSeleccionado.length === 0) {
      alert("Agregue al menos un producto.");
      return;
    } else {
      const venta = {
        Fecha: 0,
        Total: total,
        Cliente: await window.apiClientes.buscaCli(clienteSeleccionado.codigo),
        Lista_pro: productosSeleccionado.map(p => ({
          Codigo: p.codigo,
          Descripcion: p.descripcion,
          Cantidad: p.cantidad,
          valor: p.valor}))};
        await window.apiClientes.crear(venta);
        alert("Venta finalizada correctamente.");
        location.reload();
      }        
    } catch (err) {
    console.error('Error al finalizar venta:', err);
    alert('Error al finalizar venta: ' + (err.message || err.status));
  }});


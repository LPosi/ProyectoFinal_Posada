let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Cargar productos desde JSON
async function cargarProductos() {
  const respuesta = await fetch("./data/productos.json");
  productos = await respuesta.json();
  mostrarProductos();
  actualizarCarrito();
}

// Renderizar productos
function mostrarProductos() {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = "";

  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("col-md-4");
    div.innerHTML = `
      <div class="card h-100 text-center">
        <img src="./images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p class="fw-bold">$${producto.precio}</p>
          <button class="btn btn-info" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        </div>
      </div>`;
    contenedor.appendChild(div);
  });
}

// Agregar producto
function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  const itemEnCarrito = carrito.find((p) => p.id === id);

  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  actualizarCarrito();
  mostrarCarrito();
}

// Renderizar carrito
function mostrarCarrito() {
  const carritoSection = document.getElementById("carritoSection");
  const contenedor = document.getElementById("carrito");
  carritoSection.style.display = carrito.length ? "block" : "none";

  contenedor.innerHTML = `
    <table class="table table-striped table-dark">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${carrito
          .map(
            (p) => `
          <tr>
            <td>${p.nombre}</td>
            <td>$${p.precio}</td>
            <td>${p.cantidad}</td>
            <td>$${p.precio * p.cantidad}</td>
            <td><button class="btn btn-danger btn-sm" onclick="eliminarProducto(${
              p.id
            })">X</button></td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
    <h4 class="text-end mt-3">Total: $${calcularTotal()}</h4>`;
}

// Eliminar producto
function eliminarProducto(id) {
  carrito = carrito.filter((p) => p.id !== id);
  guardarCarrito();
  actualizarCarrito();
  mostrarCarrito();
}

// Vaciar carrito
document.getElementById("vaciarCarrito").addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
  mostrarCarrito();
});

// Finalizar compra
document.getElementById("finalizarCompra").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  alert("¡Gracias por tu compra!");
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
  mostrarCarrito();
});

// Guardar y actualizar
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
function calcularTotal() {
  return carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
}
function actualizarCarrito() {
  document.getElementById("cantidadCarrito").textContent = carrito.length;
}

// Inicializar
cargarProductos();

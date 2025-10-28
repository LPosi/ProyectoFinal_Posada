// ==============================
// Simulador de Carrito de Compras CUBO 3D
// ==============================

// Variables globales
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ------------------------------
// Cargar productos desde JSON
// ------------------------------
const cargarProductos = async () => {
  try {
    const respuesta = await fetch("./data/productos.json");
    productos = await respuesta.json();
    renderizarProductos();
    actualizarCarrito();
  } catch (error) {
    console.error("Error al cargar productos:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudieron cargar los productos. Intentalo nuevamente.",
    });
  }
};

// ------------------------------
// Renderizar productos en el DOM
// ------------------------------
const renderizarProductos = () => {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = "";

  productos.forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("col-md-4");
    tarjeta.innerHTML = `
      <div class="card text-center shadow-sm h-100">
        <img src="./images/${producto.imagen}" alt="${producto.nombre}" class="card-img-top">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p class="fw-bold fs-5">$${producto.precio}</p>
          <button class="btn btn-info mt-auto" data-id="${producto.id}">Agregar al carrito</button>
        </div>
      </div>`;
    contenedor.appendChild(tarjeta);
  });

  // Delegación de eventos
  contenedor.addEventListener("click", (e) => {
    if (e.target.matches("button[data-id]")) {
      const id = Number(e.target.dataset.id);
      agregarAlCarrito(id);
    }
  });
};

// ------------------------------
// Agregar producto al carrito
// ------------------------------
const agregarAlCarrito = (id) => {
  const producto = productos.find((p) => p.id === id);
  const itemExistente = carrito.find((p) => p.id === id);

  itemExistente
    ? itemExistente.cantidad++
    : carrito.push({ ...producto, cantidad: 1 });

  guardarCarrito();
  actualizarCarrito();
  renderizarCarrito();

  Swal.fire({
    icon: "success",
    title: "Producto agregado",
    text: `${producto.nombre} se añadió al carrito.`,
    showConfirmButton: false,
    timer: 1300,
  });
};

// ------------------------------
// Renderizar carrito en el DOM
// ------------------------------
const renderizarCarrito = () => {
  const carritoSection = document.getElementById("carritoSection");
  const contenedor = document.getElementById("carrito");

  carritoSection.style.display = carrito.length ? "block" : "none";
  contenedor.innerHTML = carrito.length
    ? `
      <table class="table table-dark table-striped align-middle">
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
                })">🗑</button></td>
              </tr>`
            )
            .join("")}
        </tbody>
      </table>
      <h4 class="text-end mt-3">Total: $${calcularTotal()}</h4>`
    : "";
};

// ------------------------------
// Eliminar producto del carrito
// ------------------------------
const eliminarProducto = (id) => {
  const producto = carrito.find((p) => p.id === id);
  carrito = carrito.filter((p) => p.id !== id);
  guardarCarrito();
  actualizarCarrito();
  renderizarCarrito();

  Swal.fire({
    icon: "info",
    title: "Producto eliminado",
    text: `${producto.nombre} fue quitado del carrito.`,
    showConfirmButton: false,
    timer: 1200,
  });
};

// ------------------------------
// Vaciar carrito completo
// ------------------------------
document.getElementById("vaciarCarrito").addEventListener("click", () => {
  if (!carrito.length) {
    return Swal.fire({
      icon: "warning",
      title: "Carrito vacío",
      text: "No hay productos para eliminar.",
      timer: 1500,
      showConfirmButton: false,
    });
  }

  Swal.fire({
    title: "¿Vaciar carrito?",
    text: "Se eliminarán todos los productos.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, vaciar",
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      guardarCarrito();
      actualizarCarrito();
      renderizarCarrito();
      Swal.fire(
        "Carrito vacío",
        "Todos los productos fueron eliminados.",
        "success"
      );
    }
  });
});

// ------------------------------
// Finalizar compra
// ------------------------------
document.getElementById("finalizarCompra").addEventListener("click", () => {
  if (!carrito.length) {
    return Swal.fire({
      icon: "warning",
      title: "Carrito vacío",
      text: "Agregá algún producto antes de finalizar la compra.",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  Swal.fire({
    title: "¡Compra confirmada! 🎉",
    text: "Gracias por tu compra. En breve te contactaremos.",
    icon: "success",
    confirmButtonText: "Aceptar",
  });

  carrito = [];
  guardarCarrito();
  actualizarCarrito();
  renderizarCarrito();
});

// ------------------------------
// Funciones auxiliares
// ------------------------------
const guardarCarrito = () =>
  localStorage.setItem("carrito", JSON.stringify(carrito));

const calcularTotal = () =>
  carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

const actualizarCarrito = () =>
  (document.getElementById("cantidadCarrito").textContent = carrito.length);

// Inicializar aplicación
cargarProductos();

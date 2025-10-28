// --- VARIABLES GLOBALES ---
let productos = [];
let carrito = [];

// --- CARGA DE DATOS DESDE JSON ---
async function cargarProductos() {
  try {
    const respuesta = await fetch("data/productos.json");
    productos = await respuesta.json();
    mostrarProductos(productos);
  } catch (error) {
    document.getElementById("seccionProductos").innerHTML =
      "<p>Error al cargar los productos.</p>";
  }
}

// --- MOSTRAR PRODUCTOS EN PANTALLA ---
function mostrarProductos(lista) {
  const contenedor = document.getElementById("seccionProductos");
  contenedor.innerHTML = "";

  lista.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <p>Stock disponible: ${producto.stock}</p>
      <button id="btn${producto.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);

    const boton = document.getElementById(`btn${producto.id}`);
    boton.addEventListener("click", () => agregarAlCarrito(producto.id));
  });
}

// --- AGREGAR AL CARRITO ---
function agregarAlCarrito(idProducto) {
  const producto = productos.find((p) => p.id === idProducto);
  const enCarrito = carrito.find((item) => item.id === idProducto);

  if (producto.stock === 0) {
    mostrarMensaje("No hay stock disponible.");
    return;
  }

  if (enCarrito) {
    if (enCarrito.cantidad < producto.stock) {
      enCarrito.cantidad++;
    } else {
      mostrarMensaje("No podés agregar más unidades de este producto.");
      return;
    }
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  producto.stock--;
  guardarCarrito();
  actualizarContador();
  mostrarMensaje("Producto agregado al carrito.");
}

// --- MOSTRAR MENSAJES EN PANTALLA ---
function mostrarMensaje(texto) {
  const mensaje = document.createElement("p");
  mensaje.textContent = texto;
  mensaje.style.backgroundColor = "#4fc3f7";
  mensaje.style.color = "#000";
  mensaje.style.padding = "0.5rem";
  mensaje.style.borderRadius = "5px";
  mensaje.style.textAlign = "center";
  document.body.prepend(mensaje);

  setTimeout(() => mensaje.remove(), 1500);
}

// --- GUARDAR Y CARGAR DEL STORAGE ---
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  const datos = localStorage.getItem("carrito");
  if (datos) {
    carrito = JSON.parse(datos);
    actualizarContador();
  }
}

// --- MOSTRAR CARRITO ---
function mostrarCarrito() {
  const seccion = document.getElementById("seccionCarrito");
  seccion.classList.toggle("oculto");
  seccion.innerHTML = "";

  if (carrito.length === 0) {
    seccion.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  const tabla = document.createElement("table");
  tabla.className = "tabla-carrito";
  tabla.innerHTML = `
    <tr>
      <th>Producto</th>
      <th>Precio</th>
      <th>Cantidad</th>
      <th>Subtotal</th>
      <th>Acción</th>
    </tr>
  `;

  let total = 0;

  carrito.forEach((item) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>$${item.precio}</td>
      <td>${item.cantidad}</td>
      <td>$${item.precio * item.cantidad}</td>
      <td><button class="eliminar" data-id="${item.id}">X</button></td>
    `;
    tabla.appendChild(fila);
    total += item.precio * item.cantidad;
  });

  seccion.appendChild(tabla);

  const totalParrafo = document.createElement("p");
  totalParrafo.textContent = `Total: $${total}`;
  seccion.appendChild(totalParrafo);

  const botonVaciar = document.createElement("button");
  botonVaciar.textContent = "Vaciar carrito";
  botonVaciar.className = "vaciar";
  botonVaciar.addEventListener("click", vaciarCarrito);
  seccion.appendChild(botonVaciar);

  const botonesEliminar = seccion.querySelectorAll(".eliminar");
  botonesEliminar.forEach((btn) =>
    btn.addEventListener("click", (e) => eliminarDelCarrito(e))
  );
}

// --- ELIMINAR UN PRODUCTO DEL CARRITO ---
function eliminarDelCarrito(e) {
  const id = Number(e.target.dataset.id);
  const index = carrito.findIndex((item) => item.id === id);
  if (index !== -1) {
    const item = carrito[index];
    const producto = productos.find((p) => p.id === id);
    producto.stock += item.cantidad;
    carrito.splice(index, 1);
    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
  }
}

// --- VACIAR CARRITO ---
function vaciarCarrito() {
  carrito.forEach((item) => {
    const producto = productos.find((p) => p.id === item.id);
    producto.stock += item.cantidad;
  });
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
  actualizarContador();
}

// --- CONTADOR DEL CARRITO ---
function actualizarContador() {
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById("contadorCarrito").textContent = totalItems;
}

// --- INICIALIZACIÓN ---
document
  .getElementById("btnVerCarrito")
  .addEventListener("click", mostrarCarrito);
cargarCarrito();
cargarProductos();

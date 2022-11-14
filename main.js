/* CARRITO DE MERCHANDISING */

class Producto {
  constructor(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.cantidad = 1;
  }
}

const remeraLogo = new Producto(
  1,
  "remera logo 2G",
  3500,
  "../images/remeralogo.jpg"
);
const buzoOversize = new Producto(
  2,
  "buzo oversize",
  6000,
  "../images/buzooversize.png"
);
const gorra = new Producto(3, "gorra", 3200, "../images/gorra.jpg");
const medias = new Producto(4, "medias", 2500, "../images/medias.png");
const mousePad = new Producto(5, "mousePad XL", 4000, "../images/mousepad.png");
const taza = new Producto(6, "taza", 2000, "../images/taza.jpg");

const arrayProductos = [
  remeraLogo,
  buzoOversize,
  gorra,
  medias,
  mousePad,
  taza,
];

let carrito = [];
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

console.log(arrayProductos);

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
  arrayProductos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `<div class="card">
    <img class="card-img-top imgProductos" src="${producto.img}" alt= "${producto.nombre}">
    <div class="card-body">
    <h5 class="card-title"> ${producto.nombre}</h5>
    <p class="card-text"> ${producto.precio} </p>
    <button class="btn colorBoton" id="boton${producto.id}"> Agregar al carrito </button>
    </div>
    </div>
     `;

    contenedorProductos.appendChild(card);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
};

const agregarAlCarrito = (id) => {
  const producto = arrayProductos.find((producto) => producto.id === id);
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  mostrarCarrito();
};

mostrarProductos();

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
});

const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `<div class="card">
    <img class="card-img-top imgProductos" src="${producto.img}" alt= "${producto.nombre}">
    <div class="card-body">
    <h5 class="card-title"> ${producto.nombre}</h5>
    <p class="card-text"> ${producto.precio} </p>
    <p class="card-text"> ${producto.cantidad} </p>
    <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar producto </button>
    </div>
    </div>
     `;

    contenedorCarrito.appendChild(card);

    const boton = document.getElementById(`eliminar${producto.id}`);
    boton.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
    });
  });
  calcularTotal();
};

const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);
  mostrarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
  eliminarTodoElCarrito();
});

const eliminarTodoElCarrito = () => {
  carrito = [];
  mostrarCarrito();
  localStorage.clear();
};

const totalCompra = document.getElementById("totalCompra");
const calcularTotal = () => {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
  });

  totalCompra.innerHTML = `$${total}`;
};

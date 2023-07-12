let productos;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
localStorage.clear();
let tableBody = document.getElementById('tablabody');

////CREACION DE CARDS
let contenedorProds = document.getElementById("misprods");
function renderizarProds(productos) {
  contenedorProds.innerHTML = ""; 
  for (const producto of productos) {
    contenedorProds.innerHTML += `
      <div class="card col-md-4 center card border-light mb-3">
        <img class="card-img-top rounded mx-auto d-block" src="${producto.foto}" alt="${producto.nombre}" style="width: 300px">
        <div class="card-body">
          <h3 class="card-title">${producto.nombre}</h3>
          <p class="card-text text-primary">${producto.edicion}</p>
          <p class="card-text">$ ${producto.precio}</p>
          <p class="card-text">Color: ${producto.color}</p>
          <p class="card-text">Talle: ${producto.talle}</p>
          <button id="${producto.id}" class="btn btn-primary compra">Comprar</button>
        </div>
      </div>
    `;
  } 
  actualizarEventosCompra();
  if (carrito.length > 0) {
    renderCarro();
  }
}

////FILTRAR POR COLOR
const filtrar = document.getElementById("btnFilter"); //boton encargado de filtrar
filtrar.addEventListener("click", filtrarPorColor);
const eliminarFiltro = document.createElement("button"); //boton que elimina filtro
eliminarFiltro.textContent = "Eliminar Filtro";
eliminarFiltro.classList.add("btn", "btn-secondary", "ml-2", "btn-sm");
eliminarFiltro.addEventListener("click", eliminarFiltroColor);
filtrar.parentNode.insertBefore(eliminarFiltro, filtrar.nextSibling);
function filtrarPorColor() { //funcion de filtrado por color
  const color = document.getElementById("inputColor").value.toLowerCase();
  if (color !== "") { 
    let prodsFiltradosColor = productos.filter((producto) => {
      const colores = producto.color.split(" - ");
      return colores.includes(color);
    });
    if (prodsFiltradosColor.length === 0) {
      prodsFiltradosColor = productos;
      Toastify({
        text: "Lo sentimos no tenemos disponible ese producto!",
        duration: 3000,
      }).showToast();
    }
    console.log(prodsFiltradosColor);
    actualizarEventosCompra();
    renderizarProds(prodsFiltradosColor);
  }
}
function eliminarFiltroColor() { //funcion que elimina filtro
  document.getElementById("inputColor").value = "";
  renderizarProds(productos);
  actualizarEventosCompra();
}

////FUNCION AGREGAR A CARRITO
function agregarEventoCompra(boton) { //agrego producto seleccionado al carrito
  boton.addEventListener("click", () => {
    const prodACarro = productos.find((producto) => producto.id == boton.id);
    console.log(prodACarro);
    agregarACarro(prodACarro);
  });
}
function actualizarEventosCompra() { //actualizo carrito
  let botones = document.getElementsByClassName("compra");
  for (const boton of botones) {
    agregarEventoCompra(boton);
  }
}
function guardarCarritoEnLocalStorage() { //guardo los productos en el Local Storage 
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
function renderCarro() { //funcion que muestra los productos (que estan en el carrito) en pantalla
  tableBody.innerHTML = "";
  carrito.forEach((producto, indice) => {
    tableBody.innerHTML += `
     <tr>
     <td>${producto.id}</td>
     <td>${producto.nombre}</td>
     <td>${producto.precio}</td>
     <td><button onclick="eliminarDelCarrito(${indice})" class="btn btn-secondary">Eliminar</button></td>
     </tr>
     `;
     calcularTotal();
    });
  }
  function agregarACarro(producto) {
    carrito.push(producto);
    guardarCarritoEnLocalStorage();
    renderCarro();
    Swal.fire('Se agrego el producto al carrito!', '', 'success');
  }

////CALCULAR TOTAL DE LA COMPRA REALIZADA
function calcularTotal() {
  let totalPrecio = carrito.reduce((acumular, producto) => acumular + producto.precio, 0);
  console.log(totalPrecio);
  document.getElementById("total").innerHTML = "TOTAL A PAGAR: $ " + totalPrecio;
}
function eliminarDelCarrito(indice) { //funcion para eliminar productos agregados
  const productoEliminado = carrito[indice];
  carrito.splice(indice, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderCarro();
  calcularTotal();
}
let finCompra = document.getElementById("finalizarBtn"); //producto para finalizar compra
finCompra.onclick = () => {
  localStorage.clear();
  carrito.length = 0;
  tableBody.innerHTML = "";
  document.getElementById("total").innerHTML = "TOTAL A PAGAR: $ ";
  Toastify({
    text: "Finalizaste tu compra, pronto recibiras tu pedido!",
    duration: 3000,
  }).showToast();
};

//// JSON
async function obtenerJsonProds() {
  const URLJSON = './productos.json';
  const respuesta = await fetch(URLJSON);
  const data = await respuesta.json();
  console.log(data);
  productos = data;
  renderizarProds(productos);
}
obtenerJsonProds();



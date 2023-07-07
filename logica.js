let productos;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
localStorage.clear();
carrito.length = 0;
let tableBody = document.getElementById('tablabody');

//cards
let contenedorProds = document.getElementById("misprods");
  function renderizarProds(productos){
    contenedorProds.innerHTML=" "; //vacio contenedor
    for (const producto of productos) {
      contenedorProds.innerHTML+=`
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
  }
  
  //FILTRAR POR COLOR
  const filtrar = document.getElementById("btnFilter") //defino boton que filtra
  filtrar.addEventListener("click",  filtrarPorColor); //evento a boton filtrar
  function filtrarPorColor() {
    const color = document.getElementById("inputColor").value.toLowerCase();
    let prodsFiltradosColor;
    if (color !== "") {
      prodsFiltradosColor = productos.filter((producto) => {
        const colores = producto.color.split(" - ");
        return colores.includes(color);
      });
    } else {
      prodsFiltradosColor = productos;
    }
    console.log(prodsFiltradosColor);
    renderizarProds(prodsFiltradosColor);
    actualizarEventosCompra();
  }
  
  function agregarEventoCompra(boton) { //agrega evento de compra a los botones
    boton.addEventListener("click", () => {
      const prodACarro = productos.find((producto) => producto.id == boton.id);
      console.log(prodACarro);
      agregarACarro(prodACarro);
    });
  }
  function actualizarEventosCompra() {
    let botones = document.getElementsByClassName("compra");
    for (const boton of botones) {
      agregarEventoCompra(boton);
    }
  }
  actualizarEventosCompra();
  function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function renderCarro (){
    tableBody.innerHTML = "";
    carrito.forEach((producto, indice)=>{
      tableBody.innerHTML += `
      <tr>
          <td>${producto.id}</td>
          <td>${producto.nombre}</td>
          <td>${producto.precio}</td>
          <td><button onclick="eliminarDelCarrito(${indice})" class="btn btn-secondary">Eliminar</button></td>
      </tr>
    `;
    calcularTotal();
    })
  }
  function agregarACarro(producto){
  carrito.push(producto);
  guardarCarritoEnLocalStorage();
  renderCarro();
  Swal.fire(
    'Se agrego el producto al carrito!',
    '',
    'success'
  )
}
function calcularTotal(){
  let totalPrecio = carrito.reduce((acumular, producto)=> acumular + producto.precio,0); //el reduce se lo debo aplicar a mi base de datos (a la variable carro)
  console.log(totalPrecio);
  document.getElementById("total").innerHTML = "TOTAL A PAGAR: $ " +totalPrecio;
}
function eliminarDelCarrito(indice) {
  const productoEliminado = carrito[indice];
  carrito.splice(indice, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderCarro();
  calcularTotal();
}


//function guardar en storage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
let finCompra = document.getElementById("finalizarBtn");
finCompra.onclick = ()=>{
  localStorage.clear();
  tableBody.innerHTML = "";
  document.getElementById("total").innerHTML = "TOTAL A PAGAR: $ " ;
  Toastify({
    text: "Finalizaste tu compra, pronto recibiras tu pedido!",
    duration: 3000
  }).showToast();
}

//JSON
async function obtenerJsonProds(){
  const URLJSON = './productos.json';
  const respuesta = await fetch(URLJSON);
  const data = await respuesta.json();
  console.log(data);
  productos = data;
  renderizarProds(productos);
} obtenerJsonProds();
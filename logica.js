let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
localStorage.clear();
carrito.length = 0;
let tableBody = document.getElementById('tablabody');

//cards
let contenedorProds = document.getElementById("misprods");
  function renderizarProds(listaProds){
    contenedorProds.innerHTML=" "; //vacio contenedor
    for (const producto of listaProds) {
      contenedorProds.innerHTML+=`
          <div class="card col-md-4 center card border-light mb-3">
              <img class="card-img-top rounded mx-auto d-block" src="${producto.foto}" alt="${producto.nombre}" style="width: 300px">
              <div class="card-body">
                  <h3 class="card-title">${producto.nombre}</h3>
                  <p class="card-text">$ ${producto.precio}</p>
                  <p class="card-text">Color: ${producto.color}</p>
                  <p class="card-text">Talle: ${producto.talle}</p>
                  <button id="${producto.id}" class="btn btn-primary compra">Comprar</button>
              </div>
          </div>
        `;
      }
  }
  renderizarProds(productos);


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
    // Actualizar los eventos de compra después de aplicar el filtro
    actualizarEventosCompra();
  }
  
  // Función para agregar eventos de compra a los botones
  function agregarEventoCompra(boton) {
    boton.addEventListener("click", () => {
      const prodACarro = productos.find((producto) => producto.id == boton.id);
      console.log(prodACarro);
      agregarACarro(prodACarro);
    });
  }
  // Función para actualizar los eventos de compra en todos los botones
  function actualizarEventosCompra() {
    let botones = document.getElementsByClassName("compra");
    for (const boton of botones) {
      agregarEventoCompra(boton);
    }
  }
  // Llamar a la función para agregar los eventos de compra inicialmente
  actualizarEventosCompra();
  
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
function eliminarDelCarrito(id) {
  carrito = carrito.filter((producto) => producto.id !== id);
  renderCarro();
  if (eliminarDelCarrito.length = 0){
    document.getElementById("total").innerHTML = "TOTAL A PAGAR: $ " ;
  }
}
function calcularTotal(){
  let totalPrecio = carrito.reduce((acumular, producto)=> acumular + producto.precio,0); //el reduce se lo debo aplicar a mi base de datos (a la variable carro)
  console.log(totalPrecio);
  document.getElementById("total").innerHTML = "TOTAL A PAGAR: $ " +totalPrecio;
}
function renderCarro (){
  tableBody.innerHTML = "";
  carrito.forEach((producto)=>{
    tableBody.innerHTML += `
    <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td><button class="eliminar-btn btn btn-secondary">Eliminar</button></td>
    </tr>
  `;
  calcularTotal();
  })
  const botonesEliminar = document.getElementsByClassName("eliminar-btn");
  Array.from(botonesEliminar).forEach((boton, index) => {
    boton.addEventListener("click", function() {
      const id = carrito[index].id;
      eliminarDelCarrito(id);
    });
  });
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




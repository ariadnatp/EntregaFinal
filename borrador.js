let articuloCard = document.getElementById("cartas"); //defino cartas
let tableBody = document.getElementById('tableBody'); //defino tabla
let carro = JSON.parse(localStorage.getItem('carro')) || []; //carro = variable almacenante

const btnFiltrar = document.getElementById("btn-filter") //defino boton que filtra
btnFiltrar.addEventListener("click", filtrarPorColor); //agrego funcion al boton
  function renderizarProds(listaProds){
    for (const producto of productos) { 
        const carta = document.createElement("div");
        carta.className = "card col-md-5";
        carta.innerHTML += `
          <div class="card">
              <img class="card-img-top" src="${producto.foto}" alt="${producto.nombre}" style="width: 90px">
              <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">$ ${producto.precio}</p>
                  <p class="card-text">Color: ${producto.color}</p>
                  <p class="card-text">Talle: ${producto.talle}</p>
                  <button id="${producto.id}" class="btn btn-primary compra">Comprar</button>
              </div>
          </div>
        `;
        articuloCard.appendChild(carta);
      }
  }
  renderizarProds(productos);
  function filtrarPorColor() {
    const color = document.getElementById("inputColor").value.toLowerCase();
    const prodsFiltradosColor = productos.filter((producto) => {
      const colores = producto.color.split(" - ");
      return colores.includes(color);
    });
  
    articuloCard.innerHTML = "";
  
    for (const producto of prodsFiltradosColor) {
      const carta = document.createElement("div");
      carta.className = "card col-md-5";
      carta.innerHTML += `
        <div class="card">
            <img class="card-img-top" src="${producto.foto}" alt="${producto.nombre}" style="width: 90px">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$ ${producto.precio}</p>
                <p class="card-text">Color: ${producto.color}</p>
                <p class="card-text">Talle: ${producto.talle}</p>
                <button id="${producto.id}" class="btn btn-primary compra">Comprar</button>
            </div>
        </div>
      `;
      articuloCard.appendChild(carta);
    }
  }



//carrito
function guardarCarro() {
  localStorage.setItem('carro', JSON.stringify(carro));
}

let botones = document.getElementsByClassName("compra");
for (const boton of botones){
  boton.addEventListener("click", ()=>{

  })
}

let botones = document.getElementsByClassName('compra');
for (const boton of botones) {
  boton.addEventListener('click', () => {
    const prodACarro = productos.find((producto) => producto.id == boton.id);
    if (prodACarro) {
      agregarACarro(prodACarro);
    }else{
      carro.innerHTML = '<p class="empty">No hay productos</p>';
    }
  });

function agregarACarro(producto) {
  carro.push(producto);
  tableBody.innerHTML += `
    <tr>
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
      <button id="eliminar-${producto.id}" class="remove">Eliminar</button>
    </tr>
  `;
 }












let articuloCard = document.getElementById("cartas");
renderizarProds(productos);

const btnFiltrar = document.getElementById("btn-filter")
btnFiltrar.addEventListener("click", filtrarPorColor);

function filtrarPorColor() {
    const colors = document.getElementById("inputColor").value.toLowerCase();
    const prodsFiltradosColor = productos.filter((producto) => {
        const colores = producto.color.split(" - ");
        return colores.includes(color);
      });
  }
function renderizarProds(listaProds){
    for (const producto of listaProds) {
        const carta = document.createElement("div");
        carta.className = "card col-md-5";
        carta.innerHTML += `
          <div class="card">
              <img class="card-img-top" src="${producto.foto}" alt="${producto.nombre}" style="width: 90px">
              <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">$ ${producto.precio}</p>
                  <p class="card-text">Color: ${producto.color}</p>
                  <p class="card-text">Talle: ${producto.talle}</p>
                  <button id="${producto.id}" class="btn btn-primary compra">Comprar</button>
              </div>
          </div>
        `;
        articuloCard.appendChild(carta);
      }
}
renderizarProds(color);






function agregarACarro(producto) {
  carro.push(producto);
  tableBody.innerHTML += `
    <tr>
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
      <button id="eliminar-${producto.id}" class="remove">Eliminar</button>
    </tr>
  `;
  const totalPrecio = productos.reduce((acumulador, producto)=> acumulador + producto.precio,0); //total
    console.log(totalPrecio);
    document.getElementById('total').innerText = `Total a pagar $:${totalPrecio}`;
    //trabajar con el storage
    localStorage.setItem('carro',JSON.stringify(carro));
  guardarCarro();
}
let botones = document.getElementsByClassName('compra');
for (const boton of botones) {
  boton.addEventListener('click', () => {
    const prodACarro = productos.find((producto) => producto.id == boton.id);
    if (prodACarro) {
      agregarACarro(prodACarro);
    }else{
      carro.innerHTML = '<p class="empty">No hay productos</p>';
    }
  });
}

const botonE = document.getElementById("eliminar-${producto.id}");
// Agrego evento al botón capturado.
botonE.addEventListener("click", () => {
  // Si hacemos clic en el botón, se elimina del carrito
  eliminarProducto(producto.id);
});

// const eliminarProducto = (id) => {
// 	// Genero un nuevo carrito con todos los productos menos el que hemos seleccionado
// 	carrito = carrito.filter((producto) => producto.id !== id);
// 	// Guardamos el carrito en el localStorage para tenerlo actualizado si recargamos la página porque hicimos cambios
// 	localStorage.setItem("carrito", JSON.stringify(carrito));
// 	// Actualizamos la vista del carrito porque hemos hecho cambios
// 	mostrarCarrito();
// };
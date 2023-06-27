const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
carrito.length = 0;
let tableBody = document.getElementById('tablabody');

//cards
let contenedorProds = document.getElementById("misprods");
  function renderizarProds(listaProds){
    contenedorProds.innerHTML=" "; //vacio contenedor
    for (const producto of listaProds) {
      contenedorProds.innerHTML+=`
          <div class="card col-md-5 center">
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

  function filtrarPorColor() { //funcion de boton filtrar
    const color = document.getElementById("inputColor").value.toLowerCase();
    const prodsFiltradosColor = productos.filter((producto) => {
      const colores = producto.color.split(" - ");
      return colores.includes(color);
    });
    console.log(prodsFiltradosColor);
    renderizarProds(prodsFiltradosColor);

  }  



  //btn "comprar"
  let botones = document.getElementsByClassName("compra");
  for(const boton of botones){
  boton.addEventListener("click",()=>{
    const prodACarro = productos.find((producto)=> producto.id == boton.id);
    console.log(prodACarro);
    agregarACarro(prodACarro);
  })
}
function agregarACarro(producto){
  carrito.push(producto);
  renderCarro();
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
    </tr>
  `;
  calcularTotal();
  })
}







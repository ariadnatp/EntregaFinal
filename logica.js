const carro = JSON.parse(localStorage.getItem('carro')) || [];
const btnFiltrar = document.getElementById("btnFilter") //defino boton que filtra
btnFiltrar.addEventListener("click",  filtrarPorColor); //evento a boton filtrar

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



  function filtrarPorColor() { //funcion de boton filtrar
    const color = document.getElementById("inputColor").value.toLowerCase();
    const prodsFiltradosColor = productos.filter((producto) => producto.color === "color");
    renderizarProds(prodsFiltradosColor);
  }  

let botones = document.getElementsByClassName("compra");
for(const boton of botones){
  boton.addEventListener("click",()=>{
    const prodACarro = productos.find((producto)=> producto.id ==boton.id);
    console.log(prodACarro);
    agregarACarro(prodACarro);
  })
}

function agregarACarro(producto){
  carro.push(producto);
  console.table(producto);
  tableBody.innerHTML += `
  <tr>
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
  </tr>
`;
localStorage.setItem("carro",JSON.stringify(carro));
calcularTotal(); //llamo a funcion
}

function calcularTotal(){
  let totalPrecio = carro.reduce((acumular, producto)=> acumular + producto.precio,0); //el reduce se lo debo aplicar a mi base de datos (a la variable carro)
  console.log(totalPrecio);
  document.getElementById("total").innerHTML = "total a pagar: $ " +totalPrecio;
}









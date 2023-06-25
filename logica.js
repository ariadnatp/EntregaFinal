const carro = JSON.parse(localStorage.getItem('carro')) || [];
const btnFiltrar = document.getElementById("btnFilter") //defino boton que filtra
btnFiltrar.addEventListener("click",  filtrarPorColor); //evento a boton filtrar

let contenedorProds = document.getElementById("misprods");

  function renderizarProds(listaProds){
    contenedorProds.innerHTML=" "; //vacio contenedor
    for (const producto of listaProds) {
      contenedorProds.innerHTML+=`
          <div class="card col-md-5">
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
  console.table(carro);
  tableBody.innerHTML += `
  <tr>
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
  </tr>
`;
}










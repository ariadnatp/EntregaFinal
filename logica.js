let articuloCard = document.getElementById("cartas");
let tableBody = document.getElementById('tableBody');
const btnFiltrar = document.getElementById("btn-filter")
btnFiltrar.addEventListener("click", filtrarPorColor);
function filtrarPorColor() {
    const color = document.getElementById("inputColor").value.toLowerCase();
    const prodsFiltradosColor = productos.filter((producto) => {
      const colores = producto.color.split(" - ");
      return colores.includes(color);
    });
    console.log(prodsFiltradosColor);
  }
  
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
  let botones = document.getElementsByClassName('compra');
  for (const boton of botones){
    boton.addEventListener("click", ()=>{
        const carro = []
        agregarACarro(prodACarro)
    })
  }

  function agregarACarro(producto){
    carro.push(producto);
    tablaBody.innerHTML += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        </tr>
    `;
    
    localStorage.setItem('carro', JSON.parse(carro));
}
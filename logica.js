let articuloCard = document.getElementById("cartas");
renderizarProds(productos);

const btnFiltrar = document.getElementById("btn-filter")
btnFiltrar.addEventListener("click", filtrarPorColor);
function filtrarPorColor() {
    const colors = document.getElementById("inputColor").value.toLowerCase();
    const prodsFiltradosColor = productos.filter((producto)=>producto.color.includes(colors));
    console.log(prodsFiltradosColor)
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

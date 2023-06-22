function filtrarPorColor() {
    const colors = document.getElementById("inputColor").value.toLowerCase;
    const prodsFiltradosColor = productos.filter((producto)=>producto.color === colors);
    console.log(prodsFiltradosColor)
  }



get_products = (pagina) => {
    arreglo = [];
    const salto = (pagina - 1) * cantidad;
    try {
        resp = fetch(`https://dummyjson.com/products?skip=${salto}&limit=${cantidad}`)
            .then(response => response.json())
            .then(data => {
                totalProductos = data.total;
                return data.products;
            })
            .then(productos => productos.forEach(p => {
                d = {};
                d.id = p.id;
                d.title = p.title;
                d.description = p.description;
                d.price = p.price;
                d.thumbnail = p.thumbnail;
                arreglo.push(d);
            }))
            .then(() => render_products(arreglo));
    }
    catch (error) {
        console.log('Ocurrió un error grave', error)
    }
}

function render_products(products){
    // Paginacion
    numeroPagina.textContent = `Pagina ${paginaActual}`
    botonPagPrevia.disabled = paginaActual === 1;
    botonPagProxima.disabled = (paginaActual * cantidad) >= totalProductos;
    
    // Limpia el contenedor de tarjetas de productos
    const productosContenedor = document.querySelector('.productos-contenedor');
    productosContenedor.innerHTML = '';
    
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card text-center productos-tarjeta';
        card.innerHTML = `
            <img class="card-img-top mx-auto productos-img" src="${p.thumbnail}" alt="Foto del producto">
            <div class="card-body">
                <p class="card-title fst-italic productos-titulo">${p.title}</p>
                <p class="card-text fw-bolder productos-precio">$ ${p.price}</p>
                <button class="btn btn-success btn-sm mt-2 productos-boton">Agregar</button>
            </div>`;
        const botonAgregar = card.querySelector('button');
        botonAgregar.addEventListener('click', () => agregarAlCarrito(p));

        productosContenedor.appendChild(card);
    });
}

function agregarAlCarrito(product){
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // Busca si en el carrito ya existe un producto igual
    indice = carrito.findIndex( e => e.id == product.id);
    if (indice < 0) { // Si el item no existe, lo agrega
        product.cantidad = 1;
        product.subtotal = product.price;
        carrito.push(product)
    }
    else { // Si el item existe, actualiza su cantidad y subtotal
        carrito[indice].cantidad++;
        carrito[indice].subtotal = Math.round(carrito[indice].cantidad * carrito[indice].price * 100) / 100;
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

let paginaActual = 1; // Pagina actual de la paginacion
const cantidad = 20; // Cantidad de productos que se leen en cada consulta a la API
let totalProductos = 0; // Esta variable va a contener la cantidad total de productos

document.addEventListener('DOMContentLoaded', () => {
    const numeroPagina = document.getElementById('numeroPagina');
    const botonPagPrevia = document.getElementById('botonPagPrevia');
    const botonPagProxima = document.getElementById('botonPagProxima');
    
    botonPagPrevia.addEventListener('click', () => {
        if (paginaActual > 1) {
            paginaActual--;
            get_products(paginaActual);
        }
    });

    botonPagProxima.addEventListener('click', () => {
        if (paginaActual * cantidad < totalProductos) {
            paginaActual++;
            get_products(paginaActual);
        }
    });

    productos = get_products(paginaActual);
});

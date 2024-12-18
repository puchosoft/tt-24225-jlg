// +--------------------------+
// | obtenerProductos(pagina) |
// +--------------------------+
// Esta funcion lee el catalogo de la API 'dummyjson.com/products'
// Administra la paginacion del catalogo
// Crea una arreglo con la informacion necesaria de los items de la pagina del catalogo
// Finalmente llama a la funcion de renderizado del catalogo
function obtenerProductos(pagina){
    arreglo = [];
    // Calcula la cantidad de items a "saltar" para ubicarse en la pagina actual
    const salto = (pagina - 1) * cantidad;
    try {
        // Solicita a la API la cantidad de items necesaria
        fetch(`https://dummyjson.com/products?skip=${salto}&limit=${cantidad}`)
        
        // Convierte la respuesta a formato JSON
        .then(response => response.json())
        
        // Obtiene la cantidad total de items del catalogo
        // Retorna el arreglo de productos obtenido
        .then(data => {
            totalProductos = data.total;
            return data.products;
        })

        // Del arreglo de la respuesta obtiene un arreglo resumido
        .then(productos => productos.forEach(p => {
            d = {};
            d.id = p.id;
            d.title = p.title;
            d.description = p.description;
            d.price = p.price;
            d.thumbnail = p.thumbnail;
            d.reviews = p.reviews;
            arreglo.push(d);
        }))

        // Muestra el la pagina del catalogo
        .then(() => renderCatalogo(arreglo));
    }
    // Si no se obtiene respuesta de la API se muestra el codigo de error por la consola
    catch (error) {
        console.log('Ocurrió un error grave', error)
    }
}


// +---------------------------+
// | renderCatalogo(productos) |
// +---------------------------+
// Esta funcion muestra la pagina del catalogo de productos
// El formato mostrado es una grilla
function renderCatalogo(productos){
    // Muestra la paginacion
    // Segun sea la 1ra o la ultima pagina desabilita el boton correspondiente
    numeroPagina.textContent = `Pagina ${paginaActual}`
    botonPagPrevia.disabled = paginaActual === 1;
    botonPagProxima.disabled = (paginaActual * cantidad) >= totalProductos;
    
    // Limpia el contenedor de tarjetas de productos
    const productosContenedor = document.querySelector('.productos-contenedor');
    productosContenedor.innerHTML = '';
    
    // Para cada item del catalogo crea una tarjeta:
    // Miniatura
    // Titulo
    // Precio
    // Boton para agregar al carrito de compras
    productos.forEach(p => {
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


// +---------------------------+
// | agregarAlCarrito(product) |
// +---------------------------+
// Esta funcion atiende el evento del boton AGREGAR
// Administra la contabilidad de items de modo de no repetir el mismo id en la lista
// Si se da el caso de mas de un item con el mismo id, incrementa la cantidad
function agregarAlCarrito(product){
    // Obtiene la clave 'carrito' del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // Busca si en el carrito ya existe un producto con el mismo 'id'
    indice = carrito.findIndex( e => e.id == product.id);
    if (indice < 0) { // Si el id no existe, lo agrega y actualiza el subtotal
        product.cantidad = 1;
        product.subtotal = product.price;
        carrito.push(product)
    }
    else { // Si el item existe, actualiza su cantidad y subtotal
        carrito[indice].cantidad++;
        carrito[indice].subtotal = Math.round(carrito[indice].cantidad * carrito[indice].price * 100) / 100;
    }
    // Actualiza la clave 'carrito' en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // Incrementa el numero de items del carrito
    actualizaItemsCarrito(1);
}


// +--------------------------------+
// | Variables globales principales |
// +--------------------------------+
// Regulan el paginado y la grilla del catalogo de productos

// Lee y actualiza la pagina actual del catalogo en el localStorage
let paginaActual = JSON.parse(localStorage.getItem('paginaCatalogo')) || 1;
localStorage.setItem('paginaCatalogo', JSON.stringify(paginaActual));

const cantidad = 20; // Cantidad de productos que se leen en cada consulta a la API
let totalProductos = 0; // Esta variable va a contener la cantidad total de productos


// +------------------+
// | Evento principal |
// +------------------+
// Cuando termina de cargar el DOM:
// Configura los botones PaginaPrevia y PaginaProxima del paginado
// Renderiza la pagina actual del catalogo de productos
document.addEventListener('DOMContentLoaded', () => {
    const numeroPagina = document.getElementById('numeroPagina');
    const botonPagPrevia = document.getElementById('botonPagPrevia');
    const botonPagProxima = document.getElementById('botonPagProxima');
    
    // Evento que atiende al boton PaginaPrevia
    botonPagPrevia.addEventListener('click', () => {
        if (paginaActual > 1) {
            paginaActual--; // Decrementa la pagina unicamente si la actual es la pagina 2 o mayor
            localStorage.setItem('paginaCatalogo', JSON.stringify(paginaActual));
            obtenerProductos(paginaActual);
        }
    });

    // Evento que atiende al boton PaginaProxima
    botonPagProxima.addEventListener('click', () => {
        if (paginaActual * cantidad < totalProductos) {
            paginaActual++; // Incrementa la pagina unicamente si la actual no es la ultima pagina
            localStorage.setItem('paginaCatalogo', JSON.stringify(paginaActual));
            obtenerProductos(paginaActual);
        }
    });

    productos = obtenerProductos(paginaActual);
});

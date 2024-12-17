// +-----------------+
// | renderCarrito() |
// +-----------------+
// Esta funcion lee los items almacenados en la clave 'carrito' del localStorage
// y los muestra en forma de lista de compras.
// Sumariza los subtotales para obtener el saldo total
// En cada item de la lista hay un boton que permite decrementar la cantidad.
// Al final de la lista hay un boton que permite vaciar el carrito.
// Al final de la lista hay un boton que permite vefificar la compra (solo un mensaje)
function renderCarrito(){
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let saldoTotal = 0;

    const contenedorCarrito = document.querySelector('.carrito-contenedor');
    contenedorCarrito.innerHTML = '';

    carrito.forEach(item => { // Para cada item de la lista:

        // Acumula los subtotales de cada item
        saldoTotal += item.subtotal;

        // Muestra la miniatura
        const carritoImg = document.createElement('img');
        carritoImg.className = 'carrito-img mx-auto';
        carritoImg.src = `${item.thumbnail}`;
        contenedorCarrito.appendChild(carritoImg);

        // Muestra el titulo
        const carritoTitulo = document.createElement('p');
        carritoTitulo.className = 'carrito-titulo py-auto';
        carritoTitulo.innerText = `${item.title}`;
        contenedorCarrito.appendChild(carritoTitulo);

        // Muestra el precio
        const carritoPrecio = document.createElement('p');
        carritoPrecio.className = 'carrito-precio';
        carritoPrecio.innerText = `$ ${item.price}`;
        contenedorCarrito.appendChild(carritoPrecio);

        // Muestra la cantidad
        const carritoCantidad = document.createElement('p');
        carritoCantidad.className = 'carrito-cantidad text-center';
        carritoCantidad.innerText = `x ${item.cantidad}`;
        contenedorCarrito.appendChild(carritoCantidad);

        // Muestra el subtotal
        const carritoSubtotal = document.createElement('p');
        carritoSubtotal.className = 'carrito-subtotal';
        carritoSubtotal.innerText = `$ ${item.subtotal}`;
        contenedorCarrito.appendChild(carritoSubtotal);

        // Muestra el boton Quitar
        const carritoBoton = document.createElement('button');
        carritoBoton.className = 'btn btn-danger btn-sm carrito-boton';
        carritoBoton.innerText = 'Quitar';
        contenedorCarrito.appendChild(carritoBoton);

        carritoBoton.addEventListener('click', () => quitarDelCarrito(item.id));
    });

    // Muestra el saldo total y los botones VACIAR y COMPRAR
    saldoTotal = Math.round(saldoTotal * 100) / 100; // Ajusta precision a 2 digitos decimales
    const totalCarrito = document.querySelector('.carrito-total');
    totalCarrito.innerHTML = `
        <div></div>
        <button class='btn btn-danger btn-sm carrito-vaciar'>Vaciar</button>
        <p class="carrito-precio">TOTAL</p>
        <div></div>
        <p class="carrito-subtotal">$ ${saldoTotal}</p>
        <button class='btn btn-success btn-sm carrito-comprar'>Comprar</button>
    `;

    // Evento para el boton COMPRAR
    botonComprar = document.querySelector('.carrito-comprar');
    botonComprar.addEventListener('click', () => cerrarCompra(saldoTotal));
    botonComprar.disabled = (saldoTotal === 0);

    // Evento para el boton VACIAR (el carrito)
    botonVaciar = document.querySelector('.carrito-vaciar');
    botonVaciar.addEventListener('click', () => vaciarCarrito());
    botonVaciar.disabled = (saldoTotal === 0);
}


// +--------------------+
// | quitarDelCarrito() |
// +--------------------+
// Esta funcion atiende el evento del boton QUITAR (un item de la lista)
// Si la cantidad es 2 o mayor decrementa la cantidad y recalcula el subtotal del item
// Si la cantidad es 1 elimina el item de la lista
// En ambos casos 'refresca' la lista del carrito mostrada.
function quitarDelCarrito(id){
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Busca si hay un item con id coincidente
    indice = carrito.findIndex( item => item.id == id);
    if (carrito[indice].cantidad > 1) { // Si existen varios items con el mismo id, decrementa la cantidad y actualiza el subtotal
        carrito[indice].cantidad--;
        carrito[indice].subtotal = Math.round(carrito[indice].cantidad * carrito[indice].price * 100) / 100;
    }
    else { // Si existe solamente un item, lo elimina del carrito
        carrito.splice(indice, 1);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}


// +---------------------+
// | cerrarCompra(total) |
// +---------------------+
// Esta funcion atiende el evento del boton COMPRAR
// Muestra un mensaje de aviso con el total de la compra
// Vacia el carrito
// Salta a la pagina de Productos
function cerrarCompra(total){
    localStorage.removeItem('carrito');
    alert(`Ud. ha confirmado la compra por un total de $ ${total}`);
    setTimeout(() => {
        window.location.href = 'productos.html'; 
        }, 2000); 
}


// +-----------------+
// | vaciarCarrito() |
// +-----------------+
// Esta funcion atiende el evento del boton VACIAR
// Muestra un mensaje de aviso de vaciado del carrito
// Vacia el carrito
// Salta a la pagina de Productos
function vaciarCarrito(){
    localStorage.removeItem('carrito');
    alert(`Ud. ha vaciado el carrito de compras.`);
    setTimeout(() => {
        window.location.href = 'productos.html'; 
        }, 2000);
}


// +------------------+
// | Evento principal |
// +------------------+
// Cuando termina de cargar el DOM renderiza el carrito
document.addEventListener("DOMContentLoaded", () => {
    renderCarrito();
});

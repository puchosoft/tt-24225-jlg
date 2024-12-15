function renderCarrito(){
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let saldoTotal = 0;

    const contenedorCarrito = document.querySelector('.carrito-contenedor');
    contenedorCarrito.innerHTML = '';

    carrito.forEach(item => {

        // Acumula los subtotales de cada item
        saldoTotal += item.subtotal;

        const carritoImg = document.createElement('img');
        carritoImg.className = 'carrito-img mx-auto';
        carritoImg.src = `${item.thumbnail}`;
        contenedorCarrito.appendChild(carritoImg);

        const carritoTitulo = document.createElement('p');
        carritoTitulo.className = 'carrito-titulo py-auto';
        carritoTitulo.innerText = `${item.title}`;
        contenedorCarrito.appendChild(carritoTitulo);

        const carritoPrecio = document.createElement('p');
        carritoPrecio.className = 'carrito-precio';
        carritoPrecio.innerText = `$ ${item.price}`;
        contenedorCarrito.appendChild(carritoPrecio);

        const carritoCantidad = document.createElement('p');
        carritoCantidad.className = 'carrito-cantidad text-center';
        carritoCantidad.innerText = `x ${item.cantidad}`;
        contenedorCarrito.appendChild(carritoCantidad);

        const carritoSubtotal = document.createElement('p');
        carritoSubtotal.className = 'carrito-subtotal';
        carritoSubtotal.innerText = `$ ${item.subtotal}`;
        contenedorCarrito.appendChild(carritoSubtotal);

        const carritoBoton = document.createElement('button');
        carritoBoton.className = 'btn btn-danger btn-sm carrito-boton';
        carritoBoton.innerText = 'Quitar';
        contenedorCarrito.appendChild(carritoBoton);

        carritoBoton.addEventListener('click', () => quitarDelCarrito(item.id));
    });

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

    // Boton para finalizar la compra
    botonComprar = document.querySelector('.carrito-comprar');
    botonComprar.addEventListener('click', () => cerrarCompra(saldoTotal));
    botonComprar.disabled = (saldoTotal === 0);

    // Boton para vaciar el carrito
    botonVaciar = document.querySelector('.carrito-vaciar');
    botonVaciar.addEventListener('click', () => vaciarCarrito());
    botonVaciar.disabled = (saldoTotal === 0);
}

function quitarDelCarrito(id){
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Busca si hay un item con id coincidente
    indice = carrito.findIndex( item => item.id == id);
    if (carrito[indice].cantidad > 1) { // Si existen varios items con el id, decrementa la cantidad y actualiza el subtotal
        carrito[indice].cantidad--;
        carrito[indice].subtotal = Math.round(carrito[indice].cantidad * carrito[indice].price * 100) / 100;
    }
    else { // Si existe solamente un item, lo elimina del carrito
        carrito.splice(indice, 1);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}

function cerrarCompra(total){
    localStorage.removeItem('carrito');
    alert(`Ud. ha confirmado la compra por un total de $ ${total}`);
    setTimeout(() => {
        window.location.href = 'productos.html'; 
        }, 2000); 
}

function vaciarCarrito(){
    localStorage.removeItem('carrito');
    alert(`Ud. ha vaciado el carrito de compras.`);
    setTimeout(() => {
        window.location.href = 'productos.html'; 
        }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
    renderCarrito();
});
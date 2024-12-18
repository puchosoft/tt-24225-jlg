// +-----------------------------------+
// | actualizaItemsCarrito(incremento) |
// +-----------------------------------+
// Esta funcion mantiene actualizada la cantidad de items del carrito
// y la persiste en el localStorage.
// Mantiene activo el link CARRITO si contiene al menos un item.
function actualizaItemsCarrito(incremento){
    // Lee y actualiza el nº de items del carrito en el localStorage
    let itemsCarrito = JSON.parse(localStorage.getItem('itemsCarrito')) || 0;
    itemsCarrito += incremento;
    localStorage.setItem('itemsCarrito', JSON.stringify(itemsCarrito));
    // Segun el carrito este vacio o no, deshabilita su link
    document.querySelector('header a').className = (itemsCarrito == 0) ? 'pe-none' : 'pe-auto';
    // Muestra la cantidad de items en el link CARRITO
    document.getElementById('itemsCarrito').innerText = itemsCarrito;
}


// Renderiza el 'header'
document.querySelector('header').innerHTML = `
    <img src="./img/mega-super-sale.jpg" alt="logo">
    <h1>De-Todo.com</h1>
    <a href="./carrito.html"><i class="fa-solid fa-cart-shopping fa-lg"></i> Carrito(<span id='itemsCarrito'></span>)</a>
`;
actualizaItemsCarrito(0);


// Renderiza el 'nav'
document.querySelector('nav').innerHTML = `
    <ul class="navbar-nav justify-content-around w-75">
        <li class="nav-item"><a href="./index.html" class="nav-link">Inicio</a></li>
        <li class="nav-item"><a href="./productos.html" class="nav-link">Productos</a></li>
        <li class="nav-item"><a href="./resenas.html" class="nav-link">Reseñas</a></li>
        <li class="nav-item"><a href="./contacto.html" class="nav-link">Contacto</a></li>
    </ul>
`;

// Activa el link de la pagina actual en el NAV
paginaActual = window.location.href;
listaLinks = document.querySelectorAll('nav ul li a')
listaLinks.forEach( link => {
    if (link.href == paginaActual){
        link.classList.add ('active');
    }
});


// Renderiza el 'footer'
document.querySelector('footer').innerHTML = `
    <p>© 2024 <a href="mailto:puchosoft@gmail.com">Jose Luis Gonzalez</a></p>
`;


// Renderiza el 'header'
document.querySelector('header').innerHTML = `
    <img src="./img/mega-super-sale.jpg" alt="logo">
    <h1>Proyecto Integrador</h1>
    <a href="./carrito.html"><i class="fa-solid fa-cart-shopping fa-lg"></i> Carrito</a>
`;


// Renderiza el 'nav'
document.querySelector('nav').innerHTML = `
    <ul class="navbar-nav justify-content-around w-75">
        <li class="nav-item"><a href="./index.html" class="nav-link">Inicio</a></li>
        <li class="nav-item"><a href="./productos.html" class="nav-link">Productos</a></li>
        <li class="nav-item"><a href="./resenas.html" class="nav-link">Reseñas</a></li>
        <li class="nav-item"><a href="./contacto.html" class="nav-link">Contacto</a></li>
    </ul>
`;

// Activa el link de la pagina actual
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


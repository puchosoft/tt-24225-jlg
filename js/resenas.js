// +------------------+
// | Evento principal |
// +------------------+
// Cuando termina de cargar el DOM:
// Muestra todas las reseñas de los productos del carrito
document.addEventListener('DOMContentLoaded', () => {

    // Obtiene el nº de items de carrito del localStorage y el contenedor de reseñas del DOM
    const itemsCarrito = JSON.parse(localStorage.getItem('itemsCarrito')) || 0;
    let resenaContenedor = document.getElementById('resena-contenedor');

    if (itemsCarrito > 0) { // Muestra reseñas si el carrito tiene al menos 1 item
        // Obtiene el arreglo 'carrito' del localStorage
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carrito.forEach( item => { // por cada item del carrito
            item.reviews.forEach( rew => { // por cada comentario del item
                // Crea un DIV con los datos del comentario
                resena = document.createElement('div');
                resena.className = 'resena-item border border-warning-subtle rounded-3 d-flex justify-content-between align-items-center px-2';
                resena.innerHTML = `
                    <p class="fw-bolder resena-titulo">${item.title}</p>
                    <span class="text-warning border-warning-subtle rounded-3 resena-rating">${'*'.repeat(rew.rating)+'&nbsp'.repeat(5 - rew.rating)}</span>
                    <p class="resena-nombre">${rew.reviewerName}</p>
                    <p class="resena-texto">"${rew.comment}"</p>
                    <p class="resena-fecha">${new Date(rew.date).toLocaleDateString()}</p>
                `;
                // Agrega el DIV al contenedor de reseñas
                resenaContenedor.appendChild(resena);
            });
        });
    }
    // Si el carrito está vacio muestra un mensaje informativo
    else {
        const parrafo = document.createElement('p');
        parrafo.innerText = 'No hay reseñas porque el carrito está vacio.';
        parrafo.className = 'align-self-center h-100 fs-3 d-flex align-items-center';
        resenaContenedor.appendChild(parrafo);
    }
});

// Tienda.js
import { jugador } from './Luchar.js';

const itemsTienda = [
    { nombre: 'Espada de Hierro', precio: 10, imagen: 'src/assets/img/img_tienda/Espada.png' },
    { nombre: 'Escudo de Madera', precio: 10, imagen: 'src/assets/img/img_tienda/Escudo.png' },
    { nombre: 'Poción de Curación', precio: 5, imagen: 'src/assets/img/img_tienda/Pocion.png' },
];

const mostrarItemsEnTienda = () => {
    const tiendaItems = document.getElementById('tienda-items');
    const dineroDisponibleTienda = document.getElementById('dinero-disponible-tienda');
    
    if (!dineroDisponibleTienda) {
        console.error('No se encontró el elemento para mostrar el dinero disponible.');
        return;
    }

    tiendaItems.innerHTML = ''; // Limpiar la tienda

   
    dineroDisponibleTienda.textContent = `${jugador.dinero} de oro`;

    // Mostrar artículos en la tienda
    itemsTienda.forEach(item => {
        const card = document.createElement('li');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = item.imagen;
        img.alt = item.nombre;
        img.classList.add('card-imagen');

        const nombre = document.createElement('h3');
        nombre.textContent = item.nombre;

        const precio = document.createElement('p');
        precio.textContent = `${item.precio} de oro`;

        // Crear el botón de compra
        const botonCompra = document.createElement('button');
        botonCompra.textContent = 'Comprar';
        botonCompra.addEventListener('click', () => {
            // Comprobar si el jugador tiene suficiente dinero
            if (jugador.dinero >= item.precio) {
                // Si la compra es exitosa, restamos el precio al dinero del jugador
                jugador.dinero -= item.precio;
                dineroDisponibleTienda.textContent = `${jugador.dinero} de oro`; // Actualizar el dinero disponible en la tienda
                alert(`¡Has comprado un ${item.nombre}!`);
            } else {
                alert('No tienes suficiente oro para comprar este objeto');
            }
        });

        card.appendChild(img);
        card.appendChild(nombre);
        card.appendChild(precio);
        card.appendChild(botonCompra);

        tiendaItems.appendChild(card);
    });
};

export const tiendita = async () => {
    const tienda = document.getElementById('tienda');
    if (!tienda) {
        console.error('No se encontró el elemento de la tienda.');
        return;
    }

    const styles = getComputedStyle(tienda);
    const display = styles.getPropertyValue('display');

    if (display === 'none') {
        console.log('Tienda está oculta');
        tienda.style.display = 'flex'; // Mostrar tienda
        tienda.style.alignItems = 'center';
        tienda.style.justifyContent = 'center';
        mostrarItemsEnTienda(); // Llamamos a mostrar los artículos cuando se abre la tienda
    } else {
        console.log('Tienda está visible');
        tienda.style.display = 'none';
    }
};

// Evento para cerrar la tienda
document.getElementById('cerrar-tienda')?.addEventListener('click', () => {
    const tienda = document.getElementById('tienda');
    if (tienda) {
        tienda.style.display = 'none';
        console.log('Tienda cerrada');
    }
});

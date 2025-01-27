import { combate } from '../model/Luchar.js';
import { tiendita } from '../model/Tienda.js';

const $ = el => document.querySelector(el);

const $luchar = $('#luchar');
const $abrirTienda = $('#abrir-tienda');
const $cerrarTienda = $('#cerrar-tienda'); 
const $tiendaContenedor = $('#tienda'); 

$luchar.addEventListener('click', combate);
$abrirTienda.addEventListener('click', tiendita);

// Función para cerrar la tienda
$cerrarTienda.addEventListener('click', () => {
    $tiendaContenedor.style.display = 'none';
    console.log('Tienda cerrada');
});

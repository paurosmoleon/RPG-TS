import Luchar from '../model/Luchar.js';
import Jugador from '../model/Jugador.js';
import Enemigo from '../model/Enemigo.js';
import Tienda from '../model/Tienda.js';
import Console from '../model/Console.js';
import Estadisticas from '../model/Estadisticas.js';


const $ = el => document.querySelector(el);

const jugador = new Jugador('player');
const enemigo = new Enemigo();

const $luchar = $('#luchar');
const $abrirTienda = $('#abrir-tienda');
const $cerrarTienda = $('#cerrar-tienda');
const $tiendaContenedor = $('#tienda');





const abrirStats = document.getElementById("estadisticas")
const cerraStats = document.getElementById("cerrar-estadisticas") as HTMLButtonElement;
const div = document.getElementById("estadisticas-div") as HTMLDivElement;

cerraStats.addEventListener("click", () => {

  div.style.display = "none";
});

abrirStats.addEventListener("click", () => {

    div.style.display ="block";
});


const mostrarJugador = new Estadisticas(jugador, 'estadisticas-div', enemigo);

// Mostrar estadísticas
mostrarJugador.mostrarEstadisticas();






const luchaClass = new Luchar(enemigo, jugador, Console);
const tiendita = new Tienda(enemigo, jugador, Console);

$luchar.addEventListener('click', () => luchaClass.combate());
$abrirTienda.addEventListener('click', () => tiendita.tiendita());

$cerrarTienda.addEventListener('click', () => {
    $tiendaContenedor.style.display = 'none';
    console.log('Tienda cerrada');
});

document.getElementById('cerrar-tienda')?.addEventListener('click', () => {
    const tienda = document.getElementById('tienda');
    if (tienda) {
        tienda.style.display = 'none';
        console.log('Tienda cerrada');
    }
});

luchaClass.randomEnemy();

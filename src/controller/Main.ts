import Luchar from '../model/Luchar.js';
import Jugador from '../model/Jugador.js';
import Enemigo from '../model/Enemigo.js';
import Tienda from '../model/Tienda.js';
import Console from '../model/Console.js';

const $ = el => document.querySelector(el);

const datosCookies = () => {
    const nombreCookie =document.cookie.split(' ')[0]
    let nombre = nombreCookie.split(':')[1]
    const fuerzaCookie =document.cookie.split(' ')[1]
    let fuerza = fuerzaCookie.split(':')[1]
    const dineroCookie =document.cookie.split(' ')[2]
    let dinero = dineroCookie.split(':')[1]
     console.log(typeof Number(fuerza))
    return [ nombre,Number(fuerza),Number(dinero)]
}
const datos = datosCookies()
console.log(datos[1], typeof datos[1] ===  typeof Number)

const jugador = new Jugador(datos[0].toString(),datos[1],Number(datos[2]))
const enemigo = new Enemigo() 

const $luchar = $('#luchar');
const $abrirTienda = $('#abrir-tienda');
const $cerrarTienda = $('#cerrar-tienda'); 
const $tiendaContenedor = $('#tienda'); 
const luchaClass = new Luchar(enemigo,jugador,Console)
const tiendita = new Tienda(enemigo,jugador,Console)



$luchar.addEventListener('click', () =>  luchaClass.combate());
$abrirTienda.addEventListener('click', () =>  tiendita.tiendita());


enemigo.nombreAleatorio()
const nameEnemy = document.querySelector('#name_enemy')
nameEnemy.textContent = enemigo.nombre
const namePlayer = document.querySelector('#name_player')
namePlayer.textContent = jugador.nombre

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
    luchaClass.randomEnemy()

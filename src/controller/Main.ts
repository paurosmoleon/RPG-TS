import Jugador from "../model/Jugador.js" 
import Enemigo from "../model/Enemigo.js"

const jugador = new Jugador('Carlitos')
jugador.calculaFuerzaInicial()


document.getElementById('boton').addEventListener('click',() => {
    document.getElementById('a').innerHTML = jugador.getAtributos
})

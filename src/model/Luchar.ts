import Jugador from "../model/Jugador.js" 
import Enemigo from "../model/Enemigo.js"

const enemigo = new Enemigo('jose')
const jugador = new Jugador('Carlitos')
jugador.calculaFuerzaInicial()
enemigo.calculaFuerzaEnemigo()

const $ = el => document.querySelector(el)

let turno = 0

const $luchar = $('#luchar')
const $enemigoSalud = $('#salud_enemigo')
const $jugadorSalud = $('#salud_jugador')
const $imgEnemigo = $('#img_enemigo')
const $imgJugador = $('#img_jugador')

    $enemigoSalud.value = enemigo.puntos_salud
    $jugadorSalud.value = jugador.puntos_salud


export  const  combate =  async () => {
    
    while(jugador.puntos_salud > 0 && enemigo.puntos_salud > 0){
        if ( turno === 0){
        if ( enemigo.puntos_salud > 0){
            enemigo.puntos_salud = enemigo.puntos_salud - jugador.puntos_ataque 
            $enemigoSalud.value = enemigo.puntos_salud
            console.log('Salud enemigo: '+enemigo.puntos_salud+' /// has infligido '+jugador.puntos_ataque+' puntos de daño')

        }
       turno = 1
    }else if ( turno === 1){

        if(jugador.puntos_salud > 0){
           
            jugador.puntos_salud = jugador.puntos_salud - enemigo.puntos_ataque
            $jugadorSalud.value = jugador.puntos_salud
            console.log('Salud jugador: '+jugador.puntos_salud+' /// te han inflingido '+ enemigo.puntos_ataque+ ' puntos de daño')

        }
      turno = 0
    }
       await new  Promise((resolve) => setTimeout(resolve,1000))
    }
    
    if ( jugador.puntos_salud < 1){
            $jugadorSalud.style = 'opacity: 0'
            $imgJugador.style = 'opacity: 0'
    } else if(enemigo.puntos_salud < 1){
            $enemigoSalud.style = 'opacity: 0'
            $imgEnemigo.style = 'opacity: 0'
    }     
}



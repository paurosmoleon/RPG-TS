import Jugador from './Jugador.js';


let name = () => {
    let decode = decodeURIComponent(document.cookie)
    return decode.split(':')[1]
}
name()
// Función para mostrar las estadísticas en el HTML
function mostrarEstadisticas(jugador: Jugador): void {
    const nombreElement = document.getElementById('nombre') as HTMLParagraphElement;
    const saludElement = document.getElementById('salud') as HTMLParagraphElement;
    const ataqueElement = document.getElementById('ataque') as HTMLParagraphElement;
    const dineroElement = document.getElementById('dinero') as HTMLParagraphElement;

    nombreElement.textContent = `Nombre: ${jugador.nombre}`;
    saludElement.textContent = `Salud: ${jugador.puntos_salud}`;
    ataqueElement.textContent = `Ataque: ${jugador.puntos_ataque}`;
    dineroElement.textContent = `Dinero: ${jugador.dinero}`;
}

function rerolearEstadisticas(jugador: Jugador): void {
  
    if (jugador.dinero >= 1) {
       
        jugador.dinero -= 1;

      
       
        jugador.calculaFuerzaInicial();
        
       
        mostrarEstadisticas(jugador);
    } else {
        
        console.log('No tienes suficiente dinero para rerolear.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const jugador = new Jugador(name());
    
    jugador.calculaFuerzaInicial();
    mostrarEstadisticas(jugador)

    
    const rerollButton = document.getElementById('rerollButton') as HTMLButtonElement;
    rerollButton.addEventListener('click', () => rerolearEstadisticas(jugador));
});

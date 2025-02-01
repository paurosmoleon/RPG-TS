import Jugador from './Jugador';
import Enemigo from './Enemigo';


class Estadisticas {
    jugador: Jugador;
    enemigo: Enemigo;
    elemento: HTMLElement;

    constructor(jugador: Jugador, idDiv: string, enemigo: Enemigo) {
        this.jugador = jugador;
        this.enemigo = enemigo;
        this.elemento = document.getElementById(idDiv) as HTMLElement;

        if (!this.elemento) {
            throw new Error(`No se encontró un elemento con el ID ${idDiv}`);
        }
    }

    mostrarEstadisticas(): void {
        // Suponiendo que también tienes un objeto enemigo
        const enemigo = this.enemigo; // Cambia esto por la instancia de tu enemigo.
    
        this.elemento.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                <!-- Columna del Jugador -->
                <div style="border: 1px solid black; padding: 10px;">
                    <h3>Estadísticas de ${this.jugador.nombre}</h3>
                    <p>Salud: ${this.jugador.puntos_salud} / ${this.jugador.salud_maxima}</p>
                    <p>Ataque: ${this.jugador.puntos_ataque}</p>
                    <p>Dinero: ${this.jugador.dinero} oro</p>
                </div>
    
                <!-- Columna del Enemigo -->
                <div style="border: 1px solid black; padding: 10px;">
                    <h3>Estadísticas del Enemigo</h3>
                    <p>Salud: ${enemigo.puntos_salud}</p>
                    <p>Ataque: ${enemigo.puntos_ataque}</p>
                </div>
            </div>
        `;
    }
    

    actualizarSalud(salud: number): void {
        this.jugador.puntos_salud = salud;
        this.mostrarEstadisticas();
    }

    actualizarAtaque(ataque: number): void {
        this.jugador.puntos_ataque = ataque;
        this.mostrarEstadisticas();
    }

    actualizarDinero(dinero: number): void {
        this.jugador.dinero = dinero;
        this.mostrarEstadisticas();
    }
}

export default Estadisticas;

class Jugador {
    nombre: string;
    puntos_salud: number;
    salud_maxima: number;
    puntos_ataque: number;
    dinero: number;

    constructor(nombre: string,daño,dinero:number) {
        this.nombre = nombre;
        this.salud_maxima = 100;
        this.puntos_salud = this.salud_maxima;
        this.puntos_ataque = parseInt(daño);
        

        this.dinero = dinero;
    }

    calculaFuerzaInicial() {
        let fuerza_aleatoria = Math.floor(Math.random() * 20) + 10;
        this.puntos_ataque = fuerza_aleatoria;
    }

    comprar(item: { precio: number, nombre: string }): boolean {
        if (this.dinero >= item.precio) {
            this.dinero -= item.precio;
            console.log(`Has comprado ${item.nombre} por ${item.precio} de oro.`);
            return true; // Compra exitosa
        } else {
            console.log('No tienes suficiente dinero para comprar este artículo.');
            return false; // No pudo comprar
        }
    }

    get getAtributos(): string {
        return `Nombre: ${this.nombre}\nSalud: ${this.puntos_salud}\nAtaque: ${this.puntos_ataque}\nDinero: ${this.dinero}`;
    }
}

export default Jugador;

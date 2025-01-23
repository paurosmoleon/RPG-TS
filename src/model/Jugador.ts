class Jugador {
    nombre:string
    puntos_salud: number
    puntos_ataque: number
    dinero: number

    constructor(nombre:string){
        this.nombre = nombre;
        this.puntos_salud = 100
        this.puntos_ataque = 0
        this.dinero = 2
    }

    calculaFuerzaInicial(){
        let fuerza_aleatoria = Math.floor(Math.random() * 20 ) + 10
        this.puntos_ataque = fuerza_aleatoria
    }


    get getAtributos():string{
        return `Nombre: ${this.nombre}\nSalud: ${this.puntos_salud}\nAtaque: ${this.puntos_ataque}\nDinero: ${this.dinero}`
    }
}


export default Jugador

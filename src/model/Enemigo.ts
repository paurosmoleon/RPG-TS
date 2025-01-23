class Enemigo {
    nombre: string;
    puntos_salud: number;
    puntos_ataque: number;

    constructor(nombre:string ){
        this.nombre = nombre;
        this.puntos_salud = 20;
        this.puntos_ataque = 0;
        
    }

    calculaFuerzaEnemigo(){
        let fuerza_aleatoria = Math.floor(Math.random() * 10 ) + 1
        this.puntos_ataque = fuerza_aleatoria
    }

    soltarDinero(){
      return Math.floor(Math.random() * 5 ) + 1
         
    }

}

export default Enemigo
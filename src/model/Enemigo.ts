class Enemigo {
    nombre: string;
    puntos_salud: number;
    puntos_ataque: number;
    

    constructor( ){
        const names = ['Jose','Javi','Marcos','Luis','Jose Luis ','Torrente']
        this.nombre = names[Math.floor(Math.random() * names.length)];
        this.puntos_salud = 100;
        this.puntos_ataque = 0;
        
    }

    calculaFuerzaEnemigo(){
        let fuerza_aleatoria = Math.floor(Math.random() * 15 ) + 4
        this.puntos_ataque = fuerza_aleatoria
    }

    soltarDinero(){
      return Math.floor(Math.random() * 5 ) + 1
         
    }

}

export default Enemigo

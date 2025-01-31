class Enemigo {
    nombre: string;
    puntos_salud: number;
    puntos_ataque: number;
    ronda: number;

    constructor( ){
        const names = ['Jose','Javi','Marcos','Luis','Jose Luis ','Torrente','Warwick','SonicP','Raistlin','Rias','Shifu','Mordekaiser','CucuCabra','સ્કિઝોફ્રેનિયા','Dodo']
        this.nombre = names[Math.floor(Math.random() * names.length)];
        this.puntos_salud = 100;
        this.puntos_ataque = 0;
        this.ronda = 0;
    }

    calculaFuerzaEnemigo(){
        
        let escalado = 5
        let aumento = Math.floor(((this.ronda * 1.25) + escalado))
        let fuerza_aleatoria = Math.floor(Math.random() * 10 ) + aumento
        this.puntos_ataque = fuerza_aleatoria
        this.ronda ++
    }

    soltarDinero(){
        let escalado = 0 + this.ronda
        return Math.floor(Math.random() * 10 ) + ( 3 + escalado)
         
    }

}

export default Enemigo

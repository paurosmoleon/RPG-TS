class Luchar {
    enemigo
    jugador
    $:(el:string) => HTMLElement | null   
    turno: number
    $saludJugador: HTMLMeterElement
    $saludEnemigo: HTMLMeterElement
    
    constructor(enemigo,jugador){
        this.enemigo = enemigo
        this.jugador = jugador
        this.$ = el => document.querySelector(el)
        this.turno = 0

        this.jugador.calculaFuerzaInicial()
        this.enemigo.calculaFuerzaEnemigo()
        this.$saludJugador = this.$('#salud_jugador') as HTMLMeterElement
        this.$saludJugador.value = this.jugador.puntos_salud 
        this.$saludEnemigo = this.$('#salud_enemigo') as HTMLMeterElement
        this. $saludEnemigo.value = this.enemigo.puntos_salud
    }


   async combate () {
        const $imgEnemigo = document.getElementById('img_enemigo')
        const $imgJugador = document.getElementById('img_jugador')

        console.log(this.jugador.puntos_salud)
        while (this.jugador.puntos_salud > 0 && this.enemigo.puntos_salud > 0){
            if (this.turno === 0 && this.enemigo.puntos_salud > 0){
                this.enemigo.puntos_salud -= this.jugador.puntos_ataque
                this.$saludEnemigo.value = this.enemigo.puntos_salud
                this.turno = 1
            }else if( this.turno === 1 && this.jugador.puntos_salud > 0) {
                this.jugador.puntos_salud -= this.enemigo.puntos_ataque
                this.$saludJugador.value = this.jugador.puntos_salud
                this.turno = 0
            }
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
        
        if ( this.jugador.puntos_salud < 1){
            this.$saludJugador.style.opacity = '0'
            $imgJugador.style.opacity = '0'
        } else if ( this.enemigo.puntos_salud < 1){
            this.$saludEnemigo.style.opacity = '0'
            $imgEnemigo.style.opacity = '0'
        }
    }


    
}

export default Luchar

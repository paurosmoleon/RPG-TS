class Luchar {
    enemigo
    jugador
    $:(el:string) => HTMLElement | null   
    turno: number
    $saludJugador: HTMLMeterElement
    $saludEnemigo: HTMLMeterElement
    $consola:HTMLTextAreaElement
    $buttons:any

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
        this.$saludEnemigo.value = this.enemigo.puntos_salud


        this.$consola = this.$('#console') as HTMLTextAreaElement
        this.$buttons = document.querySelectorAll('.boton') as any
    }


   async combate () {
        const $imgEnemigo = document.getElementById('img_enemigo')
        const $imgJugador = document.getElementById('img_jugador')
        this.$buttons.forEach(element => {
            element.disabled = true
            element.classList.add('buttonDisabled')
        })
        console.log(this.jugador.puntos_salud)
        while (this.jugador.puntos_salud > 0 && this.enemigo.puntos_salud > 0){
            if (this.turno === 0 && this.enemigo.puntos_salud > 0){
                this.enemigo.puntos_salud -= this.jugador.puntos_ataque
                this.$saludEnemigo.value = this.enemigo.puntos_salud
                this.$consola.innerHTML += `\nLe has pegado al enemigo ${this.jugador.puntos_ataque}\n`
                if (!$imgEnemigo.classList.contains("hurtAnimationEnemy")){
                    $imgEnemigo.classList.add("hurtAnimationEnemy")
                }
                $imgEnemigo.addEventListener('animationend', () => {
                    $imgEnemigo.classList.remove("hurtAnimationEnemy")
                })
                this.turno = 1
            }else if( this.turno === 1 && this.jugador.puntos_salud > 0) {
                this.jugador.puntos_salud -= this.enemigo.puntos_ataque
                this.$saludJugador.value = this.jugador.puntos_salud
                this.$consola.innerHTML += `\nTe han pegado ${this.enemigo.puntos_ataque}\n`
                this.turno = 0
                if (!$imgJugador.classList.contains("hurtAnimationPlayer")){
                    $imgJugador.classList.add("hurtAnimationPlayer")
                }
                $imgJugador.addEventListener('animationend', () => {
                    $imgJugador.classList.remove("hurtAnimationPlayer")
                })
                this.turno = 0

            }
            this.$consola.scrollTop = this.$consola.scrollHeight
            
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
        
        if ( this.jugador.puntos_salud < 1){
            this.$saludJugador.style.opacity = '0'
            $imgJugador.style.opacity = '0'
        } else if ( this.enemigo.puntos_salud < 1){
            this.$saludEnemigo.style.opacity = '0'
            $imgEnemigo.style.opacity = '0'
        }
        this.$buttons.forEach(element => {
            element.disabled = false
            element.classList.remove('buttonDisabled')

        })
    }


    
}

export default Luchar

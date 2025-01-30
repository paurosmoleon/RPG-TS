import Console from "./Console.js"

class Luchar {
    enemigo
    jugador
    $:(el:string) => HTMLElement | null   
    turno: number
    $saludJugador: HTMLMeterElement
    $saludEnemigo: HTMLMeterElement
    $buttons:any
    console: Console
    round: number
    roundCount: HTMLParagraphElement
    arrayEnemy: Array<string>
    constructor(enemigo,jugador,console){
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
        this.console = new console()
        this.round = 0

         this.roundCount = document.querySelector('#RoundCount')
         this.roundCount.textContent = `Ronda actual ${this.round.toString()}`


        this.$buttons = document.querySelectorAll('.boton') as any
        this.arrayEnemy = ['./src/assets/sprites/Enemigos/Goblin/PNG/PNG Sequences/Slashing/0_Goblin_Slashing_011.png','./src/assets/sprites/Enemigos/Ogre/PNG/PNG Sequences/Slashing/0_Ogre_Slashing_011.png','./src/assets/sprites/Enemigos/Orc/PNG/PNG Sequences/Slashing/0_Orc_Slashing_011.png']

    }
    randomEnemy(){
        const $imgEnemigo = document.getElementById('img_enemigo') as HTMLImageElement
        $imgEnemigo.src = this.arrayEnemy[Math.floor(Math.random() * this.arrayEnemy.length)]
        const battleElement = document.getElementById("battle");

        if (this.round < 5) {
            battleElement.style.backgroundImage = "url('src/assets/sprites/PNG/1/terrace.png')";
        } else if (this.round > 4 && this.round < 10) {
            battleElement.style.backgroundImage = "url('src/assets/sprites/PNG/2/throne room.png')";
        } else if (this.round > 9 && this.round < 15) {
            battleElement.style.backgroundImage = "url('src/assets/sprites/PNG/3/castle.png')";
        } else if (this.round > 14) {
            battleElement.style.backgroundImage = "url('src/assets/sprites/PNG/4/dead forest.png')";
        }

    }

   async combate () {
        const $imgEnemigo = document.getElementById('img_enemigo') as HTMLImageElement
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
                this.console.messageGood(`Le has pegado al enemigo ${this.jugador.puntos_ataque}`)
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
                this.console.messageBad(`Te han pegado ${this.enemigo.puntos_ataque}`)
                this.turno = 0
                if (!$imgJugador.classList.contains("hurtAnimationPlayer")){
                    $imgJugador.classList.add("hurtAnimationPlayer")
                }
                $imgJugador.addEventListener('animationend', () => {
                    $imgJugador.classList.remove("hurtAnimationPlayer")
                })
                this.turno = 0

            }
            this.console.console.scrollTop = this.console.console.scrollHeight
            
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
        
        if ( this.jugador.puntos_salud < 1){
            this.$saludJugador.style.opacity = '0'
            $imgJugador.style.opacity = '0'
            this.playerLose()
        } else if ( this.enemigo.puntos_salud < 1){
            this.$saludEnemigo.style.opacity = '0'
            $imgEnemigo.style.opacity = '0'

            let dineroSoltado = this.enemigo.soltarDinero()
            const dineroHTML = document.querySelector('#dinero-jugador-tienda') as HTMLParagraphElement
            this.jugador.dinero += dineroSoltado
            dineroHTML.innerText = `Oro disponible: ${this.jugador.dinero} de oro`
            this.console.messageShop(`Has ganado ${dineroSoltado} de oro`)

            this.round++
            this.roundCount.textContent = `Ronda actual ${this.round.toString()}`
            
            setTimeout(() => this.respawnEnemy(),1000)
        }
      

    }
    respawnEnemy() {
       
        const $imgEnemigo = document.getElementById('img_enemigo') as HTMLImageElement
        this.randomEnemy()
        this.$saludEnemigo.value = 1000
        this.enemigo.puntos_salud = 100
        

            this.$saludEnemigo.style.opacity = '1'
            $imgEnemigo.style.opacity = '1'
            this.enemigo.calculaFuerzaEnemigo()

            this.$buttons.forEach(element => {
                element.disabled = false
                element.classList.remove('buttonDisabled')
    
            })
        
    }

    playerLose(){
        const gameover = document.querySelector('.gameover') as HTMLDivElement;
        gameover.style.opacity = '0'
        const textGameover = document.querySelector('body')
        textGameover.innerHTML += `<h1 class="over">GAME OVER</h1>`
        textGameover.innerHTML += `<a href="./index.html"><button>Volver al inicio </button></a>`
        
         
        
    }


    
}   

export default Luchar

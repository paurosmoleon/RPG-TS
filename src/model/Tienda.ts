import Console from "./Console.js";

class Tienda {
    enemigo;
    jugador;
    tiendaItems;
    dineroDisponible;
    $saludJugador: HTMLMeterElement;
    $saludEnemigo: HTMLMeterElement;
    console: Console

    constructor(enemigo,jugador,console) {
        this.enemigo = enemigo
        this.jugador = jugador;
        this.tiendaItems = document.getElementById('tienda-items');
        this.dineroDisponible = document.getElementById('dinero-disponible-tienda');

        
        this.tiendaItems.innerHTML = '';
        this.dineroDisponible.textContent = `${jugador.dinero} de oro`;

        this.$saludJugador = document.getElementById('salud_jugador') as HTMLMeterElement
        this.$saludEnemigo = document.getElementById('salud_enemigo') as HTMLMeterElement

        this.console = new console()

    }

    async leerJSONTienda() {
        try {
            const res = await fetch('../../src/assets/json/tienda.json');
            const data = await res.json();
            return data;
        } catch (e) {
            console.log('Error: ' + e);
        }
    }

    mostrarItemsEnTienda() {
        this.tiendaItems.innerHTML = ''; // Limpiar la tienda antes de agregar elementos

        this.leerJSONTienda().then(data => {
            data.forEach(element => {
                console.log(element);
                const card = document.createElement('ul');
                card.classList.add('card');

                const img = document.createElement('img');
                img.src = element.imagen;
                img.alt = element.nombre;
                img.classList.add('card-imagen');

                const nombre = document.createElement('h3');
                nombre.textContent = element.nombre;

                const precio = document.createElement('p');           
                precio.textContent = `${element.precio} de oro`;

                const botonCompra = document.createElement('button');
                botonCompra.textContent = 'Comprar';
                botonCompra.addEventListener('click', () => {

                    if (this.jugador.dinero >= element.precio) {
                        
                        


                        if (element.nombre === 'Poción de Curación') {

                            this.jugador.puntos_salud += element.mejora;

                            if (this.jugador.puntos_salud > this.jugador.salud_maxima) {
                                this.jugador.puntos_salud = this.jugador.salud_maxima;
                                this.console.messageShop(`YA TIENES LA VIDA AL MAXIMO `)
                                this.dineroDisponible.textContent = `${this.jugador.dinero} de oro`;
                                console.log(this.jugador.puntos_salud);
                            }else{
                                this.jugador.dinero -= element.precio;
                                this.console.messageShop(`Has comprado ${element.nombre} `)
                                this.console.messageShop(`Te has curado ${element.mejora} `)
                                this.dineroDisponible.textContent = `${this.jugador.dinero} de oro`;
                                console.log(this.jugador.puntos_salud);
                            }
                            
                           
                        } else if (element.nombre === 'Escudo de Madera') {
                            const saludJugador = document.querySelector('#salud_jugador') as HTMLMeterElement
                            this.jugador.dinero -= element.precio;
                            this.dineroDisponible.textContent = `${this.jugador.dinero} de oro`;
                            this.console.messageShop(`Has comprado ${element.nombre} `)
                            this.jugador.salud_maxima += element.mejora;
                            saludJugador.max = saludJugador.max + element.mejora
                            this.console.messageShop(`Tu vida maxima ha amuentado en ${element.mejora} ahora tienes ${this.jugador.salud_maxima}`)


                        } else if (element.nombre === 'Espada de Hierro') {
                            this.jugador.dinero -= element.precio;
                            this.dineroDisponible.textContent = `${this.jugador.dinero} de oro`;
                            this.console.messageShop(`Has comprado ${element.nombre} `)
                            this.jugador.puntos_ataque += element.mejora;
                             this.console.messageShop(`Tu vida ataque ha amuentado en ${element.mejora} ahora tienes ${this.jugador.puntos_ataque}`)
                        }
                        this.$saludJugador.value = this.jugador.puntos_salud 
                        this.$saludEnemigo.value = this.enemigo.puntos_salud
                        this.console.console.scrollTop =  this.console.console.scrollHeight

                    } else {
                        this.console.messageShop(`No tienes oro suficinete`)
                    }
                });

                card.appendChild(img);
                card.appendChild(nombre);
                card.appendChild(precio);
                card.appendChild(botonCompra);
                this.tiendaItems.appendChild(card);
            });
        });
    }

    async tiendita() {
        const tienda = document.getElementById('tienda');
        const styles = getComputedStyle(tienda);
        const display = styles.getPropertyValue('display');

        if (display === 'none') {
            console.log('Tienda está oculta');
            tienda.style.display = 'flex'; // Mostrar tienda
            tienda.style.alignItems = 'center';
            tienda.style.justifyContent = 'center';
            this.mostrarItemsEnTienda(); // Mostrar artículos al abrir la tienda
        } else {
            console.log('Tienda está visible');
            tienda.style.display = 'none';
        }
    }
}

export default Tienda;

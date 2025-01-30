class Tienda {
    enemigo;
    jugador;
    tiendaItems;
    dineroDisponible;
    $saludJugador: HTMLMeterElement;
    $saludEnemigo: HTMLMeterElement;
    $consola:HTMLTextAreaElement

    constructor(enemigo,jugador) {
        this.enemigo = enemigo
        this.jugador = jugador;
        this.tiendaItems = document.getElementById('tienda-items');
        this.dineroDisponible = document.getElementById('dinero-disponible-tienda');

        
        this.tiendaItems.innerHTML = '';
        this.dineroDisponible.textContent = `${jugador.dinero} de oro`;

        this.$saludJugador = document.getElementById('salud_jugador') as HTMLMeterElement
        this.$saludEnemigo = document.getElementById('salud_enemigo') as HTMLMeterElement

        this.$consola = document.querySelector('#console') as HTMLTextAreaElement

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
                const card = document.createElement('li');
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
                                this.$consola.innerHTML += `\n\n YA TIENES LA VIDA AL MAXIMO \n\n`
                                this.dineroDisponible.textContent = `${this.jugador.dinero} de oro`;
                                console.log(this.jugador.puntos_salud);
                            }else{
                                this.jugador.dinero -= element.precio;
                                this.$consola.innerHTML += `\n Has comprado ${element.nombre}\n`
                                this.$consola.innerHTML += `\n Te has curado ${element.mejora} \n`
                                this.dineroDisponible.textContent = `${this.jugador.dinero} de oro`;
                                console.log(this.jugador.puntos_salud);
                            }
                            
                           
                        } else if (element.nombre === 'Escudo de Madera') {
                            this.jugador.dinero -= element.precio;
                            this.dineroDisponible.textContent = `${this.jugador.dinero} de oro`;
                            this.$consola.innerHTML += `\n Has comprado ${element.nombre}\n`
                            this.jugador.salud_maxima += element.mejora;
                            this.$consola.innerHTML += `\n Tu vida maxima ha amuentado en ${element.mejora} ahora tienes ${this.jugador.salud_maxima} \n`


                        } else if (element.nombre === 'Espada de Hierro') {
                            this.jugador.dinero -= element.precio;
                            this.dineroDisponible.textContent = `${this.jugador.dinero} de oro`;
                            this.$consola.innerHTML += `\n Has comprado ${element.nombre}\n`
                            this.jugador.puntos_ataque += element.mejora;
                            this.$consola.innerHTML += `\n Tu vida ataque ha amuentado en ${element.mejora} ahora tienes ${this.jugador.puntos_ataque} \n`
                        }
                        this.$saludJugador.value = this.jugador.puntos_salud 
                        this.$saludEnemigo.value = this.enemigo.puntos_salud
                        this.$consola.scrollTop = this.$consola.scrollHeight

                    } else {
                        this.$consola.innerHTML += `\n\n No tienes oro suficinete \n\n`
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

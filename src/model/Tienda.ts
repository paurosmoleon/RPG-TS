class Tienda {
    jugador;
    tiendaItems;
    dineroDisponible;

    constructor(jugador) {
        this.jugador = jugador;
        this.tiendaItems = document.getElementById('tienda-items');
        this.dineroDisponible = document.getElementById('dinero-disponible-tienda');

        this.tiendaItems.innerHTML = '';
        this.dineroDisponible.textContent = `${jugador.dinero} de oro`;
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
                                alert("Ya tienes el máximo de vida");
                                this.dineroDisponible.textContent = `${this.jugador.dinero} de oro`;
                                console.log(this.jugador.puntos_salud);
                            }else{
                                this.jugador.dinero -= element.precio;
                                alert(`¡Has comprado un ${element.nombre}!`);
                                alert("Te has curado " + element.mejora);
                                this.dineroDisponible.textContent = `${this.jugador.dinero} de oro`;
                                console.log(this.jugador.puntos_salud);
                            }
                            
                           
                        } else if (element.nombre === 'Escudo de Madera') {
                            this.jugador.dinero -= element.precio;
                            this.dineroDisponible.textContent = `${this.jugador.dinero} de oro`;
                            alert(`¡Has comprado un ${element.nombre}!`);
                            this.jugador.salud_maxima += element.mejora;
                            alert('Tu vida maxima ha aumentado en ' + element.mejora + " ahora tienes " + this.jugador.salud_maxima);
                            

                        } else if (element.nombre === 'Espada de Hierro') {
                            this.jugador.dinero -= element.precio;
                            this.dineroDisponible.textContent = `${this.jugador.dinero} de oro`;
                            alert(`¡Has comprado un ${element.nombre}!`);
                            this.jugador.puntos_ataque += element.mejora;
                            alert('Tu ataque ha aumentado en ' + element.mejora + " ahora tienes " + this.jugador.puntos_ataque);
                        }
                    } else {
                        alert('No tienes suficiente oro para comprar este objeto');
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

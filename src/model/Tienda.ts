class Tienda {
    jugador
    tiendaItems: HTMLElement
    dineroDisponible:HTMLElement
    
    constructor(jugador){
        this.jugador = jugador
        this.tiendaItems = document.getElementById('tienda-items');
        this.dineroDisponible = document.getElementById('dinero-disponible-tienda');


        this.tiendaItems.innerHTML = ''
        this.dineroDisponible.textContent = `${jugador.dinero} de oro`;
    }

    async leerJSONTienda(){
        try{
            const res = await fetch('../../src/assets/json/tienda.json')
            const data = await res.json()
            return data
        } catch (e){
            console.log('Error: '+e)
        }
    }
    mostrarItemsEnTienda(){
        const dataJSON = this.leerJSONTienda()
        dataJSON.then(data => {
        
            data.forEach(element => {
                console.log(element)
                const card = document.createElement('li');
                card.classList.add('card');
                
                const img = document.createElement('img');
                img.src = element.imagen     
                img.alt = element.nombre
                img.classList.add('card-imagen');
                
                const nombre = document.createElement('h3');
                nombre.textContent = element.nombre
                
                const precio = document.createElement('p');           
                precio.textContent = `${element.precio} de oro`;

        const botonCompra = document.createElement('button');
         botonCompra.textContent = 'Comprar';
         botonCompra.addEventListener('click', () => {
             // Comprobar si el jugador tiene suficiente dinero
             if ( this.jugador.dinero >= element.precio) {
                 // Si la compra es exitosa, restamos el precio al dinero del jugador
                 this.jugador.dinero -= element.precio;
                 this.dineroDisponible.textContent = `${element.precio} de oro`; // Actualizar el dinero disponible en la tienda
                 alert(`¡Has comprado un ${element.precio}!`);
             } else {
                 alert('No tienes suficiente oro para comprar este objeto');
             }
         });
         card.appendChild(img);
         card.appendChild(nombre);
         card.appendChild(precio);
         card.appendChild(botonCompra);
         this.tiendaItems.appendChild(card);
            })
        })
    }

    async tiendita(){
        const tienda = document.getElementById('tienda');
        const styles = getComputedStyle(tienda);
        const display = styles.getPropertyValue('display');
        if (display === 'none') {
            console.log('Tienda está oculta');
            tienda.style.display = 'flex'; // Mostrar tienda
            tienda.style.alignItems = 'center';
            tienda.style.justifyContent = 'center';
            this.mostrarItemsEnTienda(); // Llamamos a mostrar los artículos cuando se abre la tiendaç
            } else {
            console.log('Tienda está visible');
            tienda.style.display = 'none';
            }
        
    }

}

export default Tienda

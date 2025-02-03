
## **Clase Jugador**
- **Atributos**:
  - `nombre`: Nombre del jugador.
  - `puntos_salud`: Inicia en 20.
  - `puntos_ataque`: Inicia en 0.
  - `dinero`: Inicia en 2.
- **Constructor**:
  - Recibe `nombre` como parámetro y asigna valores iniciales a los demás atributos.
- **Métodos**:
  - `calcularFuerzaInicial`: Asigna puntos de ataque iniciales de forma aleatoria.
  - Método para imprimir todos los atributos.

---

## **Clase Enemigo**
- **Atributos**:
  - `nombre`: Nombre del enemigo.
  - `puntos_ataque`: Inicia en 0.
- **Constructor**:
  - Recibe `nombre` como parámetro.
- **Métodos**:
  - `calcularFuerzaEnemigo`: Asigna aleatoriamente los puntos de ataque del enemigo.  
    **Comentario**: *Este método calcula la fuerza de forma random.*
  - `soltarDinero`: Devuelve una cantidad de oro aleatoria al ser vencido.

---

## **Función Main**
1. **Preparativos**:
   - Crear un array con nombres de enemigos.
   - Mostrar una introducción a la historia del juego.
   - Solicitar el nombre del jugador por consola y crear el objeto `Jugador`.
   - Calcular fuerza inicial del jugador y ofrecer la opción de volver a calcularla a cambio de 1 oro.

2. **Menú Principal**:
   Mostrar las siguientes opciones (con un `switch` para gestionarlas):
   - **1. Luchar contra el enemigo**:
     - Seleccionar un enemigo aleatoriamente del array.
     - Crear un objeto `Enemigo` con ese nombre y calcular su fuerza.
     - Comparar fuerza del jugador y enemigo:
       - Si el jugador gana, obtiene oro.
       - Si pierde, resta salud dependiendo de la diferencia de ataque.
       - Si la salud llega a 0, el jugador pierde.
   - **2. Comprar ítems**:
     - Mostrar armas y opciones de curación con precios.
     - Verificar si el jugador tiene suficiente oro para comprar.
     - Restar el costo del oro y sumar puntos de ataque o curación según corresponda.
   - **3. Consultar estadísticas**:
     - Mostrar los atributos del jugador.
   - **4. Salir del juego**:
     - Terminar el programa.

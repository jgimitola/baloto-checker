Baloto Checker 💎
=================
Este proyecto es una herramienta web que permite verificar premios en el juego de azar [Baloto](https://www.baloto.com/). Se desarrolla
buscando la comodidad de los apostadores para verificar sus premios. **Esta herramienta no pertenece a Baloto, puede contener errores.**

Si desea probar la versión actual dirijase a: <https://baloto-checker.herokuapp.com/>

Mejoras 🛠
----------
El proyecto necesita las siguientes mejoras:
  1. Mejorar la restricción de sólo números en los campos de las balotas.
  2. **Solucionar bug:** Si se consulta un primero de mes y el sorteo fue el día anterior, el Scrapper carga la página del mes actual que
  está vacía.
  3. Añadir opción de verificar sorteos antiguos.

¿Cómo funciona?
---------------
Para verificar los premios se tienen seis campos donde se deberán ingresar los números de su tiquete de manera ascendente, si no se hace
de esta forma, la página mostrará un mensaje aclarando el orden de lo números y después de 3 segundos se recargará. Al haber ingresado
los números, se debe hacer click en el botón _**Hay Platica?**_, el cual provocará un llamado a las funciones que se encuentran en el
*main.js* que extraerán de la página de Baloto los resultados y los valores de los premios del último sorteo.

¿Con qué fue hecho? 
-------------------
Este proyecto ha sido desarrollado con [JQuery](https://jquery.com/) para hacer el WebScrapping y obtener: acumulados, valor de premios,
y los números ganadores. Además, para la parte del diseño se utilizó [BootStrap](https://getbootstrap.com).

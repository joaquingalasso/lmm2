class Juego {
  constructor() {
    this.mice = null;
    this.estado = 0; // Pantalla inicial es la de los árboles
    this.arboles = [];
    this.glitch = new Glitch(); // Inicializamos el glitch
    this.crearArboles();
    this.tiempoIgnorado = 0; // Tiempo ignorado por el jugador
    this.perder = false;
    this.arbolesIluminadosPorGlitch = 0; // Contador de árboles iluminados por glitch
    this.timer = 25;
    this.timerCreditos = 13;
  }

  crearArboles() {
    // Crear 8 árboles a lo largo del eje x, separados por 210 píxeles
    for (let i = 0; i < 8; i++) {
      let x = 10 + i * (200 + 10);
      let y = 0;
      this.arboles.push(new arbol(x, y));
    }
  }

  crearM() {
    this.mice = new micelio(width / 2, height-50);
  }

  cargaPantalla() {
    if (this.estado === 0 ) {
      image(fondo, 0, 0, width, height);
      if (this.mice && !this.mice.primeraTecla) {
        image(gif, width / 2 - 300, 400, 700, 500); // Ajusta posición y tamaño según necesidad
      }
    } else if (this.estado === 1) {
      this.pantallaGanaste();
    } else if (this.estado === 2) {
      this.mostrarCreditos();
    }
  }
  pantallaGanaste() {

    image(creditosBien, 0, 0, width, height);


    // Temporizador para reiniciar el juego después de unos segundos
    if (frameCount % 60 === 0 && this.timer > 0) {
      this.timer--;
    }
    if (this.timer === 0) {
      this.reiniciarJuego(); // Reinicia después de mostrar la pantalla de victoria
    }
  }

  verificaPosicion() {
    if (!this.mice && this.estado === 0) {
      this.crearM(); // Reinicia el micelio desde abajo
    }
  }

  dibujar() {
    this.cargaPantalla();

    if (this.estado === 0) { // Pantalla de juego activo
      if (this.mice) {
        this.mice.dibujar();
      }
      if (this.glitch.activo) {
        this.glitch.dibujar();
      }
      for (let arbol of this.arboles) {
        arbol.dibujar();
      }



      // Aquí verificamos la pérdida o el avance del juego
      this.verificarPerdida();
    } else if (this.estado === 1) { // Pantalla de victoria
      this.pantallaGanaste();
    } else if (this.estado === 2) { // Pantalla de créditos
      this.mostrarCreditos();
    }
  }

  verificarColisionRaices() {
    for (let arbol of this.arboles) {
      if (this.mice.colisionaCon(arbol)) {
        if (arbol.estadoArb === 0) { // Si el árbol está glitcheado
          arbol.cambiaEstado();

          // Detener el sonido anterior si está sonando
          if (sonidoActual) {
            sonidoActual.stop();
            console.log('Sonido anterior detenido');
          }

          // Reproducir el nuevo sonido solo si el glitch no está activo
          if (!this.todosArbolesIluminados()) {
            let sonidoAleatorio = random(sonido); // `sonido` es tu arreglo de sonidos
            sonidoAleatorio.play();
            console.log('Nuevo sonido reproducido');

            // Actualizar el sonido actual
            sonidoActual = sonidoAleatorio;
          } else if (this.verificarGanador()) {
            let sonidoAleatorio = random(sonido); // `sonido` es tu arreglo de sonidos
            sonidoAleatorio.play();
            console.log('Nuevo sonido reproducido');

            // Actualizar el sonido actual
            sonidoActual = sonidoAleatorio;
          }

          // Si el glitch estaba activo y este era el árbol glitcheado
          if (this.glitch.activo && arbol === this.glitch.arbol) {
            this.glitch.desactivar();
            this.tiempoIgnorado = 0;
            this.arbolesIluminadosPorGlitch++;
            this.timer = 25;
            this.verificarGanador();
          }
        }
      }
    }

    // Activar el glitch solo si todos los árboles están iluminados y no hay glitch activo
    if (this.todosArbolesIluminados() && !this.glitch.activo) {
      this.glitch.activar(this.arboles);
    }
  }

  todosArbolesIluminados() {
    return this.arboles.every(arbol => arbol.estadoArb === 1);
  }

  verificarPerdida() {
    if (this.glitch.activo) {
      if (frameCount % 60 === 0 && this.timer > 0) {
        this.timer--;
      }
      if (this.timer === 0) {
        if (sonidoActual && sonidoActual.isPlaying()) {
          sonidoActual.stop();
        }
        console.log('Tiempo agotado, perdiste');
        this.estado = 2; // Cambia al estado de créditos/perdida
        //this.timer = 5; // Establecer un nuevo temporizador para mostrar créditos antes de reiniciar
      }
    }
  }

  verificarGanador() {
    if (this.arbolesIluminadosPorGlitch >= 3) {
      if (glitchS && glitchS.isPlaying()) {
        glitchS.stop();
      }
      this.estado = 1; // Cambia al estado de "Ganaste"
    }
  }

  controlGlitches() {
    if (this.todosArbolesIluminados() && !this.perder) {
      this.glitch.activar(this.arboles);
      this.verificarPerdida();
    }
  }

  reiniciarJuego() {
    this.estado = 0; // Regresar al estado inicial
    this.mice = null; // Reiniciar micelio
    this.arboles = []; // Vaciar la lista de árboles
    this.crearArboles(); // Crear nuevos árboles
    this.glitch.desactivar(); // Reiniciar glitch
    this.arbolesIluminadosPorGlitch = 0; // Reiniciar contador
    this.timer = 25; // Reiniciar temporizador de juego
    this.timerCreditos = 13; // Reiniciar temporizador de créditos
    console.log("Juego reiniciado");
     // Detener todos los sonidos activos
    if (glitchS && glitchS.isPlaying()) {
        glitchS.stop();
    }
    if (sonidoActual && sonidoActual.isPlaying()) {
        sonidoActual.stop();
    }
  }

  mostrarCreditos() {
    if (this.estado === 2) { // Estado de créditos o pérdida

      image(creditosMal, 0, 0, width, height);

      // Temporizador exclusivo para créditos
      if (frameCount % 60 === 0 && this.timerCreditos > 0) {
        this.timerCreditos--;
      }

      if (this.timerCreditos === 0) {
        this.reiniciarJuego();
      }
    }
  }
}

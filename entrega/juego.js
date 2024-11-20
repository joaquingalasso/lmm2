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
    this.timer = 15;
    this.timerCreditos = 5;
    
  }

  crearArboles() {
    // Crear 8 árboles a lo largo del eje x, separados por 160 píxeles
    for (let i = 0; i < 8; i++) {
      let x = 10 + i * (150 + 10);
      let y = -80;
      this.arboles.push(new arbol(x, y, imgArb, imgArbIlu));
    }
  }

  crearM() {
    this.mice = new micelio(width / 2, height-50);
  }

  cargaPantalla() {
    if (this.estado === 0 ) {
      image(fondo, 0, 0, width, height);
      if (this.mice && !this.mice.primeraTecla) {
        image(gif, width / 2, 400, 700, 500); // Ajusta posición y tamaño según necesidad
      }
    } else if (this.estado === 1) {
      this.pantallaGanaste();
    } else if (this.estado === 2) {
      this.mostrarCreditos();
    }
  }
  pantallaGanaste() {

      image(fondo, 0, 0, width, height);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(32);
      text("Creditos", width / 2,height / 2 - 200);
      textSize(16);
      text("Yamile Nazarena Erbes", width / 2, height / 2 - 150);
      text("Joaquin Galasso", width / 2, height / 2 - 125);
      text("Ailen Avanzini", width / 2, height / 2 - 100);
      text("Zoe Ullua", width / 2, height / 2 - 85);
      text("Mathilda Esteban", width / 2, height / 2 - 60);
      text("Agustina Clar", width / 2, height / 2 - 45);

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

      for (let arbol of this.arboles) {
        arbol.dibujar();
      }

      if (this.glitch.activo) {
        this.glitch.dibujar();
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
        if (this.glitch.activo && arbol === this.glitch.arbol) {
          arbol.cambiaEstado();
          this.glitch.desactivar();
          this.tiempoIgnorado = 0;
          this.arbolesIluminadosPorGlitch++;
          this.timer = 15;
          this.verificarGanador();
        } else if (arbol.estadoArb === 0) {
          arbol.cambiaEstado();
        }
      }
    }

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
        console.log('Tiempo agotado, perdiste');
        this.estado = 2; // Cambia al estado de créditos/perdida
        //this.timer = 5; // Establecer un nuevo temporizador para mostrar créditos antes de reiniciar
      }
    }
  }

  verificarGanador() {
    if (this.arbolesIluminadosPorGlitch >= 1) {
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
    this.timer = 15; // Reiniciar temporizador de juego
    this.timerCreditos = 5; // Reiniciar temporizador de créditos
    console.log("Juego reiniciado");
  }

  mostrarCreditos() {
    if (this.estado === 2) { // Estado de créditos o pérdida
      fill(0);
      rect(0, 0, width, height);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(32);
      text("Creditos", width / 2, height / 2 - 200);
      textSize(16);
      text("Yamile Nazarena Erbes", width / 2, height / 2 - 150);
      text("Joaquin Galasso", width / 2, height / 2 - 125);
      text("Ailen Avanzini", width / 2, height / 2 - 100);
      text("Zoe Ullua", width / 2, height / 2 - 85);
      text("Mathilda Esteban", width / 2, height / 2 - 60);
      text("Agustina Clar", width / 2, height / 2 - 45);

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

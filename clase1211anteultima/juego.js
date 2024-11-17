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
    this.timerCreditos = 25;
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
    this.mice = new micelio(width / 2, height);
  }

cargaPantalla() {
  if (this.estado === 0) {
    image(fondo, 0, 0, width, height);
  } else if (this.estado === 1) {
    this.pantallaGanaste();
  } else if (this.estado === 3) {
    this.mostrarCreditos();
  }
}
  pantallaGanaste() {
  if (this.estado === 1) {
    // Pantalla de ganaste
    fill(0);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("¡Ganaste!", width / 2, height / 2);
  }
}

  verificaPosicion() {
   if (!this.mice && this.estado === 0) {
    this.crearM(); // Reinicia el micelio desde abajo
  }
  }

  dibujar() {
     // Renderiza la pantalla correspondiente según el estado del juego
  this.cargaPantalla(); 

  if (this.estado === 0) { // Pantalla de juego activo
    // Dibuja el micelio
    if (this.mice) {
      this.mice.dibujar();
    }

    // Dibuja los árboles
    for (let arbol of this.arboles) {
      arbol.dibujar();
    }

    // Dibuja el glitch si está activo
    if (this.glitch.activo) {
      this.glitch.dibujar();
    }
  } else if (this.estado === 1) { // Pantalla de victoria
    this.pantallaGanaste(); // La lógica ya está manejada aquí
  } else if (this.estado === 3) { // Pantalla de créditos
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
        this.reiniciarJuego();
        this.perder = true;
      }
    }
  }

  verificarGanador() {
    if (this.arbolesIluminadosPorGlitch >= 5) {
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
    this.mice = null;
    this.glitch.desactivar();
    this.arbolesIluminadosPorGlitch = 0;
    micelio.reiniciar();
    this.timer = 15;
    for (let arbol of this.arboles) {
      arbol.estadoArb = 0; // Reiniciar estado de los árboles
    }
    console.log("Juego reiniciado");
  }

  mostrarCreditos() {
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
    if (frameCount % 60 === 0 && this.timerCreditos > 0) {
      this.timerCreditos--;
    }
    if (this.timerCreditos === 0) {
      this.reiniciarJuego();
    }
  }
}

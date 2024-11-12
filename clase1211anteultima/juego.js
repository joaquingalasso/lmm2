class Juego {
  constructor() {
    this.mice = null;
    this.estado = 0;
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
    // Crear 10 árboles a lo largo del eje x, separados por 30 píxeles
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
    if (img[this.estado]) {
      image(img[this.estado], 0, 0);
    }
  }

  verificaPosicion() {
    if (this.mice && this.mice.llegoAlBordeSuperior()) {
      if (this.estado < 2) {
        this.estado += 1; // Avanza de pantalla
        this.crearM();    // Reinicia el micelio desde abajo
      }
    }
  }

  dibujar() {
    this.mice.dibujar();
    if (this.estado === 2) {
      image(cielo,0,0,width,100);
      image(vege,0,50,width,100);
      for (let arbol of this.arboles) {
        arbol.dibujar();
      }
       image(imgPasto, 0, 100, width, 150);
      this.glitch.dibujar();

      // Actualizar glitches y verificar condiciones de ganar/perder
      this.controlGlitches(); // Método para manejar la activación de glitches y verificación de pérdida
      this.verificarGanador(); // Verificar si se gana
    } else if (this.estado === 3) {
      this.mostrarCreditos(); // Mostrar la pantalla de créditos
    }
  }

  verificarColisionRaices() {
    if (this.estado === 2) {
      for (let arbol of this.arboles) {
        if (this.mice.colisionaCon(arbol)) {
          if (this.glitch.activo && arbol === this.glitch.arbol) {
            arbol.cambiaEstado();
            this.glitch.desactivar();
            this.tiempoIgnorado = 0; // Resetea tiempo ignorado al colisionar
            this.arbolesIluminadosPorGlitch++; // Incrementar contador de árboles iluminados por glitch
          } else if (arbol.estadoArb === 0) {
            arbol.cambiaEstado();
          }
        }
      }

      if (this.todosArbolesIluminados() && !this.glitch.activo) {
        this.glitch.activar(this.arboles);
      }
    }
  }

  todosArbolesIluminados() {
    return this.arboles.every(arbol => arbol.estadoArb === 1);
  }

  verificarPerdida() {
    if (this.glitch.activo) {
       console.log('glitch');
      // Si hay un glitch activo, verificar si han pasado 20 segundos
      if (frameCount%60 === 0 && this.timer > 0) {
      this.timer--;
    }
    if (this.timer ===0){
      console.log('pasó el tiempo');
      reiniciarJuego();
      this.perder=true;
    }
    }
  }

  verificarGanador() {
    // Si el jugador ha iluminado 5 árboles que estaban glitcheados, gana
    if (this.arbolesIluminadosPorGlitch >= 5) {
      this.estado = 3; // Pantalla de créditos
    }
  }

  controlGlitches() {
    if (this.todosArbolesIluminados() && !this.perder) {
      // Si todos los árboles están iluminados y no hemos perdido, se activan los glitches
      this.glitch.activar(this.arboles);

      // Verificar la condición de pérdida
      this.verificarPerdida(); // Verifica si el jugador ha perdido
    }
  }

  mostrarCreditos() {
    // Mostrar la pantalla de créditos
    fill(0); // Color negro
    rect(0, 0, width, height); // Pantalla negra
    fill(255); // Color blanco
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
    if (this.timerCreditos ===0){
      console.log('pasó el tiempo');
      reiniciarJuego();
    }
  }
}

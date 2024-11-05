class Juego {
  constructor() {
    this.mice = null;
    this.estado = 0;
    this.arboles = [];
    this.glitch = new Glitch(); // Inicializamos el glitch
    this.crearArboles();
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
      if (this.estado < 2) { // Solo avanza si el estado es menor a 2
        this.estado += 1;
        this.crearM();
      }
    }
  }
  dibujar() {
    this.mice.dibujar();
    if (this.estado === 2) {
      image(imgPasto, 0, 50, width, 150);
      for (let arbol of this.arboles) {
        arbol.dibujar();
          
      }
   this.glitch.dibujar();  // Dibuja el glitch si está activo
    }
  }

  verificarColisionRaices() {
    if (this.estado === 2) {
      for (let arbol of this.arboles) {
        if (this.mice.colisionaCon(arbol)) {
          if (this.glitch.activo && arbol === this.glitch.arbol) {
            arbol.cambiaEstado();
            this.glitch.desactivar();
          } else if (arbol.estadoArb === 0) {
            arbol.cambiaEstado();
          }
        }
      }

      if (this.todosArbolesIluminados() && !this.glitch.activo) {
        this.glitch.activar(this.arboles, this.mice);
      }
    }
  }

  todosArbolesIluminados() {
    return this.arboles.every(arbol => arbol.estadoArb === 1);
  }
}

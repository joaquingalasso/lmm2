class Juego {
  constructor() {
    this.mice = null;
    this.estado = 0;
     this.arboles = [
      new Arbol(100, 200, 50, 100), // Ejemplo de posiciones de árboles
      new Arbol(600, 200, 50, 100),
      new Arbol(1200, 200, 50, 100)
    ];
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
      this.estado = (this.estado + 1) % img.length; // Cambia de estado cíclicamente
      this.crearM(); // Reinicia el micelio desde el fondo
    }
  }
  

  dibujar() {
    this.mice.dibujar();
   // Dibujar los árboles solo en la pantalla 3
    if (this.estado === 2) {
      for (let arbol of this.arboles) {
        arbol.dibujar();
      }
    }
  }

  verificarColisionRaices() {
    if (this.estado === 2) { // Solo verifica colisión en pantalla 3
      for (let arbol of this.arboles) {
        if (this.mice.colisionaCon(arbol)) {
          arbol.cambiaEstado();
        }
      }
    }
  }
}

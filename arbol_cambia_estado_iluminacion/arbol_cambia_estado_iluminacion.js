class arbol {
  constructor(x, y) {
    this.posicionx = x;
    this.posiciony = y;
    this.ancho = 100; // Ancho del árbol
    this.alto = 500; // Alto del árbol
    this.estado = 0; // Estado inicial, sin iluminación
  }

  cambiaEstado() {
    this.estado = 1; // Cambia el estado para activar la iluminación
  }

  dibujar() {
    // Cambia la imagen del árbol según su estado
    if (this.estado === 0) {
      image(imgArb, this.posicionx, this.posiciony, this.ancho, this.alto); // Imagen normal redimensionada
    } else {
      image(imgArbIlu, this.posicionx, this.posiciony, this.ancho, this.alto); // Imagen iluminada redimensionada
    }
  }
}

class Arbol {
  constructor(x, y, ancho, alto) {
    this.posicionx = x;
    this.posiciony = y;
    this.anchoRaiz = ancho;
    this.altoRaiz = alto;
    this.estado = 0;
  }

  cambiaEstado() {
    this.estado = 1;
  }

  dibujar() {
    fill(this.estado === 1 ? color(100, 255, 100) : color(150, 75, 0)); // Cambia el color si el estado es 1
    rect(this.posicionx, this.posiciony, this.anchoRaiz, this.altoRaiz);
  }
}

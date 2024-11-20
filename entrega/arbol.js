class arbol {
  constructor(x, y, imgNormal, imgIluminado) {
    this.posicionx = x;
    this.posiciony = y;
    this.ancho = 150;
    this.alto = 500;
    this.estadoArb = 0; // Estado inicial, sin iluminación
    this.imgNormal = imgNormal; // Imagen normal (sin iluminar)
    this.imgIluminado = imgIluminado; // Imagen iluminada
  }

  cambiaEstado() {
    this.estadoArb = 1 - this.estadoArb; // Alterna entre 0 (sin iluminar) y 1 (iluminado)
  }

  dibujar() {
    if (this.estadoArb === 0) {
      // Dibuja la imagen normal
      image(this.imgNormal, this.posicionx, this.posiciony, this.ancho, this.alto);
      if (objJuego.glitch.activo) {
        image(
          this.imgNormal,
          random(this.posicionx, this.posicionx + 10),
          random(this.posiciony, this.posiciony + 10),
          this.ancho,
          this.alto
        );
      }
    } else {
      // Dibuja la imagen iluminada
      image(this.imgIluminado, this.posicionx, this.posiciony, this.ancho, this.alto);
    }
  }
}

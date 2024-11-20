class arbol {
  constructor(x, y) {
    this.posicionx = x;
    this.posiciony = y;
    this.ancho = 300;
    this.alto = 500;
    this.estadoArb = 0; // Estado inicial, sin iluminación
  }

  cambiaEstado() {
    this.estadoArb = 1 - this.estadoArb; // Alterna entre 0 (sin iluminar) y 1 (iluminado)
  }

  dibujar() {
    if (this.estadoArb === 0) {
      image(imgArb, this.posicionx, this.posiciony, this.ancho, this.alto); // Imagen normal
      if(objJuego.glitch.activo){ image(imgArb, random(this.posicionx,this.posicionx+10),random(this.posiciony,this.posiciony+10), this.ancho, this.alto);}
    } else {
      image(imgArbIlu, this.posicionx, this.posiciony, this.ancho, this.alto); // Imagen iluminada
    }
  }
}

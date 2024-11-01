class Juego {
  constructor() {
    this.mice = null;
    this.estado = 0;
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
  }
}

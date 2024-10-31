class Juego {
  constructor() {
    this.mice = null; // No se instancia hasta llamar a crearM()
  }

  crearM() {
    this.mice = new micelio(width / 2, height); // Inicia el micelio en el extremo inferior del canvas
  }

  dibujar() {
    this.mice.dibujar(); // Dibuja el micelio
  }
}

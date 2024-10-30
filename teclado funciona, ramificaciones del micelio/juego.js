class Juego {
  constructor() {
    this.mice = new micelio(width / 2, height / 2); // Inicia el micelio directamente en el centro
  }

  crearM() {
    this.mice = new micelio(width / 2, height / 2); // Crea un nuevo micelio en el centro
  }

  dibujar() {
    this.mice.dibujar(); // Dibuja el micelio
   
  }
}

class Juego {
  constructor() {
    this.mice = null;
    this.estado = 0;
     this.arboles = [
     // new arbol(10, 10) // Ejemplo de posiciones de árboles
    ];
    // Crear 10 árboles a lo largo del eje x, separados por 30 píxeles
    for (let i = 0; i < 10; i++) {
      let x = 30 + i * (200 + 30); // Posición inicial + ancho de cada árbol + espacio de 30 píxeles
      let y = 0; // Fijar una posición en y para los árboles
      this.arboles.push(new arbol(x, y));
    }
  }

   crearM() {
    this.mice = new micelio(width / 2, height);
  }


//dibuja las pantallas(fondos)
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
          arbol.cambiaEstado(); // Cambia el estado para usar imgArbIlu al colisionar
        }
      }
    }
  }
}

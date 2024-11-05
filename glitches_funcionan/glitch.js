class Glitch {
  constructor() {
    this.activo = false;
    this.arbol = null;
  }

  activar(arboles, micelio) {
    let arbolesIluminados = arboles.filter(arbol => arbol.estadoArb === 1);
    if (arbolesIluminados.length > 0) {
      this.arbol = random(arbolesIluminados);
      micelio.eliminarZona(this.arbol.posicionx, this.arbol.posiciony, 50); // Elimina el micelio antes
      this.arbol.estadoArb = 0; // Cambia estado del árbol a glitch
      this.activo = true;
    }
  }

  desactivar() {
    this.activo = false;
    this.arbol = null;
  }

  dibujar() {
    if (this.activo && this.arbol) {
      image(glitch, this.arbol.posicionx + this.arbol.ancho/2 + random(-10, 10), this.arbol.posiciony + this.arbol.alto/2 + random(-10, 10), 50, 50);
    }
  }
}

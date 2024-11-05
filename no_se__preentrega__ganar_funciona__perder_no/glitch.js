class Glitch {
  constructor() {
    this.activo = false; // Estado inicial del glitch
    this.arbol = null; // Árbol afectado por el glitch
    this.tiempoActivacion = 0; // Tiempo en el que se activó el glitch
  }

  activar(arboles) {
    // Selecciona un árbol aleatorio que no esté iluminado
    let disponibles = arboles.filter(arbol => arbol.estadoArb === 1); // Solo árboles iluminados
    if (disponibles.length > 0) {
      this.arbol = random(disponibles); // Asigna un árbol aleatorio
      this.arbol.estadoArb = 0; // Cambia el estado a glitcheado
      this.activo = true; // Activa el glitch
      this.tiempoActivacion = millis(); // Registra el tiempo de activación
      //frameCount%60
    }
  }

  desactivar() {
    this.activo = false; // Desactiva el glitch
    this.arbol = null; // Resetea el árbol afectado
  }

  dibujar() {
    // Aquí puedes implementar la lógica para dibujar el glitch si es necesario
    if (this.activo && this.arbol) {
      image(glitch, this.arbol.posicionx + this.arbol.ancho/2 + random(-10, 10), this.arbol.posiciony + this.arbol.alto/2 + random(-10, 10), 50, 50);
    }
  }
}

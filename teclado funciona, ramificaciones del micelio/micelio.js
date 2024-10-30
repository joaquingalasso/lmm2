
class micelio {
  constructor(x, y) {
    this.vida = 3;
    this.conexion = false;
    this.miColor = color(59, 255, 237);
    this.guardaPos = [{ x: x, y: y }];
    this.CuentaPresionesDeTecla = 0;
    this.ramificaciones = [];
  }

  dibujar() {
    stroke(this.miColor);
    strokeWeight(5);
    noFill();

    beginShape(); // Dibuja la línea usando los puntos guardados
    for (let point of this.guardaPos) {
      vertex(point.x, point.y);
    }
    endShape();
     stroke(100, 200, 100);
     for (let rama of this.ramificaciones) {
      line(rama.x1, rama.y1, rama.x2, rama.y2);
    }
  }

  crece(direccion) {
    let ultimaPos = this.guardaPos[this.guardaPos.length - 1]; // Última posición del micelio
    let nuevaPos = { x: ultimaPos.x, y: ultimaPos.y };

    // Mueve el nuevo punto en la dirección adecuada
    if (direccion === 's' || direccion === 'w' || direccion === 'x') {
      nuevaPos.x -= 10; // Izquierda
      
    } else if (direccion === 't' || direccion === 'y' || direccion === 'r' || direccion === 'u') {
      nuevaPos.y -= 10; // Arriba
    
    } else if (direccion === 'l' || direccion === 'k' || direccion === 'i') {
      nuevaPos.x += 10; // Derecha
     
    } else if (direccion === 'c' || direccion === 'v' || direccion === 'b') {
      nuevaPos.y += 10; // Abajo
     
    }

    this.guardaPos.push(nuevaPos); // Agrega el nuevo punto a la trayectoria
    this.CuentaPresionesDeTecla++; // Incrementa el contador de pasos

    // Cada 10 pasos, crea una ramificación
    if (this.CuentaPresionesDeTecla === 5) {
      this.crearRama(nuevaPos); // Dibuja una ramificación desde la nueva posición
      this.CuentaPresionesDeTecla = 0; // Reinicia el contador
    }
  }

  // Función para crear una rama desde la posición dada
  crearRama(pos) {
    stroke(100, 200, 100); // Cambia el color de la rama si lo deseas
    strokeWeight(4);

    // Determina una dirección lateral para la rama, hacia la derecha o izquierda
    let direccionX = random([-20, 20]);
    let direccionY = random([-20, 20]);

  
    // Define los puntos iniciales y finales de la rama
    let rama = {
      x1: pos.x,
      y1: pos.y,
      x2: pos.x + direccionX,
      y2: pos.y + direccionY
    };

    // Agrega la rama a la lista para que permanezca visible
    this.ramificaciones.push(rama);
  }

  muere() {}
  seConecta() {}
}

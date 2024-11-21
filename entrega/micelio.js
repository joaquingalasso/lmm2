class micelio {
  constructor(x, y) {
    this.miColor = color(59, 255, 237);
    this.guardaPos = [{ x: x, y: y }];
    this.CuentaPresionesDeTecla = 0;
    this.ramificaciones = [];
    this.angleChangeAmt = radians(10); // Variación del ángulo
    this.max_age = 800; // Edad máxima de una rama
    this.primeraTecla = false;
    this.cuentaTecla = 1;
      this.estela = []; // Lista para las posiciones del rastro
    this.maxEstela = 250; // Cantidad máxima de puntos en el rastro
  }

  dibujar() {
      this.tamano = 70 + 5 * sin(frameCount * 0.1);
      // Dibuja el rastro primero (se verá detrás)
  this.dibujarEstela();

  // Dibuja la luz en la punta
  this.dibujarLuz();
    stroke(this.miColor);
    strokeWeight(5);
    noFill();
    beginShape();
    for (let punto of this.guardaPos) {
      vertex(punto.x, punto.y);
    }
    endShape();

    stroke(100, 200, 100);
    for (let rama of this.ramificaciones) {
      line( rama.x1, rama.y1, rama.x2, rama.y2);
    }
  }
  
  dibujarLuz() {
   // Obtiene la posición actual de la punta del micelio
    let ultimaPos = this.guardaPos[this.guardaPos.length - 1];
  
    
  
    // Color de la luz
    fill(255, 255, 150); // Amarillo claro
    noStroke();
  
    // Dibuja un círculo amarillo en la punta del micelio
    ellipse(ultimaPos.x, ultimaPos.y, this.tamano, this.tamano);
  
    // Agrega la posición actual al rastro
    this.estela.push({ x: ultimaPos.x, y: ultimaPos.y, alpha: 60 });
  
    // Limita el tamaño máximo del rastro
    if (this.estela.length > this.maxEstela) {
      this.estela.shift(); // Elimina el punto más viejo
    }
}

dibujarEstela() {
  for (let i = 0; i < this.estela.length; i++) {
    let punto = this.estela[i];

    // Reduce gradualmente la transparencia
    punto.alpha -= 1.5;

    // Dibuja cada punto del rastro con transparencia
    fill(255, 255, 200, punto.alpha); // Blanco con un toque de amarillo y transparencia
    noStroke();
     ellipse(punto.x, punto.y, this.tamano, this.tamano);

    // Asegura que la transparencia no sea negativa
    if (punto.alpha < 0) {
      punto.alpha = 0;
    }
  }
}
crece(direccion) {
  if (!this.primeraTecla) {
    this.primeraTecla = true;
  }

  let ultimaPos = this.guardaPos[this.guardaPos.length - 1];
  let nuevaPos = { x: ultimaPos.x, y: ultimaPos.y };
  let randomAngle = random(-this.angleChangeAmt, this.angleChangeAmt);

  // Movimiento basado en la dirección
  if (direccion === 's' || direccion === 'w' || direccion === 'x' || direccion === 'a' || direccion === 'q' || direccion === 'z') {
    nuevaPos.x -= 20 * cos(randomAngle);
    nuevaPos.y -= 20 * sin(randomAngle);
  } else if (direccion === 'r' || direccion === 't' || direccion === 'y' || direccion === 'u' || direccion === 'g' || direccion === 'f') {
    nuevaPos.y -= 20 * cos(randomAngle);
  } else if (direccion === 'k' || direccion === 'l' || direccion === 'o' || direccion === 'i') {
    nuevaPos.x += 20 * cos(randomAngle);
    nuevaPos.y += 20 * sin(randomAngle);
  } else if (direccion === 'c' || direccion === 'v' || direccion === 'b' || direccion === 'n' || direccion === 'm') {
    nuevaPos.y += 20 * cos(randomAngle);
  }

 // Efecto Pacman: paso entre bordes laterales
  if (nuevaPos.x > width) {
    nuevaPos.x = 0; // Aparece en el borde izquierdo
  } else if (nuevaPos.x < 0) {
    nuevaPos.x = width; // Aparece en el borde derecho
  }
  // Constrain para las coordenadas verticales
  nuevaPos.y = constrain(nuevaPos.y, 270, height);
  this.cuentaTecla++;
  this.guardaPos.push(nuevaPos);
  this.CuentaPresionesDeTecla++;
  

  // Crear rama cada 5 movimientos
  if (this.CuentaPresionesDeTecla === 5) {
    this.crearRama(nuevaPos);
    this.CuentaPresionesDeTecla = 0;
  }
}
  crearRama(pos) {
    let direccionX = random([-20, 50]);
    let direccionY = random([-20, 50]);
    let rama = {
      x1: pos.x,
      y1: pos.y,
      x2: pos.x + direccionX * cos(this.angleChangeAmt),
      y2: pos.y + direccionY * sin(this.angleChangeAmt)
    };
    this.ramificaciones.push(rama);
  }

  //llegoAlBordeSuperior() {
  //  return this.guardaPos[this.guardaPos.length - 1].y <= 0;
  //}
  
  colisionaCon(arbol) {
    let ultimaPos = this.guardaPos[this.guardaPos.length - 1];
    return (
      ultimaPos.x > arbol.posicionx &&
      ultimaPos.x < arbol.posicionx + arbol.ancho &&
      ultimaPos.y > arbol.posiciony &&
      ultimaPos.y < arbol.posiciony + arbol.alto
    );
  }
  
  eliminarZona(x, y, radio) {
    this.guardaPos = this.guardaPos.filter(punto => {
      let distancia = dist(punto.x, punto.y, x, y);
      return distancia > radio;
    });
  }
 
   resetearPrimeraTecla() {
    this.primeraTecla = false;
  }

}

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
  }

  dibujar() {
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
      line(rama.x1, rama.y1, rama.x2, rama.y2);
    }
  }

  crece(direccion) {
     if (!this.primeraTecla) {
      this.primeraTecla = true;
    }
      
  let ultimaPos = this.guardaPos[this.guardaPos.length - 1];
  let nuevaPos = { x: ultimaPos.x, y: ultimaPos.y };
  let randomAngle = random(-this.angleChangeAmt, this.angleChangeAmt);

  if (direccion === 's' || direccion === 'w' || direccion === 'x' || direccion === 'a' || direccion === 'q' || direccion === 'z') {
    nuevaPos.x = constrain(nuevaPos.x - 25 * cos(randomAngle), 0, width);
    nuevaPos.y = constrain(nuevaPos.y - 25 * sin(randomAngle), 0, height);
  } else if (direccion === 'r' || direccion === 't' || direccion === 'y' || direccion === 'u' || direccion === 'g' || direccion === 'f') {
    nuevaPos.y = constrain(nuevaPos.y - 25 * cos(randomAngle), 250, height);
  } else if (direccion === 'k' || direccion === 'l' || direccion === 'o' || direccion === 'i') {
    nuevaPos.x = constrain(nuevaPos.x + 25 * cos(randomAngle), 0, width);
    nuevaPos.y = constrain(nuevaPos.y + 25 * sin(randomAngle), 0, height);
  } else if (direccion === 'c' || direccion === 'v' || direccion === 'b' || direccion === 'n' || direccion === 'm') {
    nuevaPos.y = constrain(nuevaPos.y + 25 * cos(randomAngle), 0, height);
  }
this.cuentaTecla++;
  this.guardaPos.push(nuevaPos);
  this.CuentaPresionesDeTecla++;
  
  

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

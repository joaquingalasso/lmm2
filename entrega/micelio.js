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
  this.maxEstela = 500; // Cantidad máxima de puntos en el rastro

  // Arrays de teclas agrupadas por dirección
  this.teclasArriba = ['5', '6', '7', '8', 't', 'y', 'u', 'i', 'g', 'h', 'j', 'k', 
                     '5', '6', '7', '8', 'T', 'Y', 'U', 'I', 'G', 'H', 'J', 'K'];
this.teclasAbajo = ['<', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', ' ', '.', '-', 
                    '<', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', ' ', '.', '-'];
this.teclasIzquierda = ['a', 's', 'z', 'q', '|', '1', '2', '3', '4', 'q', 'w', 'e', 'r', 'a', 's', 'd', 'f', 'TAB',
                        'A', 'S', 'Z', 'Q', '|', '1', '2', '3', '4', 'Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F', 'TAB'];
this.teclasDerecha = ['9', '0', '\'', '¿', 'o', 'p', "Dead", '+', 'l', 'ñ', '{', '}', 'ENTER', 'BACKSPACE',
                      '9', '0', '\'', '¿', 'O', 'P', "Dead", '+', 'L', 'Ñ', '{', '}', 'ENTER', 'BACKSPACE'];

    
   // Contador de pulsaciones para rotar arrays
   this.contadorTeclas = {};
   [...this.teclasArriba, ...this.teclasAbajo, ...this.teclasIzquierda, ...this.teclasDerecha].forEach(tecla => {
     this.contadorTeclas[tecla] = 0;
   });
  }

  dibujar() {
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
  fill(255, 255, 200); // Amarillo claro
  noStroke();

  // Dibuja un círculo amarillo en la punta del micelio
  ellipse(ultimaPos.x, ultimaPos.y, 40, 40);

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
    punto.alpha -= 1;

    // Dibuja cada punto del rastro con transparencia
    fill(255, 255, 200, punto.alpha); // Blanco con un toque de amarillo y transparencia
    noStroke();
    ellipse(punto.x, punto.y, 35, 35);

    // Asegura que la transparencia no sea negativa
    if (punto.alpha < 0) {
      punto.alpha = 0;
    }
  }
}

 // Función para rotar los arrays de teclas
 rotarArrays() {
  let temp = this.teclasArriba;
  this.teclasArriba = this.teclasIzquierda;
  this.teclasIzquierda = this.teclasAbajo;
  this.teclasAbajo = this.teclasDerecha;
  this.teclasDerecha = temp;
}

crece(direccion) {
  if (!this.primeraTecla) {
    this.primeraTecla = true;
  }

  // Inicializar el contador de teclas si no existe
  this.contadorTeclas[direccion] = (this.contadorTeclas[direccion] || 0) + 1;

  let ultimaPos = this.guardaPos[this.guardaPos.length - 1];
  let nuevaPos = { x: ultimaPos.x, y: ultimaPos.y };
  let randomAngle = random(-this.angleChangeAmt, this.angleChangeAmt);

  // Revisar si se presionó la misma tecla 3 veces
  let sentidoInverso = this.contadorTeclas[direccion] === 3;

  // Movimiento basado en los arrays y sentido inverso
  if (this.teclasArriba.includes(direccion)) {
    nuevaPos.y += (sentidoInverso ? 1 : -1) * 20 * cos(randomAngle);
  } else if (this.teclasAbajo.includes(direccion)) {
    nuevaPos.y += (sentidoInverso ? -1 : 1) * 20 * cos(randomAngle);
  } else if (this.teclasIzquierda.includes(direccion)) {
    nuevaPos.x += (sentidoInverso ? 1 : -1) * 20 * cos(randomAngle);
    nuevaPos.y += (sentidoInverso ? 1 : -1) * 20 * sin(randomAngle);
  } else if (this.teclasDerecha.includes(direccion)) {
    nuevaPos.x += (sentidoInverso ? -1 : 1) * 20 * cos(randomAngle);
    nuevaPos.y += (sentidoInverso ? -1 : 1) * 20 * sin(randomAngle);
  }

  // Si el usuario alcanza 3 presiones, debe cambiar de tecla
  if (sentidoInverso) {
    // Resetear contador de la tecla actual para obligar al cambio
    this.contadorTeclas[direccion] = 0;

    // Opcional: Mensaje al usuario (si tienes algún sistema de notificaciones)
    console.log("¡Debes presionar otra tecla para continuar!");
  }

  // Restringir la posición dentro de los límites
  nuevaPos.x = constrain(nuevaPos.x, 0 + 20, width - 20);
  nuevaPos.y = constrain(nuevaPos.y, 270, height);

  // Actualizar el estado
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

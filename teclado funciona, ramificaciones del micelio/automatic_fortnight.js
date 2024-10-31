let objJuego;

function setup() {
  createCanvas(1290, 1080 * 3); // Ancho promedio, altura tres veces la estándar
  objJuego = new Juego(); // Crea el juego y el micelio inicial
  objJuego.crearM(); // Llamamos al método en el objeto creado
}

function draw() {
  background(200);

  // Posición en Y del último punto del micelio
  let micelioY = objJuego.mice.guardaPos[objJuego.mice.guardaPos.length - 1].y;

  // Determinamos el umbral en Y para que la cámara empiece a seguir al micelio
  let umbralY = (3240 - (1080 / 2));

  // Si el micelio está por encima del umbral, la cámara sigue al micelio
  let mueveEjeY;
  if (micelioY < umbralY) {
    mueveEjeY = -micelioY + height / 2;
  } else {
    // Si el micelio está por debajo del umbral, la vista se mantiene en la parte inferior
    mueveEjeY = -umbralY + height / 2;
  }

  translate(0, mueveEjeY); // Ajusta la vista de la cámara
  objJuego.dibujar(); // Dibuja el micelio en la pantalla
}

function keyPressed() {
  if (key) {
    objJuego.mice.crece(key); // Llama a crece con la tecla correspondiente
  }
}

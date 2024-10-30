// archivo juego.js
let objJuego;

function setup() {
  createCanvas(1290, 1080);
  objJuego = new Juego(); // Creamos el juego y el micelio inicial
  objJuego.crearM(); // Llamamos al método en el objeto creado
}

function draw() {
  background(0);
  objJuego.dibujar(); // Dibuja el micelio en la pantalla
 
}

function keyPressed() {
  if (key) {
    objJuego.mice.crece(key); // Llama a crece con la tecla correspondiente
  
}
}

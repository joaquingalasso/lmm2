let objJuego;
let img = [];
let imgArb;
let imgArbIlu;
let imgPasto;
let cielo;
let vege;
let glitch;
let sonidoAmb;
let sonidoGlitch;

function preload() {
  img = [
    loadImage('data/abajo.png'),
    loadImage('data/medio.png'),
    loadImage('data/arriba.png')
  ];
  glitch = loadImage('data/glitch.png');
  vege = loadImage('data/vegetacion.png');
  cielo = loadImage('data/cielo.png');
  imgArb = loadImage('data/arbol1.png');
  imgArbIlu = loadImage('data/arbolCambio.png');
  imgPasto = loadImage('data/pasto.png');
  //sonidoAmb = loadSound('data/sonidoAmb.wav');
  //sonidoGlitch = loadSound('sonidoGlitch.mp3');
}

function setup() {
  createCanvas(1920, 1080);
  reiniciarJuego(); 
}

function draw() {
  objJuego.cargaPantalla(); // Cargar imagen de fondo según el estado
  objJuego.dibujar();
  objJuego.verificaPosicion(); // Verifica si el micelio ha llegado al borde superior
  objJuego.verificarColisionRaices();
 objJuego.verificarPerdida();
}

function reiniciarJuego() {
  objJuego = new Juego(); // Crea el juego y el micelio inicial
  objJuego.crearM(); // Llamamos al método en el objeto creado
}

function keyPressed() {
  if (key) {
    objJuego.mice.crece(key); // Llama a crece con la tecla correspondiente
  }
}

/*
function mousePressed() {
  reiniciarJuego();
}
*/

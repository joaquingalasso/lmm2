let objJuego;
let fondo;
let imgArb;
let imgArbIlu;
let imgPasto;
let cielo;
let vege;
let glitch;
let sonidoAmb;
let sonidoGlitch;

function preload() {
  fondo = loadImage('data/arriba.png');
  glitch = loadImage('data/glitch.png');
  vege = loadImage('data/vegetacion.png');
  cielo = loadImage('data/cielo.png');
  imgArb = loadImage('data/arb1osc.png');
  imgArbIlu = loadImage('data/arb1ilu.png');
  imgPasto = loadImage('data/pasto.png');
  //sonidoAmb = loadSound('data/sonidoAmb.wav');
  //sonidoGlitch = loadSound('sonidoGlitch.mp3');
}

function setup() {
  createCanvas(1920, 1080);
  reiniciarJuego(); 
}

function draw() {
  objJuego.cargaPantalla(); // Cargar imagen de fondo 
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

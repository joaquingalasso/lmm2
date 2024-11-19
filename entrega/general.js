let objJuego;
let fondo;
let imgArb;
let imgArbIlu;
let glitch;
let sonidoAmb;
let sonidoGlitch;
let gif;

function preload() {
  gif = loadImage('data/signo.gif');
  fondo = loadImage('data/fondo.jpg');
  glitch = loadImage('data/sombra.gif');
  imgArb = loadImage('data/arb1osc.png');
  imgArbIlu = loadImage('data/arb1ilu.png');
  //sonidoAmb = loadSound('data/sonidoAmb.wav');
  //sonidoGlitch = loadSound('sonidoGlitch.mp3');
}

function setup() {
  
  createCanvas(1850, 950);
  reiniciarJuego(); 
}

function draw() {
  background(10);
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
  //objJuego.keyPressed();
  if (key) {
    objJuego.mice.crece(key); // Llama a crece con la tecla correspondiente
  }
}

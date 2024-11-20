let objJuego;
let fondo;
let imgArb;
let imgArbIlu;
let glitch;
let sonidoAmb;
let sGlitch;
let gif;
let rami;
let sonido;
let sonidoActual = null; 
let creditosBien;
let creditosMal;
let glitchS;
function preload() {
  sonido = [
    loadSound('data/s1.mp3'),
    loadSound('data/s2.mp3'),
    loadSound('data/s3.mp3'),
    loadSound('data/s4.mp3'),
    loadSound('data/s5.mp3')
  ];
  glitchS = loadSound('data/glitch.mp3');
 
  gif = loadImage('data/signo.gif');
  fondo = loadImage('data/fondo.jpg');
  glitch = loadImage('data/sombra.gif');
  creditosBien = loadImage('data/creditosB.gif');
  creditosMal = loadImage('data/creditosM.gif');
  imgArb = loadImage('data/arb2osc.png');
  imgArbIlu = loadImage('data/arb2ilu.png');
  
  //sonidoAmb = loadSound('data/sonidoAmb.wav');
  //sonidoGlitch = loadSound('sonidoGlitch.mp3');
}

function setup() {
  
  createCanvas(1920, 1080);
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

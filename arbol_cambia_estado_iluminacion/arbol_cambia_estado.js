let objJuego;
let img = [];
let imgArb ;
let imgArbIlu ;
function preload(){
img = [loadImage ('data/pantalla1.png'),
loadImage ('data/pantalla2.png'),
loadImage ('data/pantalla3.png')
];
imgArb = loadImage ('data/arbol1.png');

imgArbIlu =loadImage ('data/arbolCambio.png');
}
function setup() {
  
  createCanvas(1920, 1080 ); 
  objJuego = new Juego(); // Crea el juego y el micelio inicial
  objJuego.crearM(); // Llamamos al método en el objeto creado
}

function draw() {

  objJuego.cargaPantalla(); // Cargar imagen de fondo según el estado
  objJuego.dibujar();
  objJuego.verificaPosicion(); // Verifica si el micelio ha llegado al borde superior
  objJuego.verificarColisionRaices();
}

function keyPressed() {
  if (key) {
    objJuego.mice.crece(key); // Llama a crece con la tecla correspondiente
  }
}

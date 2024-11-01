let objJuego;
let img = [];
function preload(){
img = [loadImage ('data/pantalla1.png'),
loadImage ('data/pantalla2.png'),
loadImage ('data/pantalla3.png')
];
}
function setup() {
  
  createCanvas(1920, 1080 ); // Ancho promedio, altura tres veces la estándar
  objJuego = new Juego(); // Crea el juego y el micelio inicial
  objJuego.crearM(); // Llamamos al método en el objeto creado
}

function draw() {
  
background(200);
  objJuego.cargaPantalla(); // Cargar imagen de fondo según el estado
  objJuego.dibujar();
  objJuego.verificaPosicion(); // Verifica si el micelio ha llegado al borde superior
}

function keyPressed() {
  if (key) {
    objJuego.mice.crece(key); // Llama a crece con la tecla correspondiente
  }
}

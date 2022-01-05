var xBolinha = 300,
  yBolinha = 200,
  diametro = 25;

let raio = diametro / 2;

let velocidadeX = 6,
  velocidadeY = 6;

let velocidadeOpY;

let raqueteX = 5;
let raqueteY = 160;
let raqueteComprimento = 10;
let raqueteAltura = 80;

let raqueteOpX = 585;
let raqueteOpY = 160;

let colidiu = false;

let meusPontos = 0,
  opPontos = 0;

let raquetada, trilha, ponto;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);

  circle(xBolinha, yBolinha, diametro);

  xBolinha += velocidadeX;
  yBolinha += velocidadeY;

  verificarColisaoBordas();

  mostraRaquete(raqueteX, raqueteY);
  mostraRaquete(raqueteOpX, raqueteOpY);

  if (keyIsDown(DOWN_ARROW)) {
    raqueteY += 8;
  }

  if (keyIsDown(UP_ARROW)) {
    raqueteY -= 8;
  }

  movimentaOp();

  // verificarColisaoRaquete();

  colisaoRaqueteLib(raqueteX, raqueteY);
  colisaoRaqueteLib(raqueteOpX, raqueteOpY);

  incluirPlacar();

  marcarPontos();
}

function preload() {
  raquetada = loadSound("assets/raquetada.mp3");
  trilha = loadSound("assets/trilha.mp3");
  ponto = loadSound("assets/ponto.mp3");
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura, 10);
}

function verificarColisaoBordas() {
  if (xBolinha + raio >= width || xBolinha - raio <= 0) {
    velocidadeX *= -1;
  }

  if (yBolinha + raio >= height || yBolinha - raio < 0) {
    velocidadeY *= -1;
  }
}

function verificarColisaoRaquete() {
  if (
    xBolinha - raio < raqueteX + raqueteComprimento &&
    yBolinha - raio < raqueteY + raqueteAltura &&
    yBolinha + raio > raqueteY
  )
    velocidadeX *= -1;
}

function movimentaOp() {
  if (velocidadeX > 0) {
    velocidadeOpY = yBolinha - raqueteOpY - raqueteComprimento / 2 - 30;

    raqueteOpY += velocidadeOpY;
  }
}

function colisaoRaqueteLib(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    diametro
  );

  if (colidiu) {
    velocidadeX *= -1;
    raquetada.play();
  }
}

function incluirPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);

  text(meusPontos, 170, 26);

  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);

  text(opPontos, 470, 26);
}

function marcarPontos() {
  if (xBolinha > 587) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 13) {
    opPontos += 1;
    ponto.play();
  }
}

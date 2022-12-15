let suisse = "ApfelGrotezk-Regular.otf";
let font;

let inputSize;
let inp;

let elements = [];
let b;
let rot = 0;
let inversion = 1;
let spacing = 0;
let frequency = 5;
let s, c;

let cYellow = [255, 230, 0],
  cPink = [235, 0, 215],
  cGreen = [75, 230, 30],
  cRed = [250, 0, 15];
let bgColors = [cYellow, cPink, cGreen, cRed];
let bgColorIndex = 0;

let bg_1 = "StudioAperto_1.png",
  bg_2 = "StudioAperto_2.png",
  bg_3 = "StudioAperto_3.png";
let img_1, img_2, img_3;
let backgrounds = [];
let bgImageIndex = 0;

function preload() {
  font = loadFont(suisse);
  img_1 = loadImage(bg_1);
  img_2 = loadImage(bg_2);
  img_3 = loadImage(bg_3);
  backgrounds = [img_1, img_2, img_3];
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  s = createGraphics(window.innerWidth, window.innerHeight);
  c = createGraphics(window.innerWidth, window.innerHeight);
  inp = createInput();
}
function mousePressed() {
  inversion *= -1;

  if (
    mouseX > 39 - 13 &&
    mouseX < 39 + 13 &&
    mouseY > height - 37.5 - 13 &&
    mouseY < height - 37.5 + 13
  ) {
    elements.splice(0, elements.length);
    bgColorIndex = (bgColorIndex + 1) % 4;
    bgImageIndex = (bgImageIndex + 1) % 3;
  }

  if (
    mouseX > 89 - 13 &&
    mouseX < 89 + 13 &&
    mouseY > height - 37.5 - 13 &&
    mouseY < height - 37.5 + 13
  ) {
    saveCanvas(s, inp.value(), "png");
  }
}

function mouseDragged() {
  rot = rot + (inversion * PI) / 180;

  spacing++;

  if (spacing % frequency == 0) {
    elements.push(b);
  }
}

function draw() {
  b = new Box(mouseX, mouseY, 30, 15, rot);
  s.background(
    bgColors[bgColorIndex][0],
    bgColors[bgColorIndex][1],
    bgColors[bgColorIndex][2]
  );

  s.translate(width / 2 - 250, -70);
  s.scale(0.25);
  s.image(backgrounds[bgImageIndex], 0, 0);
  s.resetMatrix();

  if (mouseIsPressed == false) {
    rot = 0;
  }

  //input styling
  inp.position(width / 2 - inputSize / 2, height - 51);
  inp.size(inputSize);
  inp.style("text-align", "center");
  inp.style("font-size", "20px");
  inp.style("border", "1px solid black");
  inp.style("outline", "none");

  for (let i = 0; i < elements.length; i++) {
    elements[i].display();
  }

  if (elements.length == 0) {
    inputSize = 117;
    inp.value("Mistaker");
  } else {
    inputSize = 10 + elements[0].bbox.w;
  }

  c.push();
  c.stroke(0);
  c.fill(255);
  c.rectMode(CENTER);
  c.rect(39, height - 37.5, 26, 26, 20);
  c.rect(89, height - 37.5, 26, 26, 20);
  c.fill(0);
  c.noStroke();
  c.textFont(font);
  c.textSize(20);
  c.textAlign(CENTER, CENTER);
  c.text("R", 39, height - 39.5);
  c.text("S", 89, height - 39.5);
  c.pop();

  image(s, 0, 0);
  image(c, 0, 0);
  push();
  textAlign(CENTER);
  textSize(20);
  textFont(font);
  text("type here ↓", width / 2 + 5, height - 61);
  pop();
}

class Box {
  constructor(x, y, size, padding, rotation) {
    //this.text = inp.value();
    this.size = size;
    this.padding = padding;
    this.color = color;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }

  display() {
    this.text = inp.value();

    s.translate(this.x, this.y);
    s.rotate(this.rotation);
    this.bbox = font.textBounds(this.text, 0, 0, this.size, CENTER);
    s.fill(255);
    s.stroke(0);
    s.rectMode(CENTER);
    s.rect(this.bbox.x - this.padding / 2, -27, this.bbox.w + this.padding, 35);
    s.fill(0);
    s.noStroke();

    s.textAlign(CENTER, CENTER);
    s.textFont(font);
    s.textSize(this.size);
    s.text(this.text, -6, -31);
    s.resetMatrix();
  }
}

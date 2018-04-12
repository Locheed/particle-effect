let particles = [];
let wind = 0;
let center = false;
let slider;

function setup() {
  const canvas = createCanvas(800, 600);
  canvas.mouseMoved(windChange);
  canvas.mouseOut(() => wind = 0); // Return wind degree back to center
  canvas.mouseClicked(changeStyle);
  slider = createSlider(1, 5, 1); // Slider to choose amount of particles drawn on each run 1-5
  slider.position(10, 10);
  slider.style("width", "80px");
}

function windChange() {
  // Trick to position relative to center of a canvas. 300px
  if (mouseX > 400) {
    wind = Math.floor(mouseX / 100 - 2); // Wind between 1 to 4
  } else {
    wind = Math.floor(Math.abs(mouseX / 100 - 2) * -1); // Wind between -4 to -1
  }
}

function changeStyle() {
  center === false ? (center = true) : (center = false);
}

function draw() {
  background(0);
  let sliderValue = slider.value();
  for (i = 1; i <= sliderValue; i++) {
    let p = new Particle();
    particles.push(p);
  }

  particles.forEach((particle, i) => {
    particle.update();
    particle.show();
    if (particle.remove()) {
      particles.splice(i, 1); // Remove particle when alpha value is less than 0
    }
  });
  // Slider amount
  textSize(16);
  text(sliderValue, 90, 20);
  fill(255, 255, 255);
}

class Particle {
  constructor() {
    this.x = 400;
    this.y = center === false ? 620 : 300; // Place point of origin to center or bottom
    this.vx = wind != 0 ? wind : random(-2, 2); // Use wind or randomize
    this.vy = center === false ? random(-5, -1) : random(-5, 5); // Drag particles up direction or all around
    this.alpha = 255;
    this.R = random(0, 255);
    this.G = random(0, 255);
    this.B = random(0, 255);
    this.size = random(6, 32);
  }

  remove() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1;
  }

  show() {
    noStroke();
    fill(this.R, this.G, this.B, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}

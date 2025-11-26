// Aydin_SS4

let port;
let sensors = [0, 0, 0, 0]; 

let bgBrightness, sunY, mountainColor, showTrees = true;

function setup() {
  createCanvas(800, 600); 
  port = createSerial();
  port.openPrompt();
  noStroke();
}

function draw() {
  bgBrightness = map(sensors[0], 0, 1023, 20, 255);
  sunY = map(sensors[1], 0, 1023, height * 0.2, height);
  mountainColor = map(sensors[2], 0, 1023, 50, 200);
  showTrees = sensors[3] === 0;

  background(bgBrightness, bgBrightness, 255);

  fill(255, 220, 0);
  circle(width * 0.8, sunY, 100);

  fill(mountainColor, 100, 80);
  triangle(0, height, width * 0.3, height * 0.5, width * 0.6, height);
  fill(mountainColor + 30, 120, 90);
  triangle(width * 0.4, height, width * 0.7, height * 0.4, width, height);

  if (showTrees) {
    fill(34, 139, 34);
    rect(150, height - 120, 20, 80);
    triangle(140, height - 120, 160, height - 200, 180, height - 120);

    rect(600, height - 100, 20, 80);
    triangle(590, height - 100, 610, height - 180, 630, height - 100);
  }
}

function serialEvent() {
  let data = port.readUntil("\n");
  if (data.length > 0) {
    let values = data.trim().split(",");
    if (values.length === 4) {
      for (let i = 0; i < 4; i++) {
        sensors[i] = int(values[i]);
      }
    }
  }
}

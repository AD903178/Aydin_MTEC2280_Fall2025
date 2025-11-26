// Aydin_SS3

let port;
let sensorValue = 0;

function setup() {
  createCanvas(800, 600); 
  
  port = createSerial();
  port.openPrompt();

  noStroke();
}

function draw() {
  // the background brightness is controlled by the sensor
  let bg = map(sensorValue, 0, 1023, 20, 255);
  background(bg);

  // circleSize controlled by sensor
  let circleSize = map(sensorValue, 0, 1023, 50, 300);
  fill(255, 100, 100);
  circle(width / 2, height / 2, circleSize);

  // Rect moves horizontally
  let rectX = map(sensorValue, 0, 1023, 0, width - 100);
  fill(100, 200, 255);
  rect(rectX, height - 150, 100, 80);

  // TriColor changes via sensor
  let triColor = map(sensorValue, 0, 1023, 0, 255);
  fill(triColor, 255 - triColor, 150);
  triangle(width / 4, height / 4, width / 4 + 100, height / 4 + 150, width / 4 - 100, height / 4 + 150);
}

function serialEvent() {
  let str = port.readUntil("\n");
  if (str.length > 0) {
    sensorValue = int(str.trim());
    sensorValue = constrain(sensorValue, 0, 1023);
  }
}

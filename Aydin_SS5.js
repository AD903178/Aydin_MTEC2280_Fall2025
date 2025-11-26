let port;
let connectBtn;
let mode = 0;
let brightness = 0;

function setup() {
  createCanvas(800, 600);
  noStroke();

  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(10, 10);
  connectBtn.mousePressed(connectToSerial);
}

function draw() {
  background(30);

  fill(255, 204, 0, brightness);
  ellipse(width / 2, height / 2, 200 + sin(frameCount * 0.05) * 20);

  fill(0, 150, 255);
  rect(100, height - 150, 150, 100);

  fill(255, 50, 100);
  triangle(width - 200, 150, width - 100, 250, width - 300, 250);

  if (mode == 0) {
    fill(255);
    textSize(20);
    text("Mode: MANUAL", 20, height - 60);
    brightness = map(mouseX, 0, width, 0, 255);
    sendData(brightness);
  } else {
    fill(255);
    textSize(20);
    text("Mode: PULSE", 20, height - 60);
  }

  text("Press 'M' to switch modes", 20, height - 30);
}

async function connectToSerial() {
  if (!port) {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    writer = port.writable.getWriter();
  }
}

async function sendData(value) {
  if (port && port.writable) {
    const writer = port.writable.getWriter();
    const data = new TextEncoder().encode(value + "\n");
    await writer.write(data);
    writer.releaseLock();
  }
}

function keyPressed() {
  if (key === 'm' || key === 'M') {
    mode = (mode + 1) % 2;
    if (mode === 0) sendData("MODE0\n");
    else sendData("MODE1\n");
  }
}

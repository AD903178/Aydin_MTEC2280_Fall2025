let port, reader, writer;
let pot = 0, ldr = 0;
let mode = 1; // 1 = control LEDs, 2 = visualizer

async function setup() {
  createCanvas(800, 600);

  createButton("Connect Serial").mousePressed(connectSerial);
  createButton("Switch Mode").mousePressed(() => mode = (mode == 1 ? 2 : 1));
}

function draw() {
  background(20);

  if (mode == 1) {
    fill(255);
    text("MODE 1: p5 controls LEDs", 20, 20);

    let led1Val = int(map(mouseX, 0, width, 0, 255));
    let led2Val = int(map(mouseY, 0, height, 0, 255));

    send("led1:" + led1Val);
    send("led2:" + led2Val);

    fill(200, 100, 150);
    ellipse(mouseX, mouseY, 60); // primitive 1
  }
  else {
    fill(255);
    text("MODE 2: sensors control graphics", 20, 20);

    send("get");

    let circleSize = map(pot, 0, 1023, 20, 200);
    let rectW = map(ldr, 0, 1023, 20, 400);

    fill(100, 200, 255);
    ellipse(width/2, height/2, circleSize); // primitive 1

    fill(255, 160, 80);
    rect(50, 400, rectW, 40); // primitive 2

    stroke(255);
    line(0, map(pot, 0, 1023, 0, height),
         width, map(pot, 0, 1023, 0, height)); // primitive 3
    noStroke();
  }
}

async function connectSerial() {
  port = await navigator.serial.requestPort();
  await port.open({ baudRate: 9600 });

  writer = port.writable.getWriter();

  const dec = new TextDecoderStream();
  port.readable.pipeTo(dec.writable);
  reader = dec.readable.getReader();

  readLoop();
  send("hello");
}

async function readLoop() {
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value) {
      let s = value.trim();
      if (s.includes(",")) {
        let parts = s.split(",");
        pot = int(parts[0]);
        ldr = int(parts[1]);
      }
    }
  }
}

async function send(msg) {
  if (writer) writer.write(msg + "\n");
}

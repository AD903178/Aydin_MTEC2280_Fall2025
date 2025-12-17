// Aydin_Final

let song;
let port;
let latestData = "0";
let threshold = 2000; 

function preload() {
  song = loadSound("mysterybox.mp3");
}

function setup() {
  createCanvas(200, 200);

  // Start Serial connection
  port = createSerial();
  port.openPrompt();

  song.setVolume(0.5);
}

function draw() {
  background(0);

  // read incoming serial data
  let newData = port.readLine();
  if (newData) {
    latestData = newData.trim();
  }

  let ldr = int(latestData);

  // Check if light increases → box opened
  if (ldr > threshold && !song.isPlaying()) {
    song.play();
  }

  fill(255);
  textSize(16);
  text("LDR: " + ldr, 20, 30);
}

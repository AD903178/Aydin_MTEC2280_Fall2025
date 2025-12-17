// Aydin_Final

let song;
let port;
let latestData = "0";
let previousData = "0";
let audioUnlocked = false;

function preload() {
  song = loadSound("mysterybox.mp3");
}

function setup() {
  createCanvas(300, 150);

  // SERIAL
  port = createSerial();
  port.openPrompt();

  // AUDIO
  song.setVolume(0.6);
  textSize(14);
  textAlign(LEFT, TOP);
}

function draw() {
  background(0);

  // READ SERIAL DATA
  let newData = port.readLine();
  if (newData) {
    latestData = newData.trim();
  }

  // DEBUG DISPLAY
  fill(255);
  text("Serial: " + latestData, 10, 20);
  text("Click canvas once to enable audio", 10, 50);

  // PLAY SOUND ON BOX OPEN (0 -> 1)
  if (
    latestData === "1" &&
    previousData === "0" &&
    audioUnlocked &&
    !song.isPlaying()
  ) {
    song.play();
  }

  // SAVE LAST STATE
  previousData = latestData;
}

function mousePressed() {
  userStartAudio();
  audioUnlocked = true;
}

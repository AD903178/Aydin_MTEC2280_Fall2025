int ledPin = 9;
int brightness = 0;
bool pulseUp = true;
int mode = 0;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    String input = Serial.readStringUntil('\n');
    input.trim();

    if (input == "MODE0") {
      mode = 0;
    } else if (input == "MODE1") {
      mode = 1;
    } else if (mode == 0) {
      int val = input.toInt();
      val = constrain(val, 0, 255);
      brightness = val;
      analogWrite(ledPin, brightness);
    }
  }

  if (mode == 1) {
    if (pulseUp) brightness += 5;
    else brightness -= 5;

    if (brightness >= 255) pulseUp = false;
    if (brightness <= 0) pulseUp = true;

    analogWrite(ledPin, brightness);
    delay(30);
  }
}

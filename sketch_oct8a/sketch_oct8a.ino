//Aydin.SS2 

const int ledPins[4] = {2, 4, 5, 18};
const int button1Pin = 13;
const int button2Pin = 14;

int currentPattern = 0;
bool button1State = HIGH;
bool button2State = HIGH;
bool lastButton1State = HIGH;
bool lastButton2State = HIGH;
unsigned long lastDebounceTime1 = 0;
unsigned long lastDebounceTime2 = 0;
const unsigned long debounceDelay = 50;

void displayPattern(int pattern);

void setup() {
  Serial.begin(115200);
  
  for (int i = 0; i < 4; i++) {
    pinMode(ledPins[i], OUTPUT);
    digitalWrite(ledPins[i], LOW);
  }

  pinMode(button1Pin, INPUT_PULLUP);
  pinMode(button2Pin, INPUT_PULLUP);

  Serial.println("ESP32-S3 LED Pattern Controller Ready!");
}

void loop() {
  bool reading1 = digitalRead(button1Pin);
  bool reading2 = digitalRead(button2Pin);

  if (reading1 != lastButton1State) {
    lastDebounceTime1 = millis();
  }
  if ((millis() - lastDebounceTime1) > debounceDelay) {
    if (reading1 != button1State) {
      button1State = reading1;

      if (button1State == LOW) {
        Serial.println("Button1 Pressed (Rising Edge)");
        currentPattern = (currentPattern + 1) % 6; 
      } else {
        Serial.println("Button1 Released (Falling Edge)");
      }
    }
  }

    if (reading2 != lastButton2State) {
    lastDebounceTime2 = millis();
  }
  if ((millis() - lastDebounceTime2) > debounceDelay) {
    if (reading2 != button2State) {
      button2State = reading2;

      if (button2State == LOW) {
        Serial.println("Button2 Pressed (Rising Edge)");
        currentPattern = (currentPattern + 5) % 6; // Previous pattern
      } else {
        Serial.println("Button2 Released (Falling Edge)");
      }
    }
  }

  if (button1State == LOW && button2State == LOW) {
    currentPattern = 5;
  }

  displayPattern(currentPattern);

  lastButton1State = reading1;
  lastButton2State = reading2;

  delay(100);
}

void displayPattern(int pattern) {
  switch (pattern) {
    case 0: 
      for (int i = 0; i < 4; i++) digitalWrite(ledPins[i], LOW);
      break;

    case 1: 
      for (int i = 0; i < 4; i++) digitalWrite(ledPins[i], HIGH);
      break;

    case 2: 
      for (int i = 0; i < 4; i++) {
        digitalWrite(ledPins[i], HIGH);
        delay(50);
        digitalWrite(ledPins[i], LOW);
      }
      break;

    case 3: 
      digitalWrite(ledPins[0], HIGH);
      digitalWrite(ledPins[1], LOW);
      digitalWrite(ledPins[2], HIGH);
      digitalWrite(ledPins[3], LOW);
      break;

    case 4: 
      for (int i = 0; i < 4; i++) {
        digitalWrite(ledPins[i], HIGH);
        delay(30);
        digitalWrite(ledPins[i], LOW);
      }
      for (int i = 2; i > 0; i--) {
        digitalWrite(ledPins[i], HIGH);
        delay(30);
        digitalWrite(ledPins[i], LOW);
      }
      break;

    case 5: 
      for (int i = 0; i < 4; i++) digitalWrite(ledPins[i], HIGH);
      delay(100);
      for (int i = 0; i < 4; i++) digitalWrite(ledPins[i], LOW);
      delay(100);
      break;
  }
}

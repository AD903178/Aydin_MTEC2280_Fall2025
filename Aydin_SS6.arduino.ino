//Aydin_SS6

const int LED1_PIN = 5;      
const int LED2_PIN = 6;      
const int POT_PIN  = A0;     
const int LDR_PIN  = A1;     

int potValue = 0;
int ldrValue = 0;

String incoming = "";

void setup() {
  Serial.begin(9600);

  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);

  pinMode(POT_PIN, INPUT);
  pinMode(LDR_PIN, INPUT);
}

void loop() {
  // Read serial if available
  while (Serial.available()) {
    char c = Serial.read();

    if (c == '\n') {
      processCommand(incoming);
      incoming = "";
    } else {
      incoming += c;
    }
  }

  potValue = analogRead(POT_PIN);  
  ldrValue = analogRead(LDR_PIN);

  potValue = potValue / 4;
  ldrValue = ldrValue / 4;
}

void processCommand(String msg) {
  msg.trim();

  if (msg.startsWith("led1:")) {
    int v = msg.substring(5).toInt();
    v = constrain(v, 0, 255);
    ledcAttachPin(LED1_PIN, 0);
    ledcWrite(0, v);
  }

  else if (msg.startsWith("led2:")) {
    int v = msg.substring(5).toInt();
    v = constrain(v, 0, 255);
    ledcAttachPin(LED2_PIN, 1);
    ledcWrite(1, v);
  }

  else if (msg == "get") {
    Serial.print(potValue);
    Serial.print(",");
    Serial.println(ldrValue);
  }

  else if (msg == "hello") {
    Serial.println("hi");
  }
}

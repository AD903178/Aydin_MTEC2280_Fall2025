//Aydin_SS4

const int SENSOR1 = 15;   
const int SENSOR2 = 30;   
const int SENSOR3 = 45;   
const int SENSOR4 = 60;   


void setup() {
  Serial.begin(9600);

  pinMode(SENSOR1, INPUT);
  pinMode(SENSOR2, INPUT);
  pinMode(SENSOR3, INPUT);
  pinMode(SENSOR4, INPUT);
}

void loop() {
  // Read analog values (0–4095 on ESP32-S3)
  int v1 = analogRead(SENSOR1) / 4;  // scale to 0–1023
  int v2 = analogRead(SENSOR2) / 4;
  int v3 = analogRead(SENSOR3) / 4;
  int v4 = analogRead(SENSOR4) / 4;

  // Send as CSV string: "x,y,z,w\n"
  Serial.print(v1);
  Serial.print(",");
  Serial.print(v2);
  Serial.print(",");
  Serial.print(v3);
  Serial.print(",");
  Serial.println(v4);

  delay(20);  // ~50Hz update rate
}

const int SENSOR_PIN = 10;   

void setup() {
  Serial.begin(9600);
  pinMode(SENSOR_PIN, INPUT);
}

void loop() {
  
  int raw = analogRead(SENSOR_PIN);

  int sensorValue = raw / 4;

  Serial.println(sensorValue);

  delay(20); 
}

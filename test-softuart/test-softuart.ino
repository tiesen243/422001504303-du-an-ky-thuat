#include <SoftwareSerial.h>


EspSoftwareSerial::UART softSerial(D7, D8);  // RX, TX

void setup() {
  softSerial.begin(9600);
}

void loop() {
  softSerial.print("a");
  delay(100);
}

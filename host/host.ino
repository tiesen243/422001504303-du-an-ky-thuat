#include <ArduinoJson.h>
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <LittleFS.h>
#include <SoftwareSerial.h>

#include "config.hpp"
#include "logger.hpp"
#include "stress-test.hpp"

ESP8266WebServer server(PORT);
EspSoftwareSerial::UART softSerial(D1, D2);  // RX, TX
Logger logger;
StressTest stressTest(&softSerial, &logger);
                                          
void handleFile(const char* path, const char* contentType) {
  File file = LittleFS.open(path, "r");
  if (!file)
    return server.send(404, "text/plain", "File " + String(path) + " not found");

  server.streamFile(file, contentType);
  file.close();
}

void setup() {
  Serial.begin(9600);
  softSerial.begin(9600);
  delay(100);

  Serial.print("\nConnecting");
  WiFi.begin(SSID, PASSWORD);

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    if (millis() - start > 20000) break;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi conntected");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nCouldn't connect to WiFi");
    return;
  }

  if (!LittleFS.begin()) {
    Serial.println("\nAn Error has occurred while mounting LittleFS");
    return;
  }

  // Routes
  server.on("/", []() {
    handleFile("/index.html", "text/html");
  });
  server.on("/scripts/main.js", []() {
    handleFile("/scripts/main.js", "application/javascript");
  });
  server.on("/styles/index.css", []() {
    handleFile("/styles/index.css", "text/css");
  });
  server.on("/styles/theme.css", []() {
    handleFile("/styles/theme.css", "text/css");
  });

  server.on("/logs", []() {
    server.send(200, "application/json", logger.get());
  });

  server.on("/startTest", HTTP_POST, []() {
    if (!server.hasArg("plain")) {
      server.send(400, "application/json", "{\"error\":\"No data\"}");
      return;
    }

    String body = server.arg("plain");
    DynamicJsonDocument doc(256);
    deserializeJson(doc, body);
    unsigned int interval = doc["interval"] | 1000;
    unsigned int count = doc["count"] | 10;

    stressTest.start(count, interval);
    server.send(200, "application/json", "{\"status\":\"started\"}");
  });
  server.on("/testStatus", HTTP_GET, []() {
    server.send(200, "application/json", stressTest.getStatusJson());
  });

  server.begin();
  Serial.println("Server is running at http://" + WiFi.localIP().toString() + ":" + String(PORT));
}

void loop() {
  server.handleClient();
  stressTest.loop();

  if (Serial.available()) {
    String inputData = Serial.readStringUntil('\n'); inputData.trim();
    softSerial.println(inputData);
    logger.add("Sent: " + inputData);
  }

  if (softSerial.available()) {
    String receivedData = softSerial.readStringUntil('\n'); receivedData.trim();
    logger.add("Recv: " + receivedData);
  }

  delay(50);
}

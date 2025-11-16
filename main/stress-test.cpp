#include "stress-test.hpp"

StressTest::StressTest(SoftwareSerial* port, Logger* log)
  : serialPort(port), logger(log) {}

void StressTest::start(unsigned int count, unsigned int intervalMs) {
  total = count;
  interval = intervalMs;
  sent = success = failed = 0;
  running = true;
  lastSend = millis();
  if (logger) logger->add("Bắt đầu kiểm tra tải: " + String(count) + " gói tin, khoảng cách " + String(interval) + " ms");
}

void StressTest::stop() {
  running = false;
  if (logger) logger->add("Kiểm tra tải dừng tại " + String(sent) + "/" + String(total));
}

void StressTest::loop() {
  if (!running) return;

  unsigned long now = millis();
  if (now - lastSend < interval) return;
  lastSend = now;

  String packet = "TEST_PACKET_" + String(sent + 1);
  serialPort->println(packet);
  sent++;

  success++;
  if (logger) logger->add("Đã nhận: " + packet);

  if (sent >= total) {
    running = false;
    if (logger) logger->add("Kiểm tra tải hoàn thành thành công");
  }
}

String StressTest::getStatusJson() const {
  String json = "{";
  json += "\"running\":" + String(running ? "true" : "false") + ",";
  json += "\"sent\":" + String(sent) + ",";
  json += "\"success\":" + String(success) + ",";
  json += "\"failed\":" + String(failed) + ",";
  json += "\"total\":" + String(total);
  json += "}";
  return json;
}

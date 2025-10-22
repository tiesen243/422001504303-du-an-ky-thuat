#ifndef STRESSTEST_HPP
#define STRESSTEST_HPP

#include <Arduino.h>
#include <SoftwareSerial.h>
#include "logger.hpp"

class StressTest {
private:
  bool running = false;
  unsigned long lastSend = 0;
  unsigned int interval = 1000;
  unsigned int total = 0;
  unsigned int sent = 0;
  unsigned int success = 0;
  unsigned int failed = 0;
  SoftwareSerial* serialPort;
  Logger* logger;

public:
  StressTest(SoftwareSerial* port, Logger* log);

  void start(unsigned int count, unsigned int intervalMs);
  void stop();
  void loop(); // gọi trong main loop
  String getStatusJson() const;
  bool isRunning() const { return running; }
};

#endif // STRESSTEST_HPP
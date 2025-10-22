#ifndef LOGGER_HPP
#define LOGGER_HPP

#include <Arduino.h>
#include <vector>   
#include <cstddef>

class Logger {
  private:
    std::vector<String> buffer;
    const size_t maxLogs = 100;
    
    String getCurrentTimeString();

  public:
    void add(const String& message);
    String get();
};

#endif // LOGGER_HPP

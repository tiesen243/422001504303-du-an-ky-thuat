#include "logger.hpp"

String Logger::getCurrentTimeString() {
  time_t now = time(nullptr);
  struct tm* timeinfo = localtime(&now);
  char timeStr[12];
  snprintf(timeStr, sizeof(timeStr), "[%02d:%02d:%02d] ", timeinfo->tm_hour, timeinfo->tm_min, timeinfo->tm_sec);
  return String(timeStr);
}

void Logger::add(const String& message) {
  String logEntry = getCurrentTimeString() + message;
  buffer.push_back(logEntry);

  if (buffer.size() > maxLogs) 
    buffer.erase(buffer.begin());
}

String Logger::get() {
  String json = "[";
  for (size_t i = 0; i < buffer.size(); i++) {
    String s = buffer[i];
    s.replace("\\", "\\\\");
    s.replace("\"", "\\\"");
    json += "\"" + s + "\"";
    if (i < buffer.size() - 1)
      json += ",";
  }
  json += "]";
  return json;
}

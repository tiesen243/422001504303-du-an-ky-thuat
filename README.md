# 422001504303 - Dự án Kỹ thuật

## Giới thiệu

Dự án này tập trung phát triển các chức năng thông minh trên nền tảng ESP8266, bao gồm: đọc dữ liệu cảm biến, giao tiếp với server/HTTP. Mục tiêu là xây dựng một hệ thống nhúng linh hoạt, dễ mở rộng, phục vụ cho các ứng dụng tự động hóa và kết nối vạn vật.

- **Ngôn ngữ:** C/C++ (Arduino)
- **Phần cứng:** ESP8266 - ESP12S, RFID RDM6300

## Danh sách thành viên

| Họ tên | Mã số sinh viên | Công việc |
| ------ | --------------- | --------- |
| Nguyễn Văn Lam      | 21133091           | Firmware         |
| Trần Tiến     | 22653991               | Software         |
| Bằng Tấn Việt      | 22720251               | Hardware         |

## Thư viện

- [ArduinoJson](https://arduinojson.org/): Xử lý dữ liệu JSON hiệu quả trên Arduino.
- [ESP8266WebServer](https://github.com/esp8266/ESPWebServer): Tạo máy chủ web nhúng trên ESP8266.
- [ESP8266WiFi](https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/readme.html): Kết nối và quản lý WiFi.
- [LittleFS](https://github.com/littlefs-project/littlefs): Hệ thống tệp nhẹ, tối ưu cho ESP8266.
- [SoftwareSerial](https://github.com/plerup/espsoftwareserial/): Giao tiếp nối tiếp phần mềm.
- [Arduino LittleFS upload](https://github.com/earlephilhower/arduino-littlefs-upload): Công cụ upload hệ thống tệp LittleFS từ Arduino IDE.

## Hướng dẫn cài đặt

### Chuẩn bị môi trường

1. **Cài đặt Arduino IDE:** [Tải tại đây](https://www.arduino.cc/en/software).
2. **Thêm Board ESP8266:**
   - Vào `File` → `Preferences`, thêm URL:  
     `http://arduino.esp8266.com/stable/package_esp8266com_index.json`
   - Vào `Tools` → `Board` → `Boards Manager`, tìm "ESP8266" và cài đặt.
3. **Cài đặt thư viện:**
   - Vào `Sketch` → `Include Library` → `Manage Libraries`, tìm và cài các thư viện ở trên.
4. **Kết nối phần cứng:**
   - Cắm ESP8266 vào máy tính, chọn đúng board và cổng COM trong `Tools`.

### Cấu hình dự án

Sao chép file cấu hình mẫu và chỉnh sửa thông tin mạng, cổng theo nhu cầu:

```bash
cp host/config.example.hpp host/config.hpp
```

Mở `host/config.hpp` và cập nhật:

```cpp
#define SSID      "your_wifi_ssid"
#define PASSWORD  "your_wifi_password"
#define PORT      3000
```

### Biên dịch & nạp chương trình

1. Mở mã nguồn dự án trong Arduino IDE.
2. Chọn đúng board và cổng COM.
3. Nhấn "Upload" để biên dịch và nạp chương trình.
4. Nhấn `Ctrl + Shift + P` (hoặc mở Command Palette), tìm "Upload LittleFS to Pico/ESP8266/ESP32" để upload hệ thống tệp LittleFS.

## Giấy phép

Dự án phát hành theo giấy phép MIT. Xem chi tiết tại [LICENSE](LICENSE).

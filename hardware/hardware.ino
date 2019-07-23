
//#include "SocketIOClient.h"
#include "SocketIoClient.h"
#include <Servo.h>
#include <SoftwareSerial.h>
SoftwareSerial mySerial(D6, D7);
Servo servo;

//SocketIOClient client;
SocketIoClient socket;
const char* ssid = "SVTest";          //Tên mạng Wifi mà Socket server của bạn đang kết nối
const char* password = "9876543210";  //Pass mạng wifi ahihi, anh em rãnh thì share pass cho mình với.

char host[] = "nckh-xedap.herokuapp.com";  //Địa chỉ IP dịch vụ, hãy thay đổi nó theo địa chỉ IP Socket server của bạn.
//char host[] = "192.168.137.1";
int port = 80;              //Cổng dịch vụ socket server do chúng ta tạo!


boolean bauto = false;
// cong tac hanh trinh cho chan D2
const int congtachanhtrinhKhoa = D3;
int giatriCTHTKhoa = 0;
const int led =  13;

bool isSend = false;


//------------------------------------ funtion-------------------
void lock() {
  servo.write(90);
  Serial.println(0);
  delay(100);
  Serial.println("Locked....");
}
void unlock(const char* payload, size_t length) {
  String data = payload;
  Serial.println("recive");
  Serial.println(payload);
  if (data == "unlock") {
    servo.write(0);
    Serial.println("Unlocked....");
    delay(3000);
  }

}
void emitToado(const char* payload, size_t length) {
  String data = payload;
  if (data == "unlock") {
    servo.write(0);
    Serial.println(1);
  }

}

// Module SIM
String AT(String s) {              //Gửi lệnh AT, trả về kết quả
  mySerial.print(s);
  mySerial.write(0x0D);
  mySerial.write(0x0A);
  while (!mySerial.available()) delay(10);
  String t = "";
  while (mySerial.available()) {
    char c = mySerial.read();
    if ((t.length() == 225)) t = "";
    if ((c >= 0) && (c <= 255))
      t = t + c;
  }
  t.trim();
  return (t);
}
//==================================================================
int Ok(String s, String at) {  // Kiểm tra kết quả trả về của lệnh AT có hợp lệ không
  if ((s.indexOf("OK") > s.indexOf(at)) && (s.indexOf(at) != -1))
    return (1);
  return (0);
}
//=================================================================
String tachtoado(String s) {    // Tách lấy tọa độ từ kết quả
  int k = s.indexOf(',');
  char t = s.charAt(k - 1);
  while (((t >= '0') && (t <= '9')) || (t == '.')) {
    k--;
    t = s.charAt(k - 1);
  }
  int j = s.indexOf(',');
  t = s.charAt(j + 1);
  while (((t >= '0') && (t <= '9')) || (t == '.')) {
    j++;
    t = s.charAt(j + 1);
  }
  return (s.substring(k, j + 1));
}
//====================================================
void okAT(String s) {    // Gủi lệnh AT cho đến khi thành công
  String t = "";
  while (!Ok(t, s)) {
    delay(1000);
    t = AT(s);
    Serial.println(t);
  }
}
//=======================================
void laytoado() { //Lấy tọa độ
  int c = 0;
  String td, tmp;
  char b;
  Serial.print("Đang lấy tọa độ");
  do {
    do {
      do {
        tmp = AT("AT+LOCATION=2");
        yield();
      } while ((tmp.indexOf(',') == -1) || (tmp.indexOf("AT+LOCATION=2") == -1) || (tmp.indexOf("OK") == -1));
      yield();
    } while (tmp.indexOf("AT+LOCATION=2") > tmp.lastIndexOf("OK"));
    td = tachtoado(tmp);
    b = td.charAt(td.lastIndexOf(',') + 1);
    delay(1000);
    c++;
    if (c % 60 == 0) Serial.println(".");
    else Serial.print(".");
    yield();
  } while ((b < '1') || (b > '9'));
  Serial.println();
  Serial.print("Đã lấy tọa độ. Tổng thời gian: ");
  Serial.print(c); Serial.println("s");
}
//=============================================

String toado() {  //Trả về tọa độ
  String td1;
  do {
    do {
      do {
        td1 = AT("AT+LOCATION=2");
      } while ((td1.indexOf(',') == -1) || (td1.indexOf("AT+LOCATION=2") == -1) || (td1.indexOf("OK") == -1));
    } while (td1.indexOf("AT+LOCATION=2") > td1.lastIndexOf("OK"));
    td1 = tachtoado(td1);
    td1.trim();
  } while ((td1.indexOf("AT") != -1) || (td1.length() < 17));
  yield();
  return td1;
}

// ==================================

void setup() {
  //Bật baudrate ở mức 115200 để giao tiếp với máy tính qua Serial
  Serial.begin(115200);
  mySerial.begin(115200);
  //Việc đầu tiên cần làm là kết nối vào mạng Wifi
  Serial.print("Ket noi vao mang ");
  Serial.println(ssid);

  //Kết nối vào mạng Wifi
  WiFi.begin(ssid, password);
  //Chờ đến khi đã được kết nối
  while (WiFi.status() != WL_CONNECTED) { //Thoát ra khỏi vòng
    delay(500);
    Serial.print('.');
  }

  Serial.println();
  Serial.println(("Da ket noi WiFi"));
  Serial.println(("Di chi IP cua ESP8266 (Socket Client ESP8266): "));
  Serial.println(WiFi.localIP());
  //  // Kết nối module SIM
  Serial.println("Đang khởi động (20s)");
  Serial.println("--------------------");
  for (int i = 1; i <= 20; i++) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println();
  okAT("AT");
  Serial.println("Đã kết nối module GPS");
  mySerial.readString();
  okAT("AT+GPS=1");
  /*okAT("AT+CGATT=1");
  okAT("AT+CGDCONT=1,\"IP\",\"internet\"");
  okAT("AT+CGACT=1,1");
  okAT("AT+AGPS=0");
  mySerial.print("AT+AGPS=1");
  mySerial.write(0x0D);
  mySerial.write(0x0A);
  delay(8000);
  while (!mySerial.available()) delay(10);
  String t = "";
  while (mySerial.available()) {
    char c = mySerial.read();
    if ((t.length() == 225)) t = "";
    if ((c >= 0) && (c <= 255))
      t = t + c;
  }
  t.trim();
  Serial.println(t);*/
  Serial.println("Đã bật GPS");
  laytoado();

  Serial.println(("Chay Servo.............."));
  // set up for CTHT
  pinMode(led, OUTPUT);
  pinMode(congtachanhtrinhKhoa, INPUT);
  servo.attach(D2);

  Serial.println(("Ket noi socket.............."));
  socket.begin(host, port);
  String strToaDo = toado();
  socket.emit("hardware-send-location", strToaDo.c_str());

  socket.on("Server-send-unlock", unlock);
  Serial.println(strToaDo);
  Serial.println("Hoan thanh");


}

void loop() {
  //  toado();
  socket.loop();
  if (digitalRead(D3) == 1) {
    servo.write(0);

  }
  else {
    lock();
  }

}

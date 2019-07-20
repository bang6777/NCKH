
//#include "SocketIOClient.h"
#include "SocketIoClient.h"
#include <Servo.h> 
Servo servo;
//SocketIOClient client;
SocketIoClient socket;
const char* ssid = "Limit User";          //Tên mạng Wifi mà Socket server của bạn đang kết nối
const char* password = "bamchuchua8lan";  //Pass mạng wifi ahihi, anh em rãnh thì share pass cho mình với.

char host[] = "https://nckh-xedap.herokuapp.com";  //Địa chỉ IP dịch vụ, hãy thay đổi nó theo địa chỉ IP Socket server của bạn.
int port = 80;                  //Cổng dịch vụ socket server do chúng ta tạo!


boolean bauto = false;
// cong tac hanh trinh cho chan D2
const int congtachanhtrinhKhoa = D3;
int giatriCTHTKhoa = 0;
const int led =  13;

bool isSend = false;


//------------------------------------ funtion-------------------
void lock(){
    servo.write(50);
    Serial.println(0);
    delay(100);  
}
void unlock(){
    servo.write(0);
    Serial.println(1);
    delay(100);  
  }

void setup() {
    //Bật baudrate ở mức 115200 để giao tiếp với máy tính qua Serial
    Serial.begin(115200);

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
    // set up for CTHT
    pinMode(led, OUTPUT);
    pinMode(congtachanhtrinhKhoa, INPUT);
    servo.attach(D2);
     
    //Khi đã kết nối thành công
    //  if (client.connected()) {
    //    client.emit("Client-send-connect", "[\"Node MCU da ket noi\"]");
    //  }
    //  motor_1_Tien(255);
    
    socket.begin(host, port);
    socket.on("Server-send-unlock",unlock);
  }

  void loop() {
    //  client.monitor();
    socket.loop();
    if(digitalRead(D3)==1){
      unlock();
    } else{
      lock();
    }
  }

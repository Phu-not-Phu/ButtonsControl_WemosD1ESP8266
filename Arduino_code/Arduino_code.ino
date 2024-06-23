#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include <NTPtimeESP.h>
#include <string.h>

#ifndef APSSID
// #define APSSID "PhuPhuong"  // existing Wifi network
// #define APPSK "03052003"
#define APSSID "HSU_Students"  // existing Wifi network
#define APPSK "dhhs12cnvch"
#endif

/* Set these to your desired credentials. */
const char *ssid = APSSID;
const char *password = APPSK;
// const char *URL = "http://192.168.1.140:8010/inputButt/";
const char *URL = "http://10.106.22.161:8010/inputButt/";

WiFiClient client;
HTTPClient http;
ESP8266WebServer server(80);
MDNSResponder mdns;

strDateTime dateTime;
unsigned long startTime;

int buttonLeft = D7;
int buttonUp = D6;
int buttonDown = D5;
int buttonRight = SCL / D1;

int buttonLeftState = 0;
int buttonUpState = 0;
int buttonDownState = 0;
int buttonRightState = 0;

void setup() {
  Serial.begin(115200);
  Serial.println();
  Serial.print("Connect to existing Wifi network...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleOnConnect);
  // server.on("/goleft", pressButtonLeft);
  // server.on("/goup", pressButtonUp);
  // server.on("/godown", pressButtonDown);
  // server.on("/goright", pressButtonRight);

  // pinMode(buttonLeft, OUTPUT);
  // pinMode(buttonUp, OUTPUT);
  // pinMode(buttonDown, OUTPUT);

  server.enableCORS(true);
  server.begin();
  Serial.println("HTTP server started");

  startTime = millis();
}

void postJsonData(String inputName) {
  Serial.print("connecting to ");

  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("[HTTP] begin...\n");

    if (http.begin(client, URL)) {  // HTTP
      Serial.print("[HTTP] POST...\n");
      //gui du lieu len server dang JSON
      const int capacity = JSON_OBJECT_SIZE(2000);
      StaticJsonDocument<capacity> doc;

      /* doc thong tin cam bien vao day */
      doc["input"] = inputName;

      String output;
      serializeJson(doc, Serial);  // ghi ra man hinh
      serializeJson(doc, output);  //ghi ra bien output

      http.addHeader("Content-Type", "application/json");
      int httpCode = http.POST(output);
      Serial.println(httpCode);
      
      http.end();  //Close connection Serial.println();
      Serial.println("closing connection");
    }
  }
}

void pressButtonLeft() {
  buttonLeftState = digitalRead(buttonLeft);

  if (buttonLeftState == HIGH) {
    Serial.println("Left");
    postJsonData("left");
  }
}

void pressButtonUp() {
  buttonUpState = digitalRead(buttonUp);

  if (buttonUpState == HIGH) {
    Serial.println("Up");
    postJsonData("up");
  }
}

void pressButtonDown() {
  buttonDownState = digitalRead(buttonDown);

  if (buttonDownState == HIGH) {
    Serial.println("Down");
    postJsonData("down");
  }
}

void pressButtonRight() {
  buttonRightState = digitalRead(buttonRight);

  if (buttonRightState == HIGH) {
    Serial.println("Right");
    postJsonData("right");
  }
}

void loop() {
  server.handleClient();

  // long duration = millis() - startTime;  // thời gian bằng giá trị hiện tại trừ giá trị ban đầu
  // if (duration == 5000) {
  //   postJsonData();
  //   startTime = millis();
  // }

  // pressButtonLeft();
  // pressButtonUp();
  // pressButtonDown();
  // pressButtonRight();
}

void handleOnConnect() {
  server.send(200, "text/html", "ok");
}

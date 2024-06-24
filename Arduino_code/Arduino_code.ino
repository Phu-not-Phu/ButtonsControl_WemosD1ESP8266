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
#define APSSID "PhuPhuong"  // existing Wifi network
#define APPSK "03052003"
// #define APSSID "HSU_Students"  // existing Wifi network
// #define APPSK "dhhs12cnvch"
#endif

/* Set these to your desired credentials. */
const char *ssid = APSSID;
const char *password = APPSK;
const char *URL = "http://192.168.1.140:8010/inputButt/";
// const char *URL = "http://10.106.22.161:8010/inputButt/";

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

int buttonLeftState;
int buttonUpState;
int buttonDownState;
int buttonRightState;

int lastButtonLeftState = LOW;
int lastButtonUpState = LOW;
int lastButtonDownState = LOW;
int lastButtonRightState = LOW;

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 35;    // the debounce time; increase if the output flickers

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
  // read the state of the switch into a local variable:
  int reading = digitalRead(buttonLeft);

  // check to see if you just pressed the button
  // (i.e. the input went from LOW to HIGH), and you've waited long enough
  // since the last press to ignore any noise:

  // If the switch changed, due to noise or pressing:
  if (reading != lastButtonLeftState) {
    // reset the debouncing timer
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    // whatever the reading is at, it's been there for longer than the debounce
    // delay, so take it as the actual current state:

    // if the button state has changed:
    if (reading != buttonLeftState) {
      buttonLeftState = reading;

      if (buttonLeftState == HIGH) {
        Serial.println("Left");
        postJsonData("left");
      }
    }
  }
  lastButtonLeftState = reading;
}

void pressButtonUp() {
  int reading = digitalRead(buttonUp);

  if (reading != lastButtonUpState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonUpState) {
      buttonUpState = reading;

      if (buttonUpState == HIGH) {
        Serial.println("Up");
        postJsonData("up");
      }
    }
  }
  lastButtonUpState = reading;
}

void pressButtonDown() {
  int reading = digitalRead(buttonDown);

  if (reading != lastButtonDownState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonDownState) {
      buttonDownState = reading;

      if (buttonDownState == HIGH) {
        Serial.println("Down");
        postJsonData("down");
      }
    }
  }
  lastButtonDownState = reading;
}

void pressButtonRight() {
  int reading = digitalRead(buttonRight);

  if (reading != lastButtonRightState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonRightState) {
      buttonRightState = reading;

      if (buttonRightState == HIGH) {
        Serial.println("Right");
        postJsonData("right");
      }
    }
  }
  lastButtonRightState = reading;
}

void loop() {
  server.handleClient();

  // long duration = millis() - startTime;  // thời gian bằng giá trị hiện tại trừ giá trị ban đầu
  // if (duration == 5000) {
  //   postJsonData();
  //   startTime = millis();
  // }

  pressButtonLeft();
  pressButtonUp();
  pressButtonDown();
  pressButtonRight();
}

void handleOnConnect() {
  server.send(200, "text/html", "ok");
}

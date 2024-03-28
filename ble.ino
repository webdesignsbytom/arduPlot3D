#include <ArduinoBLE.h>
#include <Servo.h>
#include <string>  
#include <vector>  

Servo myServo;
int prevAngle = -1;

const char* deviceServiceUuid = "e2088282-4fde-42f9-bb22-6ec3c7ed8f91";
const char* deviceServiceRequestCharacteristicUuid = "6d92661d-f429-4d67-929b-28e7a9780912";
const char* deviceServiceResponseCharacteristicUuid = "8dcf199a-30e7-4bd4-beb6-beb57dca866c";

BLEService bleService(deviceServiceUuid);
BLEStringCharacteristic bleRequestCharacteristic(deviceServiceRequestCharacteristicUuid, BLEWrite, 4);
BLEStringCharacteristic bleResponseCharacteristic(deviceServiceResponseCharacteristicUuid, BLENotify, 16);

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);

  myServo.attach(9);
  Serial.begin(9600);

  BLE.setDeviceName("Portrait 4");
  BLE.setLocalName("Portrait 4");

  if (!BLE.begin()) {
    Serial.println("Starting Bluetooth® Low Energy module failed!");
    while (1);
  }

  BLE.setAdvertisedService(bleService);
  bleService.addCharacteristic(bleRequestCharacteristic);
  bleService.addCharacteristic(bleResponseCharacteristic);
  BLE.addService(bleService);

  BLE.advertise();

  Serial.println("Arduino R4 WiFi BLE (Peripheral Device)");
  Serial.println(" ");

  // Blink LED twice on startup
  for(int i = 0; i < 2; i++) {
    digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
    delay(500);                        // wait for a half second
    digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
    delay(500);                        // wait for a half second
  }
}

bool isConnected = false;  // Tracks the connection status

void loop() {
  static unsigned long lastBlinkTime = 0;  // Keep track of the last time we toggled the LED
  const long blinkInterval = 500;         // Interval at which to blink (milliseconds)

  BLEDevice central = BLE.central();

  // Check if a central device has connected
  if (central) {
          Serial.println("PPPPPPPPPPPPPP");
      Serial.print("PPPPPPPPPPPPPP");
    if (!isConnected) {
      Serial.println("- Discovering central device...");
      Serial.println("* Connected to central device!");
      Serial.print("* Device MAC address: ");
      Serial.println(central.address());
      Serial.println(" ");
            Serial.println("TTTTTTTTTTTTTTTTT");
      Serial.print("TTTTTTTTTTTTTTT");
      isConnected = true;  // Mark that a device is connected
    }

    // Continuous blinking logic
    if (isConnected) {
      unsigned long currentMillis = millis();
            Serial.println("KKKKKKKKKKKKKKKKKKK");
      Serial.print("KKKKKKKKKKKKKKKKKKK");
      if (currentMillis - lastBlinkTime >= blinkInterval) {
        lastBlinkTime = currentMillis;
        digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));  // Toggle LED state
      }
    }

    // Keep the loop minimal to maintain responsiveness
    if (bleRequestCharacteristic.written()) {
      Serial.println("XXXXXXXXXXXXXXXXXXXX");
      Serial.print("XXXXXXXXXXXXXXXXXXXX");

      // Process the characteristic write request
      bleRequestCharacteristic.value();  // Dummy read to clear the write flag
      bleResponseCharacteristic.writeValue("I am an arduino.");
    }
  } else if (isConnected) {
    // Reset the connection flag if the central device is disconnected
    Serial.println("* Disconnected from central device!");
    digitalWrite(LED_BUILTIN, LOW);  // Ensure LED is off when not connected
    isConnected = false;
  }
}

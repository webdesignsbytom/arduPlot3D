#include "SDHandler.h"
#include "LCDHandler.h" // Include LCDHandler to update menu display if needed

const int chipSelectPin = 53;  // CS pin number for SD card reader
String sdCardMenu[50];         // Array to hold SD card filenames
const int maxFiles = 50;

void initializeSD() {
    pinMode(chipSelectPin, OUTPUT);
    if (!SD.begin(chipSelectPin)) {
        Serial.println("No SD Card detected.");
    } else {
        Serial.println("SD Card initialized.");
    }
}

void updateSDCardMenuOptions() {
    File root = SD.open("/");
    int fileCount = 0;
    if (!root) {
        Serial.println("Failed to open directory on SD card.");
        return;
    }
    while (File entry = root.openNextFile()) {
        if (fileCount < maxFiles) {
            sdCardMenu[fileCount++] = entry.name();
        }
        entry.close();
    }
    root.close();
}

void readFileFromSD(const String& filename) {
    File file = SD.open(filename);
    if (!file) {
        Serial.println("Failed to open file.");
        return;
    }
    while (file.available()) {
        Serial.println(file.readStringUntil('\n'));
    }
    file.close();
}

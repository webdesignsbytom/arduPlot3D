#ifndef SDHANDLER_H
#define SDHANDLER_H

#include <SD.h>
#include <Arduino.h>

extern const int chipSelectPin; // Ensure `chipSelectPin` is available globally
extern String sdCardMenu[];

void initializeSD();
void updateSDCardMenuOptions();
void readFileFromSD(const String& filename);

#endif

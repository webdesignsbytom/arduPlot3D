#ifndef SERVOCONTROL_H
#define SERVOCONTROL_H

#include <Arduino.h>  // Include Arduino functions, just in case

void initializeServos();
void updateServos();
void runTwoFingerTap();
void runThreeFingerTap();
void runFingerPinch();

#endif

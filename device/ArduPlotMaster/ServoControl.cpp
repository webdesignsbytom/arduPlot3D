#include "ServoControl.h"
#include <Arduino.h>  // Ensure this is at the very top
#include <Servo.h>  // Include the Servo library

Servo fingerOneServo;
constexpr int fingerOneServoPin = 25;

static int currentAngle = 0;
static bool increasing = true;
static unsigned long lastMoveTime = 0;

void initializeServos() {
    fingerOneServo.attach(fingerOneServoPin);
    fingerOneServo.write(0);  // Start at 0 degrees
}

void updateServos() {
    if (millis() - lastMoveTime > 20) {  // Adjust timing for smoother movement
        if (increasing) {
            currentAngle += 3;
            if (currentAngle >= 150) {
                increasing = false;
            }
        } else {
            currentAngle -= 3;
            if (currentAngle <= 0) {
                increasing = true;
            }
        }
        fingerOneServo.write(currentAngle);
        lastMoveTime = millis();
    }
}

// Implement functions for the specific movements below
void runTwoFingerTap() {
    // Define behavior for two-finger tap using the servo
}

void runThreeFingerTap() {
    // Define behavior for three-finger tap using the servo
}

void runFingerPinch() {
    // Define behavior for finger pinch using the servo
}

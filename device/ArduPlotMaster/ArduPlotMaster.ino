#include "LCDHandler.h"
#include "StepperControl.h"
#include "ServoControl.h"
#include "SDHandler.h"
#include "MenuHandler.h"

void setup() {
    Serial.begin(9600);
    initializeLCD();
    initializeSteppers();
    initializeServos();
    initializeSD();
    initializeMenu();
}

void loop() {
    // Main loop for running updates
    updateSteppers();
    updateServos();
    checkButtons();
}

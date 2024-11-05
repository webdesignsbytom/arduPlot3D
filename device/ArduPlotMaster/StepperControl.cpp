#include "StepperControl.h"
#include "Config.h"

AccelStepper stepperX(AccelStepper::DRIVER, stepPinMotorX, dirPinMotorX);
AccelStepper stepperY(AccelStepper::DRIVER, stepPinMotorY, dirPinMotorY);

void initializeSteppers() {
    stepperX.setMaxSpeed(500);
    stepperX.setAcceleration(1000);
    stepperX.moveTo(xForwardLimit);

    stepperY.setMaxSpeed(300);
    stepperY.setAcceleration(1000);
    stepperY.moveTo(yForwardLimit);
}

void updateSteppers() {
    stepperX.run();
    stepperY.run();
}

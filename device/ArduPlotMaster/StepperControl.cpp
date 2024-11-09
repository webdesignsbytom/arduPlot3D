#include "StepperControl.h"
#include "Config.h"

AccelStepper stepperX(AccelStepper::DRIVER, stepPinMotorX, dirPinMotorX);
AccelStepper stepperY(AccelStepper::DRIVER, stepPinMotorY, dirPinMotorY);

void initializeSteppers() {
    stepperX.setMaxSpeed(maxXSpeed);
    stepperX.setAcceleration(maxXAcceleration);
    stepperX.moveTo(xForwardLimit);

    stepperY.setMaxSpeed(maxYSpeed);
    stepperY.setAcceleration(maxYAcceleration);
    stepperY.moveTo(yForwardLimit);
}

void updateSteppers() {
    stepperX.run();
    stepperY.run();
}

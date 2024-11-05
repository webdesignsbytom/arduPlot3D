#ifndef STEPPERCONTROL_H
#define STEPPERCONTROL_H

#include <AccelStepper.h>

void initializeSteppers();
void updateSteppers();
void moveXAxis();
void moveYAxis();

#endif

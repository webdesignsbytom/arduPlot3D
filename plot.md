#include <AccelStepper.h>

// Define stepper motors using the AccelStepper library for the X and Y axes
AccelStepper stepperX(AccelStepper::DRIVER, 2, 5); // Pin 2 = step, Pin 5 = direction for X-axis
AccelStepper stepperY(AccelStepper::DRIVER, 3, 6); // Pin 3 = step, Pin 6 = direction for Y-axis

void setup() {
  Serial.begin(9600); // Start serial communication at 9600 baud rate
  // Initialize stepper motor settings
  stepperX.setMaxSpeed(1000);
  stepperX.setAcceleration(500);
  stepperY.setMaxSpeed(1000);
  stepperY.setAcceleration(500);
}

void loop() {
  if (Serial.available() > 0) {
    // Read the incoming command until a newline is received
    String command = Serial.readStringUntil('\n');
    parseAndExecuteCommand(command.trim()); // Trim to remove any whitespace
  }
}

void parseAndExecuteCommand(String command) {
  if (command.startsWith("M")) { // Move command
    executeMoveCommand(command);
  } else if (command.startsWith("E")) { // Draw command (relative move)
    executeDrawCommand(command);
  }
  // Add more conditions here for other command types
}

void executeMoveCommand(String command) {
  // Remove command identifier and split parameters
  command.remove(0, 1); // Remove 'M'
  int commaIndex = command.indexOf(',');
  long x = command.substring(0, commaIndex).toInt(); // Extract X coordinate
  long y = command.substring(commaIndex + 1).toInt(); // Extract Y coordinate
  moveTo(x, y); // Function to move the pen
}

void executeDrawCommand(String command) {
  // Similar structure to move, but for drawing
  command.remove(0, 1); // Remove 'E'
  int commaIndex = command.indexOf(',');
  long deltaX = command.substring(0, commaIndex).toInt(); // Extract delta X
  long deltaY = command.substring(commaIndex + 1).toInt(); // Extract delta Y
  drawLine(deltaX, deltaY); // Function to draw a line
}

void moveTo(long x, long y) {
  // Convert coordinates from Plotter Units (PU) to steps. This depends on your machine's specifics.
  // Here, just a placeholder conversion function is called
  long stepsX = convertPUToSteps(x);
  long stepsY = convertPUToSteps(y);
  stepperX.moveTo(stepsX);
  stepperY.moveTo(stepsY);
  while (stepperX.distanceToGo() != 0 || stepperY.distanceToGo() != 0) {
    stepperX.run();
    stepperY.run();
  }
}

void drawLine(long deltaX, long deltaY) {
  // Similar to moveTo but for drawing (E command). This example treats deltaX and deltaY as relative moves.
  long stepsX = convertPUToSteps(deltaX);
  long stepsY = convertPUToSteps(deltaY);
  stepperX.move(stepsX); // Note: 'move' for relative positioning
  stepperY.move(stepsY);
  while (stepperX.distanceToGo() != 0 || stepperY.distanceToGo() != 0) {
    stepperX.run();
    stepperY.run();
  }
}

long convertPUToSteps(long pu) {
  // Placeholder function for converting Plotter Units to stepper motor steps.
  // You need to replace this with your conversion based on your hardware setup.
  // Example: 1 PU = 0.05 mm, and if your stepper motor requires 200 steps per mm, then:
  return pu * (200 * 0.05);
}

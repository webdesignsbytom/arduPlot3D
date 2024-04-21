#include <Arduino.h>
#include <AccelStepper.h>
#include <Servo.h>
#include <Wire.h>
#include <SPI.h>
#include <SD.h>

// Stepper motor connections
constexpr int dirPinMotorX = 23;
constexpr int stepPinMotorX = 2;
constexpr int dirPinMotorY = 22;
constexpr int stepPinMotorY = 3;

// Stepper motor configurations
AccelStepper stepperX(AccelStepper::DRIVER, stepPinMotorX, dirPinMotorX);
AccelStepper stepperY(AccelStepper::DRIVER, stepPinMotorY, dirPinMotorY);

// Servo setup
Servo sg90Servo;
constexpr int servoPin = 25;

// Servo position flags
bool servoPositionHigh = true; // Start with servo at 180 degrees

// Limits and control flags
int xForwardLimit = 2900;
int xBackwardLimit = 0;
bool xMovingForward = true;

int yForwardLimit = 600;
int yBackwardLimit = 0;
bool yMovingForward = true;

// SD Card
const int chipSelectPin = 53; // Change this to your desired CS pin number

void setup()
{
    Serial.begin(115200);

    // Stepper motor setup
    stepperX.setMaxSpeed(500);
    stepperX.setAcceleration(1000);
    stepperX.moveTo(xForwardLimit);

    stepperY.setMaxSpeed(300);
    stepperY.setAcceleration(1000);
    stepperY.moveTo(yForwardLimit);

    // Servo initialization and starting position
    sg90Servo.attach(servoPin);
    sg90Servo.write(0); // Start with servo at 180 degrees

    while (!Serial)
    {
        ; // wait for serial port to connect. Needed for native USB port only
    }

    Serial.print("Initializing SD card...");

    // Initialize SD card
    if (!SD.begin(chipSelectPin))
    {
        Serial.println("initialization failed!");
        while (1)
            ;
    }
    Serial.println("initialization done.");
}

void loop()
{
    // put your main code here, to run repeatedly:
    // X-axis movement
    if (!stepperX.isRunning())
    {
        if (xMovingForward)
        {
            Serial.println("XXXXXX");
            stepperX.moveTo(xBackwardLimit);
            xMovingForward = false;
        }
        else
        {
            stepperX.moveTo(xForwardLimit);
            xMovingForward = true;
        }
    }

    // Y-axis movement
    if (!stepperY.isRunning())
    {
        if (yMovingForward)
        {
            Serial.println("YYYYY");
            stepperY.moveTo(yBackwardLimit);
            yMovingForward = false;
        }
        else
        {
            stepperY.moveTo(yForwardLimit);
            yMovingForward = true;
        }
    }

    static unsigned long lastMoveTime = 0;
    static int currentAngle = 0;   // Current angle of the servo
    static bool increasing = true; // Direction of movement

    if (millis() - lastMoveTime > 20)
    { // Reduced delay for smoother movement
        if (increasing)
        {
            currentAngle += 3; // Smaller increment for smoother motion
            if (currentAngle >= 150)
            {
                increasing = false; // Change direction at 120 degrees
            }
        }
        else
        {
            currentAngle -= 3;
            if (currentAngle <= 0)
            {
                increasing = true; // Change direction at 0 degrees
            }
        }
        sg90Servo.write(currentAngle);
        lastMoveTime = millis();
    }

    // Continuously run the stepper motors
    stepperX.run();
    stepperY.run();
}

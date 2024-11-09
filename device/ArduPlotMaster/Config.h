#ifndef CONFIG_H
#define CONFIG_H

// Motor pin configuration
constexpr int stepPinMotorX = 2;
constexpr int dirPinMotorX = 23;
constexpr int stepPinMotorY = 3;
constexpr int dirPinMotorY = 22;

// Motor movement limits
constexpr int xForwardLimit = 2900;
constexpr int yForwardLimit = 1600;

// Motor speeed
constexpr int maxXSpeed = 500;
constexpr int maxYSpeed = 500;
constexpr int maxZSpeed = 100;
constexpr int maxXAcceleration = 1000;
constexpr int maxYAcceleration = 1000;
constexpr int maxZAcceleration = 1000;

#endif

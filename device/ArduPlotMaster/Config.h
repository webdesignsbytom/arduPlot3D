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

#endif

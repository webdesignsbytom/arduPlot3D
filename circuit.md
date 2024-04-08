# Circuit

## Components

Arduino nano
74HC165 - Input regulator
74HC595 - Output regulator
10k Ohm resistor x 6
Input buttons x 4 (10k ohm resistor each) (not fixed - wire connection)
100uf capacitor x 3
A4988 motor controller x 2
Limit switch x 2 (10k ohm resistor each)
SD card reader module (not fixed - wire connection)
LCD2004 - screen (not fixed - wire connection)
Power switch (not fixed - wire connection)
Power socket/connector 12V
5 volt regulator
12V power supply

## Motors

1.8 Stepper motors x 2 12V
9 stepper motors x 1

## Description

- The power supply needs to be changable/removable and connect to the board in a non permenant way.
- The power supply will be converted into a 5V section for the powering of the arduino board, A4988 and other components.
- The power supply will be converted into a 12V section for running the 3 stepper motors.
- The arduino nano will have its input pins expanded using 74HC165 chips to control input from 
  - limit switches x 2
  - buttons x 4
  - LCD screen
  - A4988 x 2 (4 inputs total)
  - SD card reader x 


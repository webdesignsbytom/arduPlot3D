# Stepper

## Microsteps
The default for a stock Ender-3 is 16 microsteps. That means between each full step are 16 microsteps. 
To microstep, the driver works to hold position between full steps. On a 1.8° motor with 16 microsteps, 
each microstep is 0.1125° and there are 3200 microsteps per revolution.

## Data
400 steps per revolution will always be somewhat choppy. Its almost a degree per step. 
I am working on a gauge and I am using a small geared automotive gauge stepper that has ~1000 steps per revolution and I found that not smooth enough. 
even though the diameter of my needle is much less than that of your wheels. Adding a microstepping controller with 1/4 steps, now its smooth.

That said; your code is incorrect. You need to give a short pulse to the controller to generate a step, but the length of that pulse shouldnt be variable 
(and will be MUCH shorter than the 2600 microseconds you're using now, on my controller its 1 microsecond). What should be variable is the time between steps.

And im sure its just proof of concept at this point, but you dont want to control speed, ie, time between steps, the way you're doing it now, using delays. 
Either use a library like accelstepper or keep track of a timer since your last step, and do a step when you have to, and do nothing when you dont have to. But dont use delay. Especially when microstepping 4 motors.


## Data

You will notice that the examples here do not use any of these Arduino functions
Serial.parseInt()
Serial.parseFloat()
Serial.readBytes()
Serial.readBytesUntil()

All of these are blocking functions that prevent the Arduino from doing something else until they are satisfied, or until the timeout expires. 
The examples here do exactly the same job without blocking. That allows the Arduino to do other things while it is waiting for data to arrive.


## Data 

serialEvent()
I don't recommend using this function - I prefer to deal with the Serial data when it suits me. It behaves just as if you had this code as the last thing in loop().

if (Serial.available() > 0) {
    mySerialEvent();
}

## Data

With your stepper controller, you simply set the jumpers to define the microstepping. Thats all. Of course, now each time you pulse the stepper, the motor will only turn a fraction of the degrees it 
would without microstepping, so you have to pulse more often to achieve the same speed. In your current program, that means reducing the delay, but you need to get rid of that delay, see below.

Aside from the microstepping (which is usually configured through IO pins instead of jumpers) your stepper controller is no different than any other, so any example you'll find will apply. 
PLease be sure to reread my post about pulse length. The manual of your stepper states it needs 1.5uS pulses. Not 2600mS. And I strongly recommend using a library with acceleration support, like accelstepper.

As for running serial comms; there is no problem doing both. You just have to do non blocking serial reads and drive the stepper with non blocking moves, and not regulate the speed by using delay() 
like you're doing now. Again, see my post above. Using delayMicroseconds for the pulse duration is probably ok, but you shouldnt use delay anywhere else.

## Data

Then, if the motor vibrates or click, it may be one of these problems:

You didn't connect the motor properly
The current is set too low on the board (screw on the motor driver)
The battery (Vmot) isn't powerful enough
If it's not one of those problems, the A4988 chip might have an issue. I have a similar problem where it turn in one direction and only when the pwm signal goes throught the direction pin instead of the step pin.

## Data

```cpp
#define stepPin 3 
#define dirPin 2 
#define enablePin 7
#define MicroStep1Pin 6
#define MicroStep2Pin 5
#define MicroStep3Pin 4

#define numMsInOneSec 1000
#define numMicroSecInOneMs 1000
#define stepPulseWidthInMicroSec 2
#define setupTimeInMicroSec 1

#define inputBufferSize 128

int  serialCharIn;             
char serialInString[inputBufferSize];  
int  serialInIndex  = 0;

unsigned long timeBetweenInputPollsInMicroSec = ( (unsigned long)(numMsInOneSec /4) * numMicroSecInOneMs ); // 250 = 1/4th of a second
unsigned long timeBetweenStepsInMicroSec = (1 * numMicroSecInOneMs);

unsigned long loopCheck = 0;

boolean lineReady = false;
boolean successfullyParsed = false;
boolean currentDirection = false;
boolean shouldStep = true;

boolean speedChanged = true;

void setCurrentDirection(boolean dir)
{
  if(dir == false)
  {
      digitalWrite(dirPin, LOW);
  } else {
      digitalWrite(dirPin, HIGH);
  }
  currentDirection = dir;
  delayMicroseconds(setupTimeInMicroSec);
}

void changeDirection()
{
  setCurrentDirection(!currentDirection);
}

void enableStepper(int isEnabled)
{
  if(isEnabled)
  {
      digitalWrite(enablePin, LOW); // enable HIGH = stepper driver OFF
  } else {
      digitalWrite(enablePin, HIGH); // enable HIGH = stepper driver OFF
  }
  // wait a few microseconds for the enable to take effect 
  // (That isn't in the spec sheet I just added it for sanity.) 
  delayMicroseconds(2);
}

void takeSingleStep()
{
    digitalWrite(stepPin, LOW);
    delayMicroseconds(stepPulseWidthInMicroSec); 
    digitalWrite(stepPin, HIGH); 
    delayMicroseconds(stepPulseWidthInMicroSec); 
    digitalWrite(stepPin, LOW);
}

void setFullStep()
{
  digitalWrite(MicroStep1Pin, LOW);
  digitalWrite(MicroStep2Pin, LOW);
  digitalWrite(MicroStep3Pin, LOW);
  delayMicroseconds(setupTimeInMicroSec);
}

void setHalfStep()
{
  digitalWrite(MicroStep1Pin, HIGH);
  digitalWrite(MicroStep2Pin, LOW);
  digitalWrite(MicroStep3Pin, LOW);
  delayMicroseconds(setupTimeInMicroSec);
}

void setQuarterStep()
{
  digitalWrite(MicroStep1Pin, LOW);
  digitalWrite(MicroStep2Pin, HIGH);
  digitalWrite(MicroStep3Pin, LOW);
  delayMicroseconds(setupTimeInMicroSec);  
}

void setEighthStep()
{
  digitalWrite(MicroStep1Pin, HIGH);
  digitalWrite(MicroStep2Pin, HIGH);
  digitalWrite(MicroStep3Pin, LOW);
  delayMicroseconds(setupTimeInMicroSec);  
}

void setSixteenthStep()
{
  digitalWrite(MicroStep1Pin, HIGH);
  digitalWrite(MicroStep2Pin, HIGH);
  digitalWrite(MicroStep3Pin, HIGH);
  delayMicroseconds(setupTimeInMicroSec);  
}
```

## Data

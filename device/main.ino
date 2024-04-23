#include <Arduino.h>
#include <AccelStepper.h>
#include <Servo.h>
#include <Wire.h>
#include <SPI.h>
#include <SD.h>
#include <LiquidCrystal_I2C.h>
#include <Keypad.h>

// The parameters are (I2C address, number of columns, number of rows).
LiquidCrystal_I2C lcd(0x27, 20, 4);

// Menu items
String mainMenuItems[] = { "SD Card", "Motor Control", "Tests", "Shutdown", "Cheese" };
String motorControlMenu[] = { "Speed+", "Speed-", "Release", "Home axis", "Back" };
String testsMenu[] = { "Test1", "Coms Test", "Back" };
String shutdownMenu[] = { "Confirm Shutdown", "Back" };

String* currentMenu = mainMenuItems;  // Start with main menu

int menuItemCount = 4;
int currentMenuItem = 0;  // variable to track the current menu item

// Menu state
enum MenuState { MAIN_MENU,
                 SD_CARD_MENU,
                 MOTOR_CONTROL_MENU,
                 TESTS_MENU,
                 SHUTDOWN_MENU };

MenuState currentMenuState = MAIN_MENU;

// SD Data
const int chipSelectPin = 53;  // Change this to your desired CS pin number

String root = "/";
File myFile;

String fileNames[20];  // Assuming a max of 10 files
int fileCount = 0;

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
bool servoPositionHigh = true;  // Start with servo at 180 degrees

// Limits and control flags
int xForwardLimit = 2900;
int xBackwardLimit = 0;
bool xMovingForward = true;

int yForwardLimit = 600;
int yBackwardLimit = 0;
bool yMovingForward = true;

// Keypad
const byte ROW_NUM = 4;  //four rows
const byte COL_NUM = 4;  //four columns

//define the cymbols on the buttons of the keypads
char keys[ROW_NUM][COL_NUM] = {
  { '1', '2', '3', 'A' }, // UP DOWN ENTER BACK
  { '4', '5', '6', 'B' },
  { '7', '8', '9', 'C' },
  { '*', '0', '#', 'D' }
};

byte pin_rows[ROW_NUM] = { 39, 41, 43, 45 };    //connect to the row pinouts of the keypad
byte pin_column[COL_NUM] = { 37, 35, 33, 31 };  //connect to the column pinouts of the keypad

//initialize an instance of class NewKeypad
Keypad customKeypad = Keypad(makeKeymap(keys), pin_rows, pin_column, ROW_NUM, COL_NUM);


void setup() {
  Serial.begin(9600);

  // LCD
  lcd.init();
  lcd.backlight();
  lcd.begin(20, 4);       // Initialize the LCD with 20 columns and 4 rows.
  lcd.print("Welcome!");  // Print a message to the LCD.
  lcd.setCursor(0, 1);    // Set the cursor to the beginning of the second row.
  lcd.print("ArduPlot3D Online");
  lcd.setCursor(0, 3);
  lcd.print("Tom rules");

  // Stepper motor setup
  stepperX.setMaxSpeed(500);
  stepperX.setAcceleration(1000);
  stepperX.moveTo(xForwardLimit);

  stepperY.setMaxSpeed(300);
  stepperY.setAcceleration(1000);
  stepperY.moveTo(yForwardLimit);

  // Servo initialization and starting position
  sg90Servo.attach(servoPin);
  sg90Servo.write(0);  // Start with servo at 180 degrees

  // SD card
  pinMode(chipSelectPin, OUTPUT);

  delay(2000);

  lcd.clear();
  lcd.print("> ");
  lcd.print(mainMenuItems[currentMenuItem]);

  if (!SD.begin(chipSelectPin)) {  // Test for initialized.
    while (1)
      ;
  }  // End if.

  delay(50);

  // Display the next menu item on the second row
  lcd.setCursor(2, 1);
  lcd.print(currentMenu[1]);

  // Display the next menu item on the third row
  lcd.setCursor(2, 2);
  lcd.print(currentMenu[2]);

  // Display the next menu item on the forth row
  lcd.setCursor(2, 3);
  lcd.print(currentMenu[3]);
}

void loop() {
  // SD
  // ListDirectory();

  char customKey = customKeypad.getKey();

  if (customKey) {
    Serial.println("XXXX");
    Serial.println(customKey);
  }

  // X-axis movement
  if (!stepperX.isRunning()) {
    if (xMovingForward) {
      stepperX.moveTo(xBackwardLimit);
      xMovingForward = false;
    } else {
      stepperX.moveTo(xForwardLimit);
      xMovingForward = true;
    }
  }

  // Y-axis movement
  if (!stepperY.isRunning()) {
    if (yMovingForward) {
      stepperY.moveTo(yBackwardLimit);
      yMovingForward = false;
    } else {
      stepperY.moveTo(yForwardLimit);
      yMovingForward = true;
    }
  }

  static unsigned long lastMoveTime = 0;
  static int currentAngle = 0;    // Current angle of the servo
  static bool increasing = true;  // Direction of movement

  if (millis() - lastMoveTime > 20) {  // Reduced delay for smoother movement
    if (increasing) {
      currentAngle += 3;  // Decrease increment for smoother motion
      if (currentAngle >= 150) {
        increasing = false;  // Change direction at 120 degrees
      }
    } else {
      currentAngle -= 3;
      if (currentAngle <= 0) {
        increasing = true;  // Change direction at 0 degrees
      }
    }
    sg90Servo.write(currentAngle);
    lastMoveTime = millis();
  }

  // Continuously run the stepper motors
  //stepperX.run();
  //stepperY.run();
}

// void updateMenuDisplay() {
//   lcd.clear();
//   lcd.print("> ");
//   lcd.print(currentMenu[currentMenuItem]);  // Displays the current selected item

//   // Correctly calculate and display the next menu item
//   int nextMenuItem = (currentMenuItem + 1) % menuItemCount;
//   lcd.setCursor(2, 1);                     // Adjusted for second line
//   if (menuItemCount > 1) {                 // Only try to display a second item if it exists
//     lcd.print(currentMenu[nextMenuItem]);  // Display the next item
//   }
// }

void updateMenuDisplay() {
  lcd.clear();
  lcd.print("> ");
  lcd.print(currentMenu[currentMenuItem]);  // Displays the current selected item

  // Correctly calculate and display the next menu item
  int nextMenuItem = (currentMenuItem + 1) % menuItemCount;
  lcd.setCursor(2, 1);                     // Adjusted for second line
  if (menuItemCount > 1) {                 // Only try to display a second item if it exists
    lcd.print(currentMenu[nextMenuItem]);  // Display the next item
  }
}

// List Directory
void ListDirectory() {

  myFile = SD.open("/");  //Root directory.
  delay(200);             //Wait for myFile to open.
  PrintDirectory(myFile, 0);
  myFile.close();  //Close the myFile.
  delay(200);      //Wait for file to close.

}  //end ListDirectory function.

void PrintDirectory(File dir, int numTabs) {
  dir.seek(0);  // Add seek!!!

  while (true) {

    File entry = dir.openNextFile();
    if (!entry) {
      dir.rewindDirectory();
      break;
    }  //End if.

    for (uint8_t i = 0; i < numTabs; i++) {
      Serial.print('\t');
    }  //End for.

    Serial.print(entry.name());
    if (entry.isDirectory()) {
      Serial.println("/");
      PrintDirectory(entry, numTabs + 1);
    }  //End if.

    else {
      // files have sizes, directories do not
      Serial.print("\t\t");
      Serial.println(entry.size(), DEC);
    }  //End else

    entry.close();  //Write the file to the disk.
  }

} 
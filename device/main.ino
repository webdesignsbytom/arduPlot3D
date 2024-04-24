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
String mainMenuItems[] = { "SD Card", "Motor Control", "Tests" };
String motorControlMenu[] = { "Speed+", "Speed-", "Deactivate motors", "Home XY", "Stop", "Back" };
String deviceTestsMenu[] = { "SD-Comm", "3-Axis", "Wifi-Comm", "BLE-Comm", "Back" };

// SD card menu
const int maxFiles = 50;  // Maximum number of files
String sdCardMenu[maxFiles];


String* currentMenu = mainMenuItems;  // Start with main menu
int mainMenuItemCount = sizeof(mainMenuItems) / sizeof(mainMenuItems[0]);
int currentMainMenuItem = 0;  // variable to track the current menu item
int currentSubMenuItem = 0;   // variable to track the current menu item

// Menu state
enum MenuState { MAIN_MENU,
                 SD_CARD_MENU,
                 MOTOR_CONTROL_MENU,
                 TESTS_MENU
};
MenuState currentMenuState = MAIN_MENU;

// SD Data
const int chipSelectPin = 53;  // Change this to your desired CS pin number
bool hasSDcard = false;

// Stepper motor connections
constexpr int dirPinMotorX = 23;
constexpr int stepPinMotorX = 2;
constexpr int dirPinMotorY = 22;
constexpr int stepPinMotorY = 3;

constexpr int enablePinMotorX = 30;  // Enable pin for X motor driver
constexpr int enablePinMotorY = 32;  // Enable pin for Y motor driver

static bool manualEnabled = false;

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
  { '1', '2', '3', 'A' },  // UP DOWN ENTER BACK
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
  lcd.print("ArduPlot3D online!");
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

  delay(1000);

  lcd.clear();
  lcd.print("> ");
  lcd.print(mainMenuItems[currentMainMenuItem]);

  // SD
  pinMode(chipSelectPin, OUTPUT);


  Serial.println("INTIT COMPLETE");
  updateMenuDisplay();
}

void loop() {
  char customKey = customKeypad.getKey();

  if (customKey != NO_KEY) {
    handleButtonPress(customKey);
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


void updateMenuDisplay() {
  lcd.clear();
  lcd.print("> ");
  lcd.print(currentMenu[currentMainMenuItem]);  // Displays the current selected item

  int numRows = 4;  // Get the number of rows on the LCD

  // Display subsequent menu items on the third and fourth rows
  for (int row = 1; row < numRows; row++) {
    lcd.setCursor(2, row);
    int nextMenuItem = (currentMainMenuItem + row) % mainMenuItemCount;
    lcd.print(currentMenu[nextMenuItem]);
  }
}

void updateSDCardMenuOptions() {
  int numRows = 4;  // Get the number of rows on the LCD

  File dir = SD.open("/");

  if (!dir) {
    lcd.setCursor(0, 1);
    lcd.print("No data");
    return;
  }

  int fileCount = 0;  // Counter for the number of files found

  while (File entry = dir.openNextFile()) {
    String filename = entry.name();

    // Add filename to the array
    sdCardMenu[fileCount] = filename;

    // Increment file counter
    fileCount++;

    if (fileCount >= maxFiles) {
      break;
    }

    entry.close();
  }

  dir.close();

  updateMenuDisplay();
}

void handleButtonPress(char key) {
  switch (key) {
    case '1':  // UP button
      moveCursorUp();
      break;
    case '2':  // DOWN button
      moveCursorDown();
      break;
    case '3':  // ENTER button
      selectMenuItem();
      break;
    case 'A':  // BACK button
      navigateBack();
      break;
    case '4': 
      startXaxisMotorOnly(); // X start 
      break;
    case '5':  
      stopXaxisMotorOnly(); // X stop
      break;
    case '6':  
      reverseXaxisMotorOnly(); // X revese
      break;
    default:
      break;
  }
}

void moveCursorUp() {
  if (currentMainMenuItem > 0) {
    currentMainMenuItem--;
  }
  updateMenuDisplay();
}

void moveCursorDown() {
  if (currentMainMenuItem < mainMenuItemCount - 1) {
    currentMainMenuItem++;
  }
  updateMenuDisplay();
}

void selectMenuItem() {
  switch (currentMenuState) {
    case MAIN_MENU:
      switch (currentMainMenuItem) {
        case 0:
          openSDreader();
          break;
        case 1:
          openMotorControlMenu();
          break;
        case 2:
          openDeviceTestsMenu();
        default:
          break;
      }
      break;
    case SD_CARD_MENU:
      readFileFromSD(sdCardMenu[currentMainMenuItem]);
      break;
    case MOTOR_CONTROL_MENU:
      switch (currentMainMenuItem) {
        case 0:
          increaseOverallSpeed();
          break;
        case 1:
          decreaseOverallSpeed();
          break;
        case 2:
          releaseXYMotors();
          break;
        case 3:
          homeAllAxis();
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
}

// Go back to previous menu
void navigateBack() {
  Serial.println("BACK <<---------------");
  // Implement logic to navigate back in menu
  // This might involve changing the current menu or going up one level in the menu hierarchy
  currentMenuState = MAIN_MENU;
  currentMenu = mainMenuItems;
  currentMainMenuItem = 0;
  updateMenuDisplay();
}

// SD Card reader
void openSDreader() {
  currentMenuState = SD_CARD_MENU;
  currentMenu = sdCardMenu;
  currentMainMenuItem = 0;

  lcd.clear();
  if (!SD.begin(chipSelectPin)) {
    lcd.setCursor(0, 1);
    lcd.print("No SD Card");
    while (1)
      ;  // Halt the program if SD card initialization fails
  }
  Serial.println("SD Card initialized");
  updateSDCardMenuOptions();
}

void readFileFromSD(String filename) {
  // Open the file for reading
  File file = SD.open(filename);

  if (!file) {
    Serial.println("Failed to open file.");
    return;
  }

  Serial.println("File contents:");

  // Read and print each line of the file
  while (file.available()) {
    Serial.println(file.readStringUntil('\n'));
  }

  // Close the file
  file.close();
}

// Motor control
void openMotorControlMenu() {
  Serial.println("MOTOR CONTROL ----------->>");
  currentMenuState = MOTOR_CONTROL_MENU;
  currentMenu = motorControlMenu;
  currentMainMenuItem = 0;

  updateMenuDisplay();
}

void increaseOverallSpeed() {
  Serial.println("increaseOverallSpeed");
}

void decreaseOverallSpeed() {
  Serial.println("decreaseOverallSpeed");
}

void releaseXYMotors() {
  Serial.println("releaseXYMotors");
  manualEnabled = !manualEnabled;                             // Toggle state
  digitalWrite(enablePinMotorX, manualEnabled ? HIGH : LOW);  // Disable or enable X motor
  digitalWrite(enablePinMotorY, manualEnabled ? HIGH : LOW);  // Disable or enable Y motor

  // Change the menu item text based on manual mode state
  if (manualEnabled) {
    motorControlMenu[2] = "Activate motors";  // Change to "Activate motors" when manual mode is disabled
  } else {
    motorControlMenu[2] = "Deactivate motors";  // Change to "Deactivate motors" when manual mode is enabled
  }

  updateMenuDisplay();
}

void homeAllAxis() {
  Serial.println("homeAllAxis");
}

// Device tests
void openDeviceTestsMenu() {
  Serial.println("TESTS MENU ----------->>");
  currentMenuState = TESTS_MENU;
  currentMenu = deviceTestsMenu;
  currentMainMenuItem = 0;

  updateMenuDisplay();
}

// X axis test
void startXaxisMotorOnly() {
    Serial.println("START X");
}
void stopXaxisMotorOnly() {
    Serial.println("START X");
}
void reverseXaxisMotorOnly()
    Serial.println("START X");

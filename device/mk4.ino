#include <Arduino.h>
#include <AccelStepper.h>
#include <Servo.h>
#include <Wire.h>
#include <SPI.h>
#include <SD.h>
#include <LiquidCrystal_I2C.h>

// The parameters are (I2C address, number of columns, number of rows).
LiquidCrystal_I2C lcd(0x27, 20, 4);

// Menu items
String mainMenuItems[] = { "SD Card", "Motor Control", "Movement", "Tests" };
String motorControlMenu[] = { "Deactivate motors", "Speed+", "Speed-", "Home XY", "Stop", "Back" };
String movementControlMenu[] = { "Run X", "Stop X", "Reverse X", "Run Y", "Stop Y", "Reverse Y", "Back" };
String deviceTestsMenu[] = { "SD-Comm", "3-Axis", "Wifi-Comm", "BLE-Comm", "Back" };

String* currentMenu = mainMenuItems;  // Start with main menu
int menuItemCount = sizeof(mainMenuItems) / sizeof(mainMenuItems[0]);
int currentMenuItemIndex = 0;  // variable to track the current menu item

// Buttons
constexpr int buttonUp = 46, buttonDown = 47, buttonEnter = 45, buttonBack = 44;

// Menu state
enum MenuState { MAIN_MENU,
                 SD_CARD_MENU,
                 MOTOR_CONTROL_MENU,
                 MOVEMENT_CONTROL_MENU,
                 TESTS_MENU
};

MenuState currentMenuState = MAIN_MENU;

// Stepper Motors
constexpr int dirPinMotorX = 23;
constexpr int stepPinMotorX = 2;
constexpr int enablePinMotorX = 22;  // Enable pin for X motor driver

constexpr int dirPinMotorY = 25;
constexpr int stepPinMotorY = 3;
constexpr int enablePinMotorY = 24;  // Enable pin for Y motor driver

static bool manualEnabledFull = false;
static bool manualEnabledX = false;
static bool manualEnabledY = false;

// Limit swithces
constexpr int limitSwitchXaxis = 28;
constexpr int limitSwitchYaxis = 29;
// Define the initial states of the limit switches
volatile bool limitSwitchXState = false;
volatile bool limitSwitchYState = false;

// Stepper motor configurations
AccelStepper stepperX(AccelStepper::DRIVER, stepPinMotorX, dirPinMotorX);
AccelStepper stepperY(AccelStepper::DRIVER, stepPinMotorY, dirPinMotorY);

// Limits and control flags
bool xAxisIsMoving = false;
bool yAxisIsMoving = false;

// Direction of steppers
bool xMovingForward = true;
bool yMovingForward = true;

// SD Card and data
// SCK = Pin 52 // MOSI = Pin 51 // MISO = Pin 50 // CS = Pin 50
const int chipSelectPin = 53;
bool hasSDcard = false;
const int maxFiles = 50;      // Maximum number of files
String sdCardMenu[maxFiles];  // Menu list


// Main Setup
void setup() {
  Serial.begin(9600);

  // LCD start up and message
  lcd.init();
  lcd.backlight();
  lcd.begin(20, 4);       // Initialize the LCD with 20 columns and 4 rows.
  
  lcd.print("Welcome!");  // Print a message to the LCD.
  lcd.setCursor(0, 1);    // Set the cursor to the beginning of the second row.
  lcd.print("ArduPlot3D online!");

  delay(1000);

  // SD
  pinMode(chipSelectPin, OUTPUT);

  // Stepper Setup
  stepperX.setMaxSpeed(1000);
  stepperY.setMaxSpeed(1000);

  stepperX.setSpeed(100);
  stepperY.setSpeed(100);

  // Initialize the limit switch pins as inputs with internal pull-up resistors
  pinMode(limitSwitchXaxis, INPUT_PULLUP);
  pinMode(limitSwitchYaxis, INPUT_PULLUP);

  // Attach interrupts to the limit switch pins
  //attachInterrupt(digitalPinToInterrupt(limitSwitchXaxis), limitSwitchXInterrupt, CHANGE);
  //attachInterrupt(digitalPinToInterrupt(limitSwitchYaxis), limitSwitchYInterrupt, CHANGE);

  // Display Menu
  updateMenuDisplay();

  Serial.println("INTIT COMPLETE");
}


void loop() {
  handleButtonPress();

  if (xAxisIsMoving) {
    stepperX.runSpeed();
  }
  if (yAxisIsMoving) {
    stepperY.runSpeed();
  }

   if (digitalRead(limitSwitchXaxis) == HIGH)
  {
    Serial.println("Activated! XXXXXXXXX");
  }
   if (digitalRead(limitSwitchYaxis) == HIGH)
  {
    Serial.println("Activated! YYYYYYYYYYYYYYYY");
  }
}


// Interrupt service routines for the limit switches
// void limitSwitchXInterrupt() {
//   Serial.println("XXXXXXXXXXXXXXXXXXXXXXXXXXXX!");
//   limitSwitchXState = digitalRead(limitSwitchXaxis);
// }

// void limitSwitchYInterrupt() {
//   Serial.println("YYYYYYYYYYYYYYYYYYYYYYYYYY!");
//   limitSwitchYState = digitalRead(limitSwitchYaxis);
// }


// Buttons on device //
///////////////////////

// Handle press of buttons - up, down, enter, back
void handleButtonPress() {
  if (digitalRead(buttonUp) == HIGH) {
    Serial.println("UPUPUPPUP!");
    moveCursorUp();
    delay(300);
  }
  if (digitalRead(buttonDown) == HIGH) {
    Serial.println("DOWNDOWNDOWN!");
    moveCursorDown();
    delay(300);
  }
  if (digitalRead(buttonEnter) == HIGH) {
    Serial.println("ENTERENTERENTER!");
    selectMenuItem();
    delay(300);
  }
  if (digitalRead(buttonBack) == HIGH) {
    Serial.println("BACKBACKBACK!");
    navigateBack();
    delay(300);
  }
}

void moveCursorUp() {
  if (currentMenuItemIndex > 0) {
    currentMenuItemIndex--;
  }
  updateMenuDisplay();
}

void moveCursorDown() {
  if (currentMenuItemIndex < menuItemCount - 1) {
    currentMenuItemIndex++;
  }
  updateMenuDisplay();
}

// Press enter and select from switch statement
void selectMenuItem() {
  switch (currentMenuState) {
    case MAIN_MENU:
      switch (currentMenuItemIndex) {
        case 0:
          openSDreader();
          break;
        case 1:
          openMotorControlMenu();
          break;
        case 2:
          openMovementsControlMenu();
          break;
        case 3:
          openTestControlMenu();
          break;
        default:
          navigateToMain();
          break;
      }
    case SD_CARD_MENU:
      readFileFromSD(sdCardMenu[currentMenuItemIndex]);
      break;
    case MOTOR_CONTROL_MENU:
      switch (currentMenuItemIndex) {
        case 0:
          releaseXYSteppers();
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        default:
          break;
      }
    case MOVEMENT_CONTROL_MENU:
      switch (currentMenuItemIndex) {
        case 0:
          startXaxisMotorOnly();
          break;
        case 1:
          stopXaxisMotorOnly();
          break;
        case 2:
          reverseXaxisMotorOnly();
          break;
        case 3:
          startYaxisMotorOnly();
          break;
        case 4:
          stopYaxisMotorOnly();
          break;
        case 5:
          reverseYaxisMotorOnly();
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
  currentMenuItemIndex = 0;

  menuItemCount = sizeof(mainMenuItems) / sizeof(mainMenuItems[0]);
  Serial.println("main menu item count");
  Serial.print(menuItemCount);

  updateMenuDisplay();
}


// Update LCD and menus //
///////////////////////

// Get number of items in list for update function
int getMenuItemCount(String menu[]) {
  return sizeof(menu) / sizeof(menu[0]);
}

void updateMenuDisplay() {
  lcd.clear();
  lcd.print("> ");
  lcd.print(currentMenu[currentMenuItemIndex]);  // Displays the current selected item

  int numRows = 4;

  // Display subsequent menu items on the third and fourth rows
  for (int row = 1; row < numRows; row++) {
    lcd.setCursor(2, row);
    int nextMenuItem = (currentMenuItemIndex + row) % menuItemCount;
    lcd.print(currentMenu[nextMenuItem]);
  }
}

// Open Menus on LCD //
///////////////////////

// Navigate to main menu
void navigateToMain() {
  Serial.println("Main");
  
  currentMenuState = MAIN_MENU;
  currentMenu = mainMenuItems;
  currentMenuItemIndex = 0;

  menuItemCount = sizeof(mainMenuItems) / sizeof(mainMenuItems[0]);
  Serial.println("main menu item count");
  Serial.print(menuItemCount);

  updateMenuDisplay();
}

// SD Card reader
void openSDreader() {
  Serial.println("OPEN SD CARD MENU");

  currentMenuState = SD_CARD_MENU;
  currentMenu = sdCardMenu;
  currentMenuItemIndex = 0;

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

// Motor control
void openMotorControlMenu() {
  Serial.println("MOTOR CONTROL ----------->>");
  currentMenuState = MOTOR_CONTROL_MENU;
  currentMenu = motorControlMenu;
  currentMenuItemIndex = 0;

  menuItemCount = sizeof(motorControlMenu) / sizeof(motorControlMenu[0]);

  updateMenuDisplay();
}

// Movements control menu - start x...stop x....
void openMovementsControlMenu() {
  Serial.println("MOVEMENT CONTROL ----------->>");
  currentMenuState = MOVEMENT_CONTROL_MENU;
  currentMenu = movementControlMenu;
  currentMenuItemIndex = 0;

  menuItemCount = sizeof(movementControlMenu) / sizeof(movementControlMenu[0]);

  updateMenuDisplay();
}

// Tests menu
void openTestControlMenu() {
  Serial.println("TESTS CONTROL ----------->>");
  currentMenuState = TESTS_MENU;
  currentMenu = deviceTestsMenu;
  currentMenuItemIndex = 0;

  menuItemCount = sizeof(deviceTestsMenu) / sizeof(deviceTestsMenu[0]);
  Serial.println("test menu item count");
  Serial.print(menuItemCount);

  updateMenuDisplay();
}


// SD Card functions //
///////////////////////

// Read files from SD Card
void readFileFromSD(String filename) {
  Serial.println("READING FILES XXXXXXXXXXXXXXXXX");

  // Open the file for reading
  File file = SD.open(filename);
  
  if (!file) {
    Serial.println("Failed to open file.");
    return;
  }

  Serial.println(file.readStringUntil('\n'));

  // Close the file
  Serial.println("fIINSIHJED READING FILES");

  file.close();
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
    Serial.println("FILENAME: ");
    Serial.print(filename);
    Serial.println("\n");
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

// Motor settings //
////////////////////

// Release motor locks on X and Y axis steppers
void releaseXYSteppers() {
  Serial.println("releaseXYSteppers");
  manualEnabledFull = !manualEnabledFull;                            
  digitalWrite(enablePinMotorX, manualEnabledFull ? HIGH : LOW);  // Disable or enable X motor
  digitalWrite(enablePinMotorY, manualEnabledFull ? HIGH : LOW);  // Disable or enable Y motor

  // Change the menu item text based on manual mode state
  if (manualEnabledFull) {
    motorControlMenu[0] = "Activate motors";  // Change to "Activate motors" when manual mode is disabled
  } else {
    motorControlMenu[0] = "Deactivate motors";  // Change to "Deactivate motors" when manual mode is enabled
  }

  updateMenuDisplay();
}

void increaseOverallSpeed() {
  Serial.println("increaseOverallSpeed");
}

void decreaseOverallSpeed() {
  Serial.println("decreaseOverallSpeed");
}

void homeAllAxis() {
  Serial.println("homeAllAxis");
}

// // X axis test
void startXaxisMotorOnly() {
  Serial.println("START X");
  stepperX.setSpeed(100);
  xAxisIsMoving = true;
}

void stopXaxisMotorOnly() {
  xAxisIsMoving = false;
  Serial.println("STOP X");
}

void reverseXaxisMotorOnly() {
  Serial.println("REVERSE X");
  xMovingForward = !xMovingForward;
}


// Y axis test
void startYaxisMotorOnly() {
  Serial.println("START Y");
  stepperY.setSpeed(100);
  yAxisIsMoving = true;
}

void stopYaxisMotorOnly() {
  yAxisIsMoving = false;
  Serial.println("STOP Y");
}

void reverseYaxisMotorOnly() {
  Serial.println("REVERSE Y");
  yMovingForward = !yMovingForward;
}

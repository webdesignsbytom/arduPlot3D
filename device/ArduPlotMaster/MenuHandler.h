#ifndef MENUHANDLER_H
#define MENUHANDLER_H

#include <Arduino.h>

// Enum declaration
enum MenuState { MAIN_MENU, SD_CARD_MENU, MOTOR_CONTROL_MENU, TESTS_MENU };

// Declare `currentMenuState` as an external variable so it can be shared
extern MenuState currentMenuState;

// Other declarations
extern String* currentMenu;
extern int currentMainMenuItem;
extern String mainMenuItems[];

void initializeMenu();
void updateMenuDisplay();
void handleButtonPress(char key);
void moveCursorUp();
void moveCursorDown();
void selectMenuItem();
void navigateBack();
void checkButtons();

// Add declarations for menu-opening functions
void openSDreader();
void openMotorControlMenu();
void openDeviceTestsMenu();

#endif

#include "MenuHandler.h"
#include "LCDHandler.h"   // For LCD display updates
#include "SDHandler.h"    // To access SD functions
#include "StepperControl.h" // For motor control functions

MenuState currentMenuState = MAIN_MENU;
String* currentMenu = mainMenuItems;
int currentMainMenuItem = 0;
String mainMenuItems[] = { "SD Card", "Motor Control", "Tests" };
int mainMenuItemCount = sizeof(mainMenuItems) / sizeof(mainMenuItems[0]);

void initializeMenu() {
    currentMenu = mainMenuItems;
    currentMainMenuItem = 0;
    updateMenuDisplay();
}

void handleButtonPress(char key) {
    switch (key) {
        case '1': moveCursorUp(); break;
        case '2': moveCursorDown(); break;
        case '3': selectMenuItem(); break;
        case 'A': navigateBack(); break;
        // Add other cases for specific menu items or controls as needed
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
                case 0: openSDreader(); break;
                case 1: openMotorControlMenu(); break;
                case 2: openDeviceTestsMenu(); break;
                default: break;
            }
            break;
        case SD_CARD_MENU:
            readFileFromSD(sdCardMenu[currentMainMenuItem]);
            break;
        // Add other cases as needed
    }
}

void navigateBack() {
    currentMenuState = MAIN_MENU;
    currentMenu = mainMenuItems;
    currentMainMenuItem = 0;
    updateMenuDisplay();
}

void checkButtons() {
    // Implement button handling here
}

#include "MenuHandler.h"

void openSDreader() {
    // Implementation of SD menu
    Serial.println("Opening SD Card Menu...");
}

void openMotorControlMenu() {
    // Implementation of Motor Control menu
    Serial.println("Opening Motor Control Menu...");
}

void openDeviceTestsMenu() {
    // Implementation of Device Tests menu
    Serial.println("Opening Device Tests Menu...");
}


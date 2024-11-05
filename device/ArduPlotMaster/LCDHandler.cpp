#include "LCDHandler.h"
#include "MenuHandler.h"

LiquidCrystal_I2C lcd(0x27, 20, 4);

void initializeLCD() {
    lcd.init();
    lcd.backlight();
    lcd.begin(20, 4);
    displayWelcomeMessage();
}

void updateMenuDisplay() {
    lcd.clear();
    lcd.print("> ");
    lcd.print(currentMenu[currentMainMenuItem]);
}

void displayWelcomeMessage() {
    lcd.print("Welcome!");
    lcd.setCursor(0, 1);
    lcd.print("ArduPlot3D online!");
}

# TPGL

## Plotting language

Tom's Plotter Graphic Language (TPGL)

Binary format for vector commands

## Links
https://github.com/winder/Universal-G-Code-Sender
https://all3dp.com/2/marlin-firmware-how-to-edit-marlin-firmware/

## Components

TPGL Header - tool type - set up info
TPGL Body - main simulation
TPGL Footer - whats in this?

## Commands

### Motions

1. Move to = M
2. Finger Down = FD
3. Finger Up = FU
4. Terminate = T (␃) 0x03
5. XY speed = IS
6. Change XY speed = IX
7. Z speed = OS
8. Change Z speed = OX
9. Number of fingers FN
10. Pause = P

### Data Types

Plot points have 5 data tpyes

1. Tap = DT
2. Move and Tap = DMT
3. Drag = DD
4. Move = DM
5. Time out DTO

### Functions

Test functions and UI commands
Sequence alphabetical after T

1. Zero/Home All axis = AZ - not a test function
2. Finger travel distance =
3. Update finger travel distance =

### Test functions

1. Test XY = TA
2. Text Z = TB
3. Text XYZ = TC
4. Test finger 1 = TD
5. Test finger 2 = TE
6. Test finger 3 = TF

### Firmware

1. Firmware update = AF

2. Syntax
   ESC0x19

Return value syntax
a(T) a:

-1: ready to receive firmware binary
0: firmware update successful
1: invalid update command
2: crc error (corrupt binary)
3: bad firmware
4: firmware update was canceled

## Example Command

Process:

1 MoveCommand Terminate || 2 MoveAndTapCommand xySpeed xy Num fingers zSpeed fingerDown fingerUp Terminate || 3 MoveAndTapCommand
DM x0,y0 T || DMT IS5 x50,y50 FN1 OS5 FD FU T ||

String:

M0,0(T),DMT,OS5,X50,Y50,FN1,IS5,FD,FU(T),

### Sample

Sending data to bluetooth device: FG(T)FH(T)FG(T)FH(T)FG(T)FH(T)FG(T)FH(T)FG(T)FH(T)

Header:
H Speed=100,StartPos=0,0,Calibration=Standard

Body:
M 0,0 T
DMT 10,10 50,50 5s T
FU T
FD T

Footer:
F ReturnHome
F CleanUp



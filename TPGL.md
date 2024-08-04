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



Here's a plotting language tailored for moving an arm with a tapping finger on an X and Y axis motor, based on the provided GPGL and concepts:

Plotting Language Specification for Arm with Tapping Finger
1. Terminator
Definition: Terminator = (T) = byte 0x03
2. Escape Character
Definition: ESC = byte 0x1b
3. Sequential Command
Syntax:
bash
Copy code
<command body>(T)
Description: The command is executed after all preceding commands have been executed.
4. Direct Command
Syntax:
css
Copy code
ESC<control code>
Description: The command is executed immediately, without waiting for preceding commands.
5. Plotter Units (PU)
Definition: 1 PU = 0.05mm
Example: M0,0(T)D100,0(T) - Move to (0,0) and draw a 5mm line along the X axis.
6. Commands
Move (M)

Syntax:
scss
Copy code
Mx,y(T)
Description: Move to the absolute coordinates (x,y) in Plotter Units without drawing.
Example: M200,100(T) - Move to (200 PU, 100 PU).
Draw (D)

Syntax:
scss
Copy code
Dx,y(T)
Description: Draw a straight line from the current position to the absolute coordinates (x,y) in Plotter Units.
Example: D300,200(T) - Draw a line to (300 PU, 200 PU).
Tap (TP)

Syntax:
scss
Copy code
TPx,y,count(T)
Description: Move to (x,y) and tap at the coordinates a specified number of times (count).
Example: TP150,150,3(T) - Move to (150 PU, 150 PU) and tap three times.
Move and Tap (MT)

Syntax:
scss
Copy code
MTx,y,count(T)
Description: Move to (x,y) and tap at the coordinates once.
Example: MT250,250(T) - Move to (250 PU, 250 PU) and tap once.
Draw Multiple Lines (DM)

Syntax:
scss
Copy code
DMx1,y1,x2,y2,...,xn,yn(T)
Description: Draw multiple straight lines through the specified points.
Example: DM100,100,200,200,300,300(T) - Draw lines through (100,100) -> (200,200) -> (300,300).
Move Relative (MR)

Syntax:
scss
Copy code
MRdx,dy(T)
Description: Move to the position relative to the current position by (dx,dy) in Plotter Units without drawing.
Example: MR50,50(T) - Move 50 PU right and 50 PU up from the current position.
Draw Relative (DR)

Syntax:
scss
Copy code
DRdx,dy(T)
Description: Draw a straight line from the current position to the relative position (dx,dy) in Plotter Units.
Example: DR100,0(T) - Draw a line 100 PU to the right from the current position.
Bezier Curve (BZ)

Syntax:
scss
Copy code
BZa,x1,y1,x2,y2,x3,y3,x4,y4(T)
Description: Draw a cubic Bezier curve with control points.
Parameters:
a: Pen state (0: lift pen, 1: do not lift pen)
x1,y1: Start point coordinates
x2,y2: First control point coordinates
x3,y3: Second control point coordinates
x4,y4: End point coordinates
Example: BZ0,100,100,150,150,200,200,250,250(T) - Draw a Bezier curve.
Select Tool (J)

Syntax:
scss
Copy code
Ja(T)
Parameters:
a: Tool number (1: Tool 1, 2: Tool 2)
Example: J1(T) - Select Tool 1.
Get Tool (G)

Syntax:
scss
Copy code
G(T)
Description: Return the currently selected tool.
Example: G(T) returns 1(T) if Tool 1 is selected.
Test Cut (FH)

Syntax:
scss
Copy code
FH(T)
Description: Draw the test cut shape (square and triangle) at the current position.
Example: FH(T) - Execute a test cut.
Example Commands
Move to (0,0) and Draw a Line

r
Copy code
M0,0(T)D100,0(T)
Move to (150,150) and Tap 3 Times

r
Copy code
TP150,150,3(T)
Move to (200,200) and Tap Once

r
Copy code
MT200,200(T)
Draw Multiple Lines

r
Copy code
DM100,100,200,200,300,300(T)
Move and Draw a Bezier Curve

r
Copy code
M0,0(T)BZ0,0,0,50,50,100,100,150,150(T)
This language provides a comprehensive set of commands to control the arm and tapping finger for various operations, including moving, drawing, tapping, and creating complex shapes with Bezier curves.





so what would it look like printed out as a full command
ChatGPT
Certainly! Here’s an example of what a complete set of commands might look like printed out as a full sequence. This example will include a variety of movements, drawings, and taps:

Full Command Sequence Example
Select Tool 1:

scss
Copy code
J1(T)
Move to (0,0):

r
Copy code
M0,0(T)
Draw a 5mm Line Along the X Axis:

r
Copy code
D100,0(T)
Move to (50,50) Without Drawing:

r
Copy code
M50,50(T)
Tap 3 Times at (50,50):

r
Copy code
TP50,50,3(T)
Move to (100,100) and Tap Once:

r
Copy code
MT100,100(T)
Draw Multiple Lines:

r
Copy code
DM100,100,150,150,200,200,250,250(T)
Move Relative by (20,30):

r
Copy code
MR20,30(T)
Draw Relative Line by (50,50):

r
Copy code
DR50,50(T)
Draw a Bezier Curve:

r
Copy code
BZ0,200,200,250,250,300,300,350,350(T)
Execute a Test Cut:

scss
Copy code
FH(T)
Combined Full Command Sequence
Putting all the above commands together, you get the following:

scss
Copy code
J1(T)M0,0(T)D100,0(T)M50,50(T)TP50,50,3(T)MT100,100(T)DM100,100,150,150,200,200,250,250(T)MR20,30(T)DR50,50(T)BZ0,200,200,250,250,300,300,350,350(T)FH(T)
This sequence:

Selects Tool 1.
Moves to the starting point (0,0).
Draws a straight line of 5mm along the X axis.
Moves to (50,50) without drawing.
Taps 3 times at (50,50).
Moves to (100,100) and taps once.
Draws multiple connected lines through specified points.
Moves relatively by (20,30).
Draws a relative line by (50,50).
Draws a Bezier curve with specified control points.
Executes a test cut.
Each command is terminated with the terminator (T), ensuring the proper execution sequence for the arm with the tapping finger.
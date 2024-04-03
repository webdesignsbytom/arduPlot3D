# TPGL

## Plotting language

Tom's Plotter Graphic Language (TPGL)

Binary format for vector commands

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

bluetooth.js:137 Data has successfully sent to BT device.
bluetooth.js:48
DataView(16)
buffer
:
ArrayBuffer(16)
byteLength
:
16
detached
:
false
maxByteLength
:
16
resizable
:
false
[[Prototype]]
:
ArrayBuffer
[[Int8Array]]
:
Int8Array(16)
0
:
73
1
:
32
2
:
97
3
:
109
4
:
32
5
:
97
6
:
110
7
:
32
8
:
97
9
:
114
10
:
100
11
:
117
12
:
105
13
:
110
14
:
111
15
:
46
buffer
:
ArrayBuffer(16)
byteLength
:
16
byteOffset
:
0
length
:
16
Symbol(Symbol.toStringTag)
:
"Int8Array"
[[Prototype]]
:
TypedArray
[[Uint8Array]]
:
Uint8Array(16)
0
:
73
1
:
32
2
:
97
3
:
109
4
:
32
5
:
97
6
:
110
7
:
32
8
:
97
9
:
114
10
:
100
11
:
117
12
:
105
13
:
110
14
:
111
15
:
46
buffer
:
ArrayBuffer(16)
byteLength
:
16
byteOffset
:
0
length
:
16
Symbol(Symbol.toStringTag)
:

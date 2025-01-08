in the setup function 
  activate all electrical components
  activate menu and functions

in loop
  based on enum choose what happens
    OFF do nothing - test mode 
    IDLE listen for menu changes, sd insert, wifi/ble listening
    HOMING listen for limit switches, run motor homing functions, limit switches when hit tell the motors to reverse until the limit is no longer active
    RUNNING listen for limit switches, listen for buttons. menu runs simulation function, can stop, pause simulation running. runs the gpgl and motors. 
    FINISHED move motors away from phone. alerts user to finished. 

Should have a run time clock 
  
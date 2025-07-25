from machine import Pin
from time import sleep

pin0 = Pin(0, Pin.OUT)
pin1 = Pin(1, Pin.OUT)
pin2 = Pin(2, Pin.OUT)
pin3 = Pin(3, Pin.OUT)
pin4= Pin(4, Pin.OUT)
pin5 = Pin(5, Pin.OUT)
pin6= Pin(6, Pin.OUT)
pin7= Pin(7, Pin.OUT)
# This code controls a 7-segment display using GPIO pins on a microcontroller.

# for your reference, the pins are connected as follows:
# pin0 -> segment a
# pin1 -> segment b
# pin2 -> segment c
# pin3 -> segment d
# pin4 -> segment e
# pin5 -> segment f
# pin6 -> segment g
# pin7 -> segment dp (decimal point)

def zero():
    pin0.off()
    pin1.off()
    pin2.off()
    pin3.off()
    pin4.off()
    pin5.off()
    pin6.off()
    pin7.off()

def one():
    pin0.off()
    pin1.on()
    pin2.on()
    pin3.off()
    pin4.off()
    pin5.off()
    pin6.off()
    pin7.off()

def two():
    pin0.on()
    pin1.on()
    pin2.off()
    pin3.on()
    pin4.on()
    pin5.off()
    pin6.on()
    pin7.off()

def three():
    pin0.on()
    pin1.on()
    pin2.on()
    pin3.on()
    pin4.off()
    pin5.off()
    pin6.on()
    pin7.off()

def four():
    pin0.off()
    pin1.on()
    pin2.on()
    pin3.off()
    pin4.off()
    pin5.on()
    pin6.on()
    pin7.off()

def five():
    pin0.on()
    pin1.off()
    pin2.on()
    pin3.on()
    pin4.on()
    pin5.off()
    pin6.on()
    pin7.off()

def six():
    pin0.on()
    pin1.off()
    pin2.on()
    pin3.on()
    pin4.on()
    pin5.on()
    pin6.on()
    pin7.off()

def seven():    
    pin0.on()
    pin1.on()
    pin2.on()
    pin3.off()
    pin4.off()
    pin5.off()
    pin6.off()
    pin7.off()

def eight():
    pin0.on()
    pin1.on()
    pin2.on()
    pin3.on()
    pin4.on()
    pin5.on()
    pin6.on()
    pin7.off()

def nine():
    pin0.on()
    pin1.on()
    pin2.on()
    pin3.on()
    pin4.off()
    pin5.on()
    pin6.on()
    pin7.off()


def on():
    pin0.on()
    pin1.on()
    pin2.on()
    pin3.on()
    pin4.on()
    pin5.on()
    pin6.on()
    pin7.on()

#what line can we put here to make all LEDs are off before we run the code?
def all_off():
    pin0.off()
    pin1.off()
    pin2.off()
    pin3.off()
    pin4.off()
    pin5.off()
    pin6.off()
    pin7.off()

while True:
    zero()
    sleep(10)
    one()
    sleep(1)
    two()
    sleep(1)
    three()
    sleep(1)
    four()
    sleep(1)
    five()
    sleep(1)
    six()
    sleep(1)
    seven()
    sleep(1)
    eight()
    sleep(1)
    nine()
    sleep(1)
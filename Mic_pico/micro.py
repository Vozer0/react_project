from machine import Pin, ADC
from time import sleep

adc = ADC(Pin(26))
roomtempadc = 31335
roomtemp = 23.33


while True:
    adcvalue = adc.read_u16()

    temperature = roomtemp + (adcvalue - roomtempadc) / (-387)

    print(f"Temperature: {temperature}")    

    sleep(1)

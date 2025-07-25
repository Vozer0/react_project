# morse.py David M. Vocero
from machine import Pin, PWM
import time

# Set up LED pin  (GPIO pin)
led_pin = 15
led = PWM(Pin(led_pin))
led.freq(1000)  
#  PWM duty : low brightness (0-65535)
duty_on = 1000   # Lower value = dimmer = less power
duty_off = 0
#1kHz frequency for the LED

# Morse code timing:sec
unit = 0.2  # 200 ms per unit
dot = unit
dash = 3 * unit
intra_char_space = unit
inter_char_space = 3 * unit
inter_word_space = 7 * unit

# Morse code dictionary
morse = {
    'D': '-..',
    'A': '.-',
    'V': '...-',
    'I': '..',
}

def blink(symbol):
    if symbol == '.':
        led.duty_u16(duty_on)
        time.sleep(dot)
        led.duty_u16(duty_off)
    elif symbol == '-':
        led.duty_u16(duty_on)
        time.sleep(dash)
        led.duty_u16(duty_off)
    time.sleep(intra_char_space)

def morse_letter(letter):
    for i, symbol in enumerate(morse[letter]):
        blink(symbol)
        # No extra space after last symbol in letter
    time.sleep(inter_char_space - intra_char_space)

def morse_word(word):
    for i, letter in enumerate(word):
        morse_letter(letter.upper())
    time.sleep(inter_word_space - inter_char_space)

# Main loop: spell "David"
while True:
    for letter in "DAVID":
        morse_letter(letter)
    time.sleep(2)  # Pause before repeating
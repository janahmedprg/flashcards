import pyautogui
from PIL import Image

def get_hex_under_cursor():
    # Get the current position of the mouse cursor
    x, y = pyautogui.position()
    
    # Capture the screen at the cursor position
    screenshot = pyautogui.screenshot(region=(x, y, 1, 1))
    
    # Get the RGB color of the pixel at the cursor position
    r, g, b = screenshot.getpixel((0, 0))
    
    # Convert RGB to hexadecimal
    hex_code = "#{:02x}{:02x}{:02x}".format(r, g, b)
    
    return hex_code

if __name__ == "__main__":
    try:
        while True:
            hex_code = get_hex_under_cursor()
            print("Hex under cursor:", hex_code)
    except KeyboardInterrupt:
        print("\nExiting...")

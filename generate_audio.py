#!/usr/bin/env python3
import os
import time
from gtts import gTTS

OUTPUT_DIR = "public/audio"

# Audio database: (filename, text_to_speak, language_code)
PHRASES = [
    # Tamil Place Names & Proper Nouns
    ("chennai", "சென்னை", "ta"),
    ("mahabalipuram", "மகாபலிபுரம்", "ta"),
    ("puducherry", "புதுச்சேரி", "ta"),
    ("kumbakonam", "கும்பகோணம்", "ta"),
    ("gangaikonda_cholapuram", "கங்கைகொண்ட சோழபுரம்", "ta"),
    ("chettinad", "செட்டிநாடு", "ta"),
    ("visalam", "விசாலம்", "ta"),
    ("madurai", "மதுரை", "ta"),
    ("meenakshi", "மீனாட்சி", "ta"),
    ("jigarthanda", "ஜிகர்தண்டா", "ta"),
    
    # Tamil Phrases
    ("ta_hello", "வணக்கம்", "ta"),
    ("ta_thank_you", "நன்றி", "ta"),
    ("ta_my_name_is_ian", "என் பெயர் இயான்", "ta"),
    ("ta_my_name_is_laura", "என் பெயர் லாரா", "ta"),
    ("ta_my_name_is_william", "என் பெயர் வில்லியம்", "ta"), # William in Tamil
    ("ta_how_much_is_it", "இது எவ்வளவு?", "ta"),
    
    # Sinhala Place Names & Proper Nouns
    ("sri_lanka", "ශ්‍රී ලංකාව", "si"),
    ("colombo", "කොළඹ", "si"),
    ("sigiriya", "සීගිරිය", "si"),
    ("kandalama", "කණ්ඩලම", "si"),
    ("minneriya", "මින්නේරිය", "si"),
    
    # Sinhala Phrases
    ("si_hello", "ආයුබෝවන්", "si"),
    ("si_thank_you", "ස්තුතියિ", "si"),
    ("si_my_name_is_ian", "මගේ නම ඉයන්", "si"),
    ("si_my_name_is_laura", "මගේ නම ලෝරා", "si"),
    ("si_my_name_is_william", "මගේ නම විලિયම්", "si"), # William in Sinhala
    ("si_how_much_is_it", "මේක කීයද?", "si"),
]

def main():
    print(f"Creating output directory: {OUTPUT_DIR}")
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    total = len(PHRASES)
    success = 0
    
    for i, (filename, text, lang) in enumerate(PHRASES):
        outfile = os.path.join(OUTPUT_DIR, f"{filename}.mp3")
        print(f"[{i+1}/{total}] Generating '{filename}' ({lang}) -> {outfile}")
        
        try:
            tts = gTTS(text=text, lang=lang, slow=False)
            tts.save(outfile)
            success += 1
            print("  ✓ Success")
        except Exception as e:
            print(f"  ✗ Error: {e}")
            
        time.sleep(0.2)
        
    print(f"\nCompleted! Generated {success}/{total} files.")

if __name__ == "__main__":
    main()

from  AppKit import NSSpeechSynthesizer
import time
import sys


if len(sys.argv) < 2:
   text = raw_input('> ')
else:
   text = sys.argv[1]

nssp = NSSpeechSynthesizer

ve = nssp.alloc().init()

voices = ["com.apple.speech.synthesis.voice.Alex",
"com.apple.speech.synthesis.voice.Vicki",
"com.apple.speech.synthesis.voice.Victoria",
"com.apple.speech.synthesis.voice.Zarvox" ]

# for voice in nssp.availableVoices():
for voice in voices:
   ve.setVoice_(voice)
   print voice
   ve.startSpeakingString_(text)
   while ve.isSpeaking():
      time.sleep(1)

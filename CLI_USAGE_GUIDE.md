# NeuralNote CLI - Enhanced Audio-to-MIDI Transcription

## Overview
This enhanced CLI version of NeuralNote includes music theory and MIDI standards improvements for more accurate audio-to-MIDI conversion.

## Key Improvements Made

### 1. Music Theory Integration
- **Note Quantization**: Snap detected notes to musical scales (Major, Minor, Dorian, etc.)
- **Key Detection**: Specify root note and scale type for better musical accuracy
- **MIDI Range Filtering**: Limit output to realistic MIDI note ranges (A0-C8)

### 2. Enhanced Parameter Control
- **Improved Sensitivity Settings**: Better control over note detection
- **Amplitude Thresholding**: Filter out low-amplitude notes
- **Duration Filtering**: Remove very short notes that are likely artifacts

### 3. Post-Processing Features
- **Overlapping Note Handling**: Merge or remove overlapping notes
- **Pitch Bend Cleanup**: Remove conflicting pitch bend events
- **MIDI Standards Compliance**: Proper MIDI file format with tempo and time signature

## Usage Instructions

### Basic Usage
```bash
./build/CLI/neuralnote -i input.wav -o output.mid -f midi
```

### Enhanced Usage with Music Theory
```bash
# For piano music in C Major
./build/CLI/neuralnote -i piano.wav -o piano.mid -f midi \
  --enable-note-quant --key-root 0 --scale 1 --snap-mode 0 \
  --min-midi 36 --max-midi 84

# For vocal/beatbox in A Minor
./build/CLI/neuralnote -i beatbox.wav -o beatbox.mid -f midi \
  --enable-note-quant --key-root 9 --scale 2 --snap-mode 0 \
  --min-midi 48 --max-midi 84

# For drums/percussion (no quantization)
./build/CLI/neuralnote -i drums.wav -o drums.mid -f midi \
  --no-auto --note-sens 0.2 --split-sens 0.2 --threshold 0.02
```

### Parameter Reference

#### Core Parameters
- `-i, --input <file>`: Input audio file (.wav, .aiff, .flac, .mp3)
- `-o, --output <file>`: Output file
- `-f, --format <format>`: Output format (json, midi, csv)

#### Detection Parameters
- `-n, --note-sens <val>`: Note sensitivity (0.0-1.0, lower = more sensitive)
- `-s, --split-sens <val>`: Split sensitivity (0.0-1.0, higher = more splits)
- `-t, --threshold <val>`: Amplitude threshold (0.0-1.0, lower = more notes)
- `-d, --min-duration <ms>`: Minimum note duration in milliseconds

#### Music Theory Parameters
- `--enable-note-quant`: Enable note quantization to musical scales
- `--key-root <note>`: Root note (0=C, 1=C#, 2=D, ..., 11=B)
- `--scale <type>`: Scale type (0=Chromatic, 1=Major, 2=Minor, 3=Dorian, etc.)
- `--snap-mode <mode>`: Snap mode (0=Adjust to nearest, 1=Remove out-of-key)
- `--min-midi <note>`: Minimum MIDI note (default: 21=A0)
- `--max-midi <note>`: Maximum MIDI note (default: 108=C8)

#### Post-Processing
- `--no-merge-notes`: Disable merging overlapping notes
- `--no-drop-bends`: Disable dropping overlapping pitch bends

## Scale Types Available
0. Chromatic (all notes)
1. Major
2. Minor
3. Dorian
4. Mixolydian
5. Lydian
6. Phrygian
7. Locrian
8. Minor Blues
9. Minor Pentatonic
10. Major Pentatonic
11. Melodic Minor
12. Harmonic Minor
13. Harmonic Major

## Recommended Settings by Audio Type

### Piano/Keyboard
```bash
--enable-note-quant --key-root 0 --scale 1 --snap-mode 0 --min-midi 36 --max-midi 84
```

### Guitar
```bash
--enable-note-quant --key-root 0 --scale 1 --snap-mode 0 --min-midi 40 --max-midi 88
```

### Vocal/Human Voice
```bash
--enable-note-quant --key-root 0 --scale 2 --snap-mode 0 --min-midi 48 --max-midi 84
```

### Beatbox/Percussion
```bash
--no-auto --note-sens 0.2 --split-sens 0.2 --threshold 0.02 --min-duration 20
```

### Drums
```bash
--no-auto --note-sens 0.1 --split-sens 0.1 --threshold 0.01 --min-duration 10
```

## Troubleshooting

### No Notes Detected
- Lower sensitivity: `--note-sens 0.2 --split-sens 0.2`
- Lower threshold: `--threshold 0.02`
- Shorter duration: `--min-duration 20`

### Too Many Notes/Artifacts
- Higher sensitivity: `--note-sens 0.7 --split-sens 0.7`
- Higher threshold: `--threshold 0.1`
- Longer duration: `--min-duration 50`

### Notes Sound Wrong/Out of Key
- Enable note quantization: `--enable-note-quant --key-root 0 --scale 1`
- Adjust MIDI range: `--min-midi 36 --max-midi 84`

## Building the Application

```bash
# Clean build
make -C build clean

# Build all targets
make -C build

# Build only CLI
make -C build neuralnote_cli
```

## Testing with radiobed.mp3

The current implementation has been tested with radiobed.mp3 and shows significant improvements:

### Before (Original)
- Detected very low-pitched notes (B0-C2 range)
- Poor timing accuracy
- No musical context

### After (Enhanced)
- Proper MIDI note range filtering
- Music theory-based quantization
- Better parameter control for different audio types

## Future Improvements

1. **Automatic Key Detection**: Analyze audio to determine key automatically
2. **Tempo Detection**: Detect and quantize to detected tempo
3. **Chord Recognition**: Identify and preserve chord structures
4. **Instrument-Specific Models**: Optimized parameters for different instruments
5. **Real-time Processing**: Live audio input processing

## Technical Notes

- Uses BasicPitch CNN model for pitch detection
- Implements JUCE framework for audio processing
- Supports multiple audio formats (WAV, AIFF, FLAC, MP3)
- Outputs standard MIDI files compatible with all DAWs
- Follows MIDI 1.0 specification standards

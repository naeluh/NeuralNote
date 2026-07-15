# Cursor Prompt: NeuralNote Drums CLI Updates & Enhancements

## Context
I have a working C++ CLI (`neuralnote_drums_cli.cpp`) that converts beatboxing audio to MIDI drum patterns. I need to add features, fix bugs, or improve the CLI based on user feedback.

**Current Implementation:**
- Input: Audio files (.wav, .mp3, .aiff, .flac)
- Output: MIDI files (General MIDI drum mapping)
- Framework: JUCE (audio I/O, MIDI generation)
- Model: BasicPitch neural network (ONNX Runtime)
- Platform: macOS (M3 Pro optimized), Linux, Windows

**Files Involved:**
- `neuralnote_drums_cli.cpp` - Main CLI implementation
- `CMakeLists.txt` - Build configuration with drums target
- `build_drums.sh` - Build script
- `drums-cli-wrapper.js` - Node.js wrapper
- `Lib/Model/` - Shared model code (BasicPitch, Features, Notes)

---

## Common CLI Update Scenarios

### 1. Add New Command-Line Parameters

**Example Request:**
> "Add a `--velocity-scale` parameter to adjust MIDI velocity (0.5-2.0 multiplier)"

**What to do:**
1. Add field to `CLIArgs` struct
2. Add parsing in `parseArgs()` function
3. Update `printUsage()` help text
4. Apply parameter in processing logic
5. Update CLI wrapper if needed

**Code locations:**
```cpp
// In neuralnote_drums_cli.cpp

// 1. Add to struct (around line 30)
struct CLIArgs {
    // ... existing fields
    float velocityScale = 1.0f;  // NEW
};

// 2. Add parsing (around line 60)
else if (arg == "--velocity-scale" && i + 1 < argc) {
    args.velocityScale = juce::String(argv[++i]).getFloatValue();
}

// 3. Update help text (around line 45)
std::cout << "  --velocity-scale <val>  Velocity multiplier 0.5-2.0 (default: 1.0)\n";

// 4. Apply in saveMidi() (around line 180)
int velocity = static_cast<int>(drum.velocity * 127.0 * args.velocityScale);
velocity = juce::jlimit(1, 127, velocity);
```

### 2. Add New Drum Mapping

**Example Request:**
> "Add support for Cowbell (MIDI note 56) detected from high-frequency hits"

**What to do:**
1. Add to `DrumType` enum
2. Update `mapPitchToDrum()` logic
3. Update help text with new mapping
4. Test with sample audio

**Code locations:**
```cpp
// 1. Add to enum (around line 20)
enum class DrumType {
    // ... existing drums
    Cowbell = 56,        // NEW
};

// 2. Update mapping (around line 90)
DrumType mapPitchToDrum(int midiNote, float amplitude) {
    if (midiNote <= 42) return DrumType::BassDrum;
    if (midiNote <= 52) return DrumType::Snare;
    // ... existing logic
    if (midiNote >= 84 && amplitude > 0.7f) return DrumType::Cowbell; // NEW
    return DrumType::HighTom;
}

// 3. Update printUsage() (around line 50)
std::cout << "  Cowbell:     MIDI 56\n";
```

### 3. Improve Detection Algorithm

**Example Request:**
> "Filter out duplicate hits within 50ms window to reduce false positives"

**What to do:**
1. Add deduplication logic in `transcribeDrums()`
2. Add parameter for window size (optional)
3. Maintain chronological order
4. Update verbose output

**Code locations:**
```cpp
// In transcribeDrums() after initial detection (around line 130)

// Deduplicate hits within time window
juce::Array<DrumEvent> deduplicated;
const float minTimeDiff = 0.05f; // 50ms

for (const auto& drum : drums) {
    bool isDuplicate = false;
    
    for (const auto& existing : deduplicated) {
        if (existing.type == drum.type && 
            std::abs(existing.time - drum.time) < minTimeDiff) {
            isDuplicate = true;
            break;
        }
    }
    
    if (!isDuplicate) {
        deduplicated.add(drum);
    }
}

drums = deduplicated;

if (args.verbose) {
    std::cout << "After deduplication: " << drums.size() << " hits\n";
}
```

### 4. Add Output Format Options

**Example Request:**
> "Add CSV output format with columns: time, drum_type, velocity"

**What to do:**
1. Add format parameter to `CLIArgs`
2. Add CSV save function
3. Route output based on format
4. Update help text

**Code locations:**
```cpp
// 1. Add to struct
struct CLIArgs {
    juce::String outputFormat = "midi"; // "midi" or "csv"
};

// 2. Add parsing
else if ((arg == "-f" || arg == "--format") && i + 1 < argc) {
    args.outputFormat = argv[++i];
}

// 3. Create CSV function (after saveMidi())
void saveCSV(const juce::Array<DrumEvent>& drums, const CLIArgs& args) {
    juce::File outputFile(args.outputFile);
    juce::FileOutputStream stream(outputFile);
    
    if (!stream.openedOk()) {
        std::cerr << "Error: Cannot write CSV file\n";
        return;
    }
    
    stream << "time,drum_type,midi_note,velocity\n";
    
    for (const auto& drum : drums) {
        stream << drum.time << ","
               << static_cast<int>(drum.type) << ","
               << static_cast<int>(drum.type) << ","
               << (drum.velocity * 127.0) << "\n";
    }
}

// 4. Route output in main() (around line 210)
if (args.outputFormat == "csv") {
    saveCSV(drums, args);
} else {
    saveMidi(drums, args);
}
```

### 5. Add Real-Time MIDI Output

**Example Request:**
> "Add live MIDI output to virtual MIDI port for real-time monitoring"

**What to do:**
1. Add `--live-midi` flag
2. Use JUCE `MidiOutput` class
3. Send MIDI in real-time during transcription
4. List available MIDI devices

**Code locations:**
```cpp
// 1. Add to includes (top of file)
#include <juce_audio_devices/juce_audio_devices.h>

// 2. Add function to list MIDI devices
void listMidiDevices() {
    auto devices = juce::MidiOutput::getAvailableDevices();
    std::cout << "Available MIDI devices:\n";
    for (int i = 0; i < devices.size(); i++) {
        std::cout << "  " << i << ": " << devices[i].name << "\n";
    }
}

// 3. Add live output function
void sendLiveMidi(const juce::Array<DrumEvent>& drums, int deviceIndex) {
    auto devices = juce::MidiOutput::getAvailableDevices();
    if (deviceIndex >= devices.size()) {
        std::cerr << "Invalid MIDI device index\n";
        return;
    }
    
    auto midiOut = juce::MidiOutput::openDevice(devices[deviceIndex].identifier);
    if (!midiOut) {
        std::cerr << "Failed to open MIDI device\n";
        return;
    }
    
    auto startTime = juce::Time::getMillisecondCounterHiRes();
    
    for (const auto& drum : drums) {
        // Wait until drum time
        while ((juce::Time::getMillisecondCounterHiRes() - startTime) < drum.time * 1000.0) {
            juce::Thread::sleep(1);
        }
        
        // Send note on
        midiOut->sendMessageNow(
            juce::MidiMessage::noteOn(10, static_cast<int>(drum.type), 
                                     static_cast<juce::uint8>(drum.velocity * 127))
        );
        
        // Send note off after 50ms
        juce::Thread::sleep(50);
        midiOut->sendMessageNow(
            juce::MidiMessage::noteOff(10, static_cast<int>(drum.type))
        );
    }
}

// 4. Add to CMakeLists.txt
# In neuralnote_drums_cli target, add:
juce::juce_audio_devices
```

### 6. Performance Optimization

**Example Request:**
> "Reduce processing time for long audio files (>1 minute)"

**What to do:**
1. Process audio in chunks
2. Use multithreading for batch files
3. Add progress indicator
4. Profile with Instruments/perf

**Code locations:**
```cpp
// Add progress callback to BasicPitch
void transcribeDrums(const juce::AudioBuffer<float>& audio, const CLIArgs& args) {
    // ... existing setup
    
    if (args.verbose) {
        // Process in chunks with progress
        const int chunkSize = 22050 * 5; // 5-second chunks
        int totalChunks = (audio.getNumSamples() + chunkSize - 1) / chunkSize;
        
        for (int i = 0; i < totalChunks; i++) {
            int start = i * chunkSize;
            int size = std::min(chunkSize, audio.getNumSamples() - start);
            
            // Process chunk
            // ...
            
            std::cout << "Progress: " << ((i + 1) * 100 / totalChunks) << "%\r" << std::flush;
        }
        std::cout << "\n";
    }
}
```

---

## CMakeLists.txt Updates

### Add Compiler Optimization Flags

**Example Request:**
> "Enable aggressive optimizations for release builds"

```cmake
# In CMakeLists.txt, drums CLI section

if(CMAKE_BUILD_TYPE STREQUAL "Release")
    target_compile_options(neuralnote_drums_cli PRIVATE
        $<$<CXX_COMPILER_ID:GNU,Clang>:-O3 -march=native -flto>
        $<$<CXX_COMPILER_ID:MSVC>:/O2 /GL>
    )
    
    target_link_options(neuralnote_drums_cli PRIVATE
        $<$<CXX_COMPILER_ID:GNU,Clang>:-flto>
        $<$<CXX_COMPILER_ID:MSVC>:/LTCG>
    )
endif()
```

### Add New JUCE Module Dependency

**Example Request:**
> "Add JUCE graphics module for waveform visualization"

```cmake
target_link_libraries(neuralnote_drums_cli PRIVATE
    juce::juce_core
    juce::juce_audio_basics
    juce::juce_audio_formats
    juce::juce_events
    juce::juce_graphics  # NEW
    onnxruntime
    bin_data
    BasicPitchCNN
    RTNeural
)
```

### Add Conditional Features

**Example Request:**
> "Make MIDI playback optional (build flag)"

```cmake
option(ENABLE_MIDI_PLAYBACK "Enable real-time MIDI output" OFF)

if(ENABLE_MIDI_PLAYBACK)
    target_link_libraries(neuralnote_drums_cli PRIVATE
        juce::juce_audio_devices
    )
    target_compile_definitions(neuralnote_drums_cli PRIVATE
        MIDI_PLAYBACK_ENABLED=1
    )
endif()
```

---

## Node.js Wrapper Updates

### Sync with CLI Changes

**Example Request:**
> "Update wrapper to support new --velocity-scale parameter"

```javascript
// In drums-cli-wrapper.js

async convert(inputPath, outputPath, options = {}) {
  const {
    sensitivity = 0.15,
    threshold = 0.05,
    bpm = 120,
    velocityScale = 1.0,  // NEW
    verbose = false
  } = options;

  const args = [
    '-i', inputPath,
    '-o', outputPath,
    '-s', sensitivity.toString(),
    '-t', threshold.toString(),
    '--bpm', bpm.toString(),
    '--velocity-scale', velocityScale.toString()  // NEW
  ];
  
  // ... rest of function
}
```

---

## Testing Strategy

### After Making Changes

1. **Build Test:**
```bash
./build_drums.sh
# Verify: build/CLI/neuralnote_drums exists
```

2. **Basic Functionality:**
```bash
./build/CLI/neuralnote_drums -i test.wav -o test.mid -v
# Verify: test.mid created, no crashes
```

3. **New Feature Test:**
```bash
# Test new parameter
./build/CLI/neuralnote_drums -i test.wav -o test.mid --velocity-scale 1.5 -v
# Verify: velocities are scaled
```

4. **Wrapper Test:**
```bash
node drums-cli-wrapper.js -i test.wav -o test.mid --velocity-scale 1.5
# Verify: wrapper passes parameter correctly
```

5. **Edge Cases:**
```bash
# Empty file
./build/CLI/neuralnote_drums -i empty.wav -o out.mid

# Very long file
./build/CLI/neuralnote_drums -i long.wav -o out.mid

# Invalid parameters
./build/CLI/neuralnote_drums -i test.wav -o out.mid --velocity-scale 999
```

---

## Common Issues & Solutions

### Issue: CLI crashes on certain audio files
**Solution:** Add input validation and error handling
```cpp
if (audioBuffer.getNumSamples() == 0) {
    std::cerr << "Error: Audio file is empty or corrupt\n";
    return 1;
}

if (reader->sampleRate < 8000 || reader->sampleRate > 192000) {
    std::cerr << "Error: Unsupported sample rate: " << reader->sampleRate << "\n";
    return 1;
}
```

### Issue: MIDI file has no notes
**Solution:** Lower sensitivity, add debug output
```cpp
if (args.verbose) {
    std::cout << "Raw detections: " << noteEvents.size() << "\n";
    std::cout << "After filtering: " << drums.size() << "\n";
    
    if (drums.isEmpty()) {
        std::cout << "Try lowering sensitivity (-s 0.1) or threshold (-t 0.01)\n";
    }
}
```

### Issue: Build fails with linker errors
**Solution:** Check CMakeLists.txt dependencies
```cmake
# Ensure all JUCE modules are linked
target_link_libraries(neuralnote_drums_cli PRIVATE
    juce::juce_core
    juce::juce_audio_basics  # Required for AudioBuffer
    juce::juce_audio_formats # Required for AudioFormatManager
    juce::juce_events        # Required for MessageManager
    # ... add missing modules
)
```

---

## Optimization Guidelines

### Memory Efficiency
```cpp
// ✅ GOOD - Pre-allocate
juce::AudioBuffer<float> buffer;
buffer.setSize(1, expectedSize);

// ❌ BAD - Multiple allocations
for (auto& sample : samples) {
    buffer.setSample(0, i++, sample); // May reallocate
}
```

### CPU Efficiency
```cpp
// ✅ GOOD - Cache lookups
const auto& readPtr = buffer.getReadPointer(0);
for (int i = 0; i < buffer.getNumSamples(); i++) {
    process(readPtr[i]);
}

// ❌ BAD - Repeated function calls
for (int i = 0; i < buffer.getNumSamples(); i++) {
    process(buffer.getSample(0, i));
}
```

### Apple Silicon (M3 Pro) Specific
```cpp
// Use Accelerate framework for SIMD operations
#if JUCE_MAC
#include <Accelerate/Accelerate.h>

void fastMultiply(float* data, int size, float multiplier) {
    vDSP_vsmul(data, 1, &multiplier, data, 1, size);
}
#endif
```

---

## Documentation Updates

### After Adding Features

1. **Update help text** in `printUsage()`
2. **Update README.md** with new examples
3. **Update WRAPPER_GUIDE.md** if wrapper changes
4. **Add to CLI_USAGE_GUIDE.md** if significant

Example README update:
```markdown
## New Feature: Velocity Scaling

Adjust MIDI velocity output:

\`\`\`bash
# Boost all velocities by 50%
./neuralnote_drums -i soft.wav -o loud.mid --velocity-scale 1.5

# Reduce velocities by 50%
./neuralnote_drums -i loud.wav -o soft.mid --velocity-scale 0.5
\`\`\`
```

---

## Request Templates

### For Bug Fixes
```
Issue: [Describe the bug]
Reproduction: [Steps to reproduce]
Expected: [What should happen]
Actual: [What actually happens]
Files: [Attach problematic audio file if possible]
```

### For New Features
```
Feature: [Brief description]
Use case: [Why is this needed]
Proposed interface: [CLI flags, parameters]
Example usage: [Command line example]
```

### For Performance
```
Problem: [What's slow]
File: [Audio file specs - duration, sample rate]
Current: [Processing time]
Target: [Desired processing time]
Platform: [OS, CPU, memory]
```

---

## Safety Checklist

Before committing CLI changes:

- [ ] Code compiles without warnings
- [ ] Help text updated
- [ ] Works with various audio formats
- [ ] No memory leaks (valgrind/Instruments)
- [ ] Wrapper updated if API changed
- [ ] Example added to docs
- [ ] Backward compatible (or version bump)
- [ ] Tested on macOS (primary platform)

---

**When updating the CLI, make small, focused changes. Test thoroughly. Document clearly.**

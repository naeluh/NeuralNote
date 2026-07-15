/*
  NeuralNote Drums CLI - Beatboxing to MIDI Percussion
  Focused on drum kit mapping for vocal percussion
*/

#include <juce_core/juce_core.h>
#include <juce_audio_basics/juce_audio_basics.h>
#include <juce_audio_formats/juce_audio_formats.h>
#include <juce_events/juce_events.h>

#include <iostream>
#include <memory>
#include <map>

#include "Features.h"
#include "BasicPitch.h"
#include "Notes.h"

// GM Drum Map (Channel 10)
enum class DrumType {
    BassDrum = 36,      // Kick
    Snare = 38,         // Snare
    ClosedHiHat = 42,   // Closed hi-hat
    OpenHiHat = 46,     // Open hi-hat
    LowTom = 45,        // Low tom
    MidTom = 47,        // Mid tom
    HighTom = 50,       // High tom
    CrashCymbal = 49,   // Crash
    RideCymbal = 51     // Ride
};

struct DrumEvent {
    float time;
    DrumType type;
    float velocity;
};

struct CLIArgs {
    juce::String inputFile;
    juce::String outputFile;
    float sensitivity = 0.15f;  // Lower for percussive transients
    float minDuration = 20.0f;  // Shorter for fast rhythms
    float threshold = 0.05f;
    bool verbose = false;
    int bpm = 120;
};

void printUsage(const char* name) {
    std::cout << "NeuralNote Drums CLI - Beatboxing to MIDI Percussion\n\n";
    std::cout << "Usage: " << name << " -i <input> -o <output.mid> [options]\n\n";
    std::cout << "Options:\n";
    std::cout << "  -i, --input <file>      Input audio (.wav, .mp3)\n";
    std::cout << "  -o, --output <file>     Output MIDI file\n";
    std::cout << "  -s, --sensitivity <val> Detection sensitivity 0.0-1.0 (default: 0.15)\n";
    std::cout << "  -t, --threshold <val>   Amplitude threshold (default: 0.05)\n";
    std::cout << "  --bpm <value>           Tempo in BPM (default: 120)\n";
    std::cout << "  -v, --verbose           Verbose output\n";
    std::cout << "  -h, --help              Show this help\n\n";
    std::cout << "Drum Mapping (GM Standard):\n";
    std::cout << "  Kick:        MIDI 36 (Bass Drum)\n";
    std::cout << "  Snare:       MIDI 38\n";
    std::cout << "  Hi-hat (C):  MIDI 42\n";
    std::cout << "  Hi-hat (O):  MIDI 46\n";
    std::cout << "  Crash:       MIDI 49\n";
    std::cout << "  Ride:        MIDI 51\n";
    std::cout << "  Toms:        MIDI 45, 47, 50\n";
}

bool parseArgs(int argc, char* argv[], CLIArgs& args) {
    for (int i = 1; i < argc; i++) {
        juce::String arg = argv[i];
        if (arg == "-h" || arg == "--help") {
            printUsage(argv[0]);
            return false;
        } else if ((arg == "-i" || arg == "--input") && i + 1 < argc) {
            args.inputFile = argv[++i];
        } else if ((arg == "-o" || arg == "--output") && i + 1 < argc) {
            args.outputFile = argv[++i];
        } else if ((arg == "-s" || arg == "--sensitivity") && i + 1 < argc) {
            args.sensitivity = juce::String(argv[++i]).getFloatValue();
        } else if ((arg == "-t" || arg == "--threshold") && i + 1 < argc) {
            args.threshold = juce::String(argv[++i]).getFloatValue();
        } else if (arg == "--bpm" && i + 1 < argc) {
            args.bpm = juce::String(argv[++i]).getIntValue();
        } else if (arg == "-v" || arg == "--verbose") {
            args.verbose = true;
        }
    }
    return true;
}

DrumType mapPitchToDrum(int midiNote, float amplitude) {
    // Map MIDI note to nearest drum based on frequency ranges
    if (midiNote <= 42) return DrumType::BassDrum;      // Low: Kick
    if (midiNote <= 52) return DrumType::Snare;         // Mid-low: Snare
    if (midiNote <= 60) return DrumType::LowTom;        // Mid: Low tom
    if (midiNote <= 67) return DrumType::MidTom;        // Mid-high: Mid tom
    if (midiNote <= 74) {
        return amplitude > 0.6f ? DrumType::CrashCymbal : DrumType::ClosedHiHat;
    }
    if (midiNote <= 84) return DrumType::RideCymbal;    // High: Ride
    return DrumType::HighTom;                            // Very high: Hi tom
}

juce::Array<DrumEvent> transcribeDrums(const juce::AudioBuffer<float>& audio, const CLIArgs& args) {
    BasicPitch basicPitch;
    basicPitch.setNoteSensitivity(args.sensitivity);
    basicPitch.setSplitSensitivity(args.sensitivity * 1.5f);
    basicPitch.setMinNoteDuration(args.minDuration);
    basicPitch.setAmplitudeThreshold(args.threshold);

    auto noteEvents = basicPitch.transcribe(audio);
    
    if (args.verbose) {
        std::cout << "Detected " << noteEvents.size() << " percussion hits\n";
    }

    juce::Array<DrumEvent> drums;
    for (const auto& note : noteEvents) {
        if (note.amplitude < args.threshold) continue;
        
        DrumEvent drum;
        drum.time = note.startTime;
        drum.type = mapPitchToDrum(note.pitch, note.amplitude);
        drum.velocity = juce::jlimit(0.0f, 1.0f, note.amplitude);
        drums.add(drum);
    }

    // Sort by time
    drums.sort([](const DrumEvent& a, const DrumEvent& b) {
        return a.time < b.time;
    });

    return drums;
}

void saveMidi(const juce::Array<DrumEvent>& drums, const CLIArgs& args) {
    juce::MidiFile midiFile;
    juce::MidiMessageSequence track;
    
    // Tempo and time signature
    track.addEvent(juce::MidiMessage::timeSignatureMetaEvent(4, 4), 0);
    track.addEvent(juce::MidiMessage::tempoMetaEvent(60000000 / args.bpm), 0);
    
    // Add drum hits (Channel 10 = drums)
    const int drumChannel = 10;
    const int ticksPerQuarter = 480;
    
    for (const auto& drum : drums) {
        int tick = static_cast<int>(drum.time * ticksPerQuarter * (args.bpm / 60.0));
        int velocity = static_cast<int>(drum.velocity * 127.0);
        
        track.addEvent(
            juce::MidiMessage::noteOn(drumChannel, static_cast<int>(drum.type), 
                                     static_cast<juce::uint8>(velocity)),
            tick
        );
        // Short note off for drums
        track.addEvent(
            juce::MidiMessage::noteOff(drumChannel, static_cast<int>(drum.type)),
            tick + 10
        );
    }
    
    track.updateMatchedPairs();
    midiFile.addTrack(track);
    midiFile.setTicksPerQuarterNote(ticksPerQuarter);
    
    juce::File outputFile(args.outputFile);
    juce::FileOutputStream stream(outputFile);
    if (stream.openedOk()) {
        midiFile.writeTo(stream);
        if (args.verbose) {
            std::cout << "Saved " << drums.size() << " drum hits to: " 
                     << args.outputFile << "\n";
        }
    }
}

int main(int argc, char* argv[]) {
    CLIArgs args;
    if (!parseArgs(argc, argv, args) || args.inputFile.isEmpty() || args.outputFile.isEmpty()) {
        printUsage(argv[0]);
        return 1;
    }

    if (args.verbose) {
        std::cout << "Input: " << args.inputFile << "\n";
        std::cout << "Sensitivity: " << args.sensitivity << "\n";
        std::cout << "Threshold: " << args.threshold << "\n";
    }

    // Load audio
    juce::AudioFormatManager formatManager;
    formatManager.registerBasicFormats();
    
    juce::File inputFile(args.inputFile);
    if (!inputFile.exists()) {
        std::cerr << "Error: File not found: " << args.inputFile << "\n";
        return 1;
    }

    auto reader = std::unique_ptr<juce::AudioFormatReader>(
        formatManager.createReaderFor(inputFile)
    );
    if (!reader) {
        std::cerr << "Error: Cannot read audio file\n";
        return 1;
    }

    // Read audio buffer
    juce::AudioBuffer<float> audioBuffer(
        reader->numChannels, 
        static_cast<int>(reader->lengthInSamples)
    );
    reader->read(&audioBuffer, 0, static_cast<int>(reader->lengthInSamples), 0, true, true);

    // Transcribe
    auto drums = transcribeDrums(audioBuffer, args);
    
    if (drums.isEmpty()) {
        std::cout << "No drum hits detected\n";
        return 0;
    }

    // Save MIDI
    saveMidi(drums, args);
    
    if (args.verbose) {
        std::cout << "Complete!\n";
    }
    
    return 0;
}

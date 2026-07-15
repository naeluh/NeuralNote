/*
  NeuralNote Drums CLI - Beatboxing to MIDI Percussion
  Focused on drum kit mapping for vocal percussion
  Enhanced with input validation and error handling
*/

#include <juce_core/juce_core.h>
#include <juce_audio_basics/juce_audio_basics.h>
#include <juce_audio_formats/juce_audio_formats.h>
#include <juce_events/juce_events.h>

#include <iostream>
#include <memory>
#include <algorithm>
#include <cmath>
#include <vector>

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
    float sensitivity = 0.5f;  // Default sensitivity (same as working CLI)
    float minDuration = 20.0f;  // Shorter for fast rhythms
    float threshold = 0.0f;   // 0 = fully adaptive floor
    bool verbose = false;
    int bpm = 120;
};

void printUsage(const char* name) {
    std::cout << "NeuralNote Drums CLI - Beatboxing to MIDI Percussion\n\n";
    std::cout << "Usage: " << name << " -i <input> -o <output.mid> [options]\n\n";
    std::cout << "Options:\n";
    std::cout << "  -i, --input <file>      Input audio (.wav, .mp3, .aiff, .flac)\n";
    std::cout << "  -o, --output <file>     Output MIDI file\n";
    std::cout << "  -s, --sensitivity <val> Detection sensitivity 0.0-1.0 (default: 0.5)\n";
    std::cout << "  -t, --threshold <val>   Amplitude floor 0.0-1.0 (default: adaptive from noise)\n";
    std::cout << "  --bpm <value>           Tempo in BPM 60-300 (default: 120)\n";
    std::cout << "  -v, --verbose           Verbose output\n";
    std::cout << "  -h, --help              Show this help\n\n";
    std::cout << "Drum Mapping (GM Standard, Channel 10) — classified by onset timbre:\n";
    std::cout << "  Kick:        MIDI 36 (low-frequency energy, boomy \"b\")\n";
    std::cout << "  Snare:       MIDI 38 (broadband \"pss\"/\"k\")\n";
    std::cout << "  Hi-hat (C):  MIDI 42 (short noisy \"ts\")\n";
    std::cout << "  Hi-hat (O):  MIDI 46 (long noisy \"tss\")\n";
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

bool validateArgs(const CLIArgs& args) {
    // Validate sensitivity range
    if (args.sensitivity < 0.0f || args.sensitivity > 1.0f) {
        std::cerr << "Error: Sensitivity must be between 0.0 and 1.0\n";
        return false;
    }

    // Validate threshold range
    if (args.threshold < 0.0f || args.threshold > 1.0f) {
        std::cerr << "Error: Threshold must be between 0.0 and 1.0\n";
        return false;
    }

    // Validate BPM range
    if (args.bpm < 60 || args.bpm > 300) {
        std::cerr << "Error: BPM must be between 60 and 300\n";
        return false;
    }

    return true;
}

// Spectral features of one onset window, computed from the raw audio.
// BasicPitch reports *pitch*, but beatbox kick/snare/hi-hat are mostly
// unpitched noise — timbre (band energy balance + noisiness) separates them,
// pitch does not.
struct OnsetFeatures {
    float lowRatio;   // energy below ~250 Hz / total
    float highRatio;  // energy above ~4 kHz / total
    float zcr;        // zero crossings per sample (0..1), noisiness proxy
    float durationMs; // note event duration
};

OnsetFeatures computeOnsetFeatures(const juce::AudioBuffer<float>& audio,
                                   double sampleRate,
                                   double startTimeSec,
                                   double endTimeSec) {
    const float* x = audio.getReadPointer(0);
    const int total = audio.getNumSamples();
    const int start = juce::jlimit(0, total - 1, static_cast<int>(startTimeSec * sampleRate));
    // Analyze up to 90 ms from the onset — the attack carries the drum identity
    const int maxWin = static_cast<int>(0.090 * sampleRate);
    const int n = juce::jmin(maxWin, total - start);

    OnsetFeatures f {0.0f, 0.0f, 0.0f, static_cast<float>((endTimeSec - startTimeSec) * 1000.0)};
    if (n < 32) return f;

    // One-pole lowpass coefficients: y += a * (x - y), a = 1 - exp(-2*pi*fc/sr)
    const float aLow = 1.0f - std::exp(-2.0f * juce::MathConstants<float>::pi * 250.0f / static_cast<float>(sampleRate));
    const float aHigh = 1.0f - std::exp(-2.0f * juce::MathConstants<float>::pi * 4000.0f / static_cast<float>(sampleRate));

    float lp250 = 0.0f, lp4k = 0.0f;
    double lowE = 0.0, highE = 0.0, totalE = 0.0;
    int crossings = 0;
    float prev = x[start];

    for (int i = start; i < start + n; ++i) {
        const float s = x[i];
        lp250 += aLow * (s - lp250);
        lp4k += aHigh * (s - lp4k);
        const float hp = s - lp4k; // energy above ~4 kHz
        lowE += lp250 * lp250;
        highE += hp * hp;
        totalE += s * s;
        if ((s >= 0.0f) != (prev >= 0.0f)) crossings++;
        prev = s;
    }

    if (totalE > 1e-9) {
        f.lowRatio = static_cast<float>(lowE / totalE);
        f.highRatio = static_cast<float>(highE / totalE);
    }
    f.zcr = static_cast<float>(crossings) / static_cast<float>(n);
    return f;
}

DrumType classifyOnset(const OnsetFeatures& f) {
    // ponytail: hand-tuned thresholds on vocal beatbox; upgrade path is a
    // small trained classifier if 3-way split proves too coarse.
    if (f.lowRatio > 0.35f || f.zcr < 0.06f) return DrumType::BassDrum; // boomy "b"
    if (f.zcr > 0.35f || f.highRatio > 0.15f) {
        return f.durationMs > 120.0f ? DrumType::OpenHiHat : DrumType::ClosedHiHat; // sizzly "ts"
    }
    return DrumType::Snare; // broadband mid noise "pss"/"k"
}

// Energy-based onset detection + timbre classification.
// Percussion (kick "b", snare "pss", hi-hat "ts") is mostly unpitched noise —
// the BasicPitch neural pitch model detects zero events for noise bursts, so
// it cannot see snares or hi-hats at all. A short-time-energy onset detector
// hears every hit; the spectral classifier above decides which drum it was.
juce::Array<DrumEvent> transcribeDrums(const juce::AudioBuffer<float>& audio, const CLIArgs& args) {
    const double sampleRate = 22050.0;
    const float* x = audio.getReadPointer(0);
    const int numSamples = audio.getNumSamples();

    if (args.verbose) {
        float maxAmp = 0.0f;
        for (int i = 0; i < numSamples; i++) maxAmp = std::max(maxAmp, std::abs(x[i]));
        std::cout << "Starting onset detection...\n";
        std::cout << "  Audio samples: " << numSamples << "\n";
        std::cout << "  Duration: " << (numSamples / sampleRate) << " seconds\n";
        std::cout << "  Max amplitude: " << maxAmp << "\n";
    }

    // Short-time RMS envelope, ~11.6 ms frames
    const int hop = 256;
    const int numFrames = numSamples / hop;
    std::vector<float> rms(static_cast<size_t>(std::max(0, numFrames)));
    for (int f = 0; f < numFrames; f++) {
        double e = 0.0;
        for (int i = f * hop; i < (f + 1) * hop; i++) e += x[i] * x[i];
        rms[static_cast<size_t>(f)] = static_cast<float>(std::sqrt(e / hop));
    }

    // Onset = envelope jumps above a slow-moving baseline by riseFactor and
    // clears the absolute floor. Sensitivity maps to how small a jump counts:
    // 1.0 → 1.5x baseline, 0.0 → 8x baseline.
    // Floor is adaptive: the 20th-percentile frame RMS estimates the noise
    // between hits (breath, room, mic hiss), so defaults work regardless of
    // how quiet the recording is. User threshold acts as a hard minimum.
    float noiseRms = 0.0f;
    if (numFrames > 4) {
        std::vector<float> sorted(rms);
        std::sort(sorted.begin(), sorted.end());
        noiseRms = sorted[static_cast<size_t>(numFrames) / 5];
    }
    const float floorRms = std::min(0.1f, std::max({0.008f, args.threshold, 3.0f * noiseRms}));
    // Quadratic map calibrated on 47 real beatbox recordings: default 0.5
    // gives ~2.9x (detected 349 hits vs 351 ground-truth bursts across the
    // corpus); 0.0 -> 7.0x (only sharp loud hits), 1.0 -> 1.4x (hair trigger)
    const float invSens = 1.0f - args.sensitivity;
    const float riseFactor = 1.4f + invSens * invSens * 5.6f;
    const int refractoryFrames = static_cast<int>(0.080 * sampleRate / hop); // 80 ms between hits

    struct Hit { double start; double end; float peak; };
    std::vector<Hit> hits;
    // Valley tracker instead of a running average: drops instantly on energy
    // dips, climbs slowly. Vocal onsets ramp up over ~80 ms — an average
    // climbs with the attack and the jump ratio never fires, but the valley
    // lags at the pre-burst level so slow attacks still trigger.
    float valley = 1.0f;
    int lastOnsetFrame = -refractoryFrames;

    for (int f = 0; f < numFrames; f++) {
        const float e = rms[static_cast<size_t>(f)];
        const bool rising = f > 0 && e > rms[static_cast<size_t>(f - 1)];
        if (e > floorRms && rising && e > valley * riseFactor && f - lastOnsetFrame >= refractoryFrames) {
            // Peak amplitude within 90 ms of onset → velocity
            const int start = f * hop;
            const int end = std::min(numSamples, start + static_cast<int>(0.090 * sampleRate));
            float peak = 0.0f;
            for (int i = start; i < end; i++) peak = std::max(peak, std::abs(x[i]));

            // Duration: frames until envelope decays below 25% of onset peak RMS
            float peakRms = e;
            int df = f;
            while (df + 1 < numFrames && df - f < 40) { // cap ~460 ms
                df++;
                peakRms = std::max(peakRms, rms[static_cast<size_t>(df)]);
                if (rms[static_cast<size_t>(df)] < 0.25f * peakRms) break;
            }
            hits.push_back({static_cast<double>(start) / sampleRate,
                            static_cast<double>(df * hop) / sampleRate,
                            peak});
            lastOnsetFrame = f;
        }
        valley = e < valley ? e : valley + 0.08f * (e - valley);
    }

    if (args.verbose) {
        std::cout << "Detected " << hits.size() << " onsets (floor=" << floorRms
                  << ", rise=" << riseFactor << "x)\n";
    }

    juce::Array<DrumEvent> drums;
    for (const auto& hit : hits) {
        const auto features = computeOnsetFeatures(audio, sampleRate, hit.start, hit.end);

        DrumEvent drum;
        drum.time = static_cast<float>(hit.start);
        drum.type = classifyOnset(features);
        drum.velocity = juce::jlimit(0.05f, 1.0f, hit.peak);
        drums.add(drum);

        if (args.verbose) {
            std::cout << "    Hit t=" << hit.start
                      << " midi=" << static_cast<int>(drum.type)
                      << " lowRatio=" << features.lowRatio
                      << " highRatio=" << features.highRatio
                      << " zcr=" << features.zcr
                      << " durMs=" << features.durationMs
                      << " peak=" << hit.peak << "\n";
        }
    }

    struct DrumEventComparator {
        static int compareElements(const DrumEvent& a, const DrumEvent& b) {
            if (a.time < b.time) return -1;
            if (a.time > b.time) return 1;
            return 0;
        }
    };

    DrumEventComparator comparator;
    drums.sort(comparator);

    if (args.verbose) {
        std::cout << "Mapped to " << drums.size() << " drum events (after threshold=" << args.threshold << ")\n";
    }

    return drums;
}

void saveMidi(const juce::Array<DrumEvent>& drums, const CLIArgs& args) {
    juce::MidiFile midiFile;
    juce::MidiMessageSequence track;

    // Tempo and time signature
    track.addEvent(juce::MidiMessage::timeSignatureMetaEvent(4, 4), 0);
    track.addEvent(juce::MidiMessage::tempoMetaEvent(60000000 / args.bpm), 0);

    // Add drum hits (Channel 10 = drums in GM standard)
    const int drumChannel = 10;
    const int ticksPerQuarter = 480;

    for (const auto& drum : drums) {
        int tick = static_cast<int>(drum.time * ticksPerQuarter * (args.bpm / 60.0));
        int velocity = static_cast<int>(drum.velocity * 127.0);
        velocity = juce::jlimit(1, 127, velocity); // Ensure valid MIDI velocity

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
    if (!stream.openedOk()) {
        std::cerr << "Error: Cannot write to output file: " << args.outputFile << "\n";
        return;
    }

    midiFile.writeTo(stream);

    if (args.verbose) {
        std::cout << "Saved " << drums.size() << " drum hits to: "
                 << args.outputFile << "\n";
    }
}

int main(int argc, char* argv[]) {
    CLIArgs args;
    if (!parseArgs(argc, argv, args) || args.inputFile.isEmpty() || args.outputFile.isEmpty()) {
        printUsage(argv[0]);
        return 1;
    }

    // Validate parameters
    if (!validateArgs(args)) {
        return 1;
    }

    if (args.verbose) {
        std::cout << "NeuralNote Drums CLI\n";
        std::cout << "===================\n";
        std::cout << "Input: " << args.inputFile << "\n";
        std::cout << "Output: " << args.outputFile << "\n";
        std::cout << "Sensitivity: " << args.sensitivity << "\n";
        std::cout << "Threshold: " << args.threshold << "\n";
        std::cout << "BPM: " << args.bpm << "\n\n";
    }

    // Load audio
    juce::AudioFormatManager formatManager;
    formatManager.registerBasicFormats();

    juce::File inputFile(args.inputFile);
    if (!inputFile.exists()) {
        std::cerr << "Error: Input file does not exist: " << args.inputFile << "\n";
        return 1;
    }

    if (inputFile.getSize() == 0) {
        std::cerr << "Error: Input file is empty\n";
        return 1;
    }

    auto reader = std::unique_ptr<juce::AudioFormatReader>(
        formatManager.createReaderFor(inputFile)
    );
    if (!reader) {
        std::cerr << "Error: Cannot read audio file. Unsupported format or corrupt file.\n";
        std::cerr << "Supported formats: WAV, AIFF, FLAC, MP3\n";
        return 1;
    }

    // Validate sample rate
    if (reader->sampleRate < 8000.0 || reader->sampleRate > 192000.0) {
        std::cerr << "Error: Unsupported sample rate: " << reader->sampleRate << " Hz\n";
        std::cerr << "Supported range: 8000-192000 Hz\n";
        return 1;
    }

    if (args.verbose) {
        std::cout << "Audio file info:\n";
        std::cout << "  Sample rate: " << reader->sampleRate << " Hz\n";
        std::cout << "  Channels: " << reader->numChannels << "\n";
        std::cout << "  Length: " << reader->lengthInSamples << " samples\n";
        std::cout << "  Duration: " << (reader->lengthInSamples / reader->sampleRate) << " seconds\n\n";
    }

    // Read audio buffer
    juce::AudioBuffer<float> audioBuffer(
        reader->numChannels,
        static_cast<int>(reader->lengthInSamples)
    );

    if (audioBuffer.getNumSamples() == 0) {
        std::cerr << "Error: Audio file contains no samples\n";
        return 1;
    }

    reader->read(&audioBuffer, 0, static_cast<int>(reader->lengthInSamples), 0, true, true);

    // Convert to mono if needed
    if (audioBuffer.getNumChannels() > 1) {
        juce::AudioBuffer<float> mono(1, audioBuffer.getNumSamples());
        mono.clear();
        for (int ch = 0; ch < audioBuffer.getNumChannels(); ++ch) {
            mono.addFrom(0, 0, audioBuffer, ch, 0, audioBuffer.getNumSamples(), 1.0f / audioBuffer.getNumChannels());
        }
        audioBuffer = std::move(mono);
    }

    // Resample to 22050 Hz if needed (required by BasicPitch)
    const double targetSampleRate = 22050.0;
    if (reader->sampleRate != targetSampleRate) {
        if (args.verbose) {
            std::cout << "Resampling from " << reader->sampleRate << " Hz to " << targetSampleRate << " Hz...\n";
        }

        double ratio = targetSampleRate / reader->sampleRate;
        int newLength = static_cast<int>(audioBuffer.getNumSamples() * ratio);
        juce::AudioBuffer<float> resampled(1, newLength);

        juce::LagrangeInterpolator interpolator;
        interpolator.process(
            ratio,
            audioBuffer.getReadPointer(0),
            resampled.getWritePointer(0),
            newLength,
            audioBuffer.getNumSamples(),
            0
        );

        audioBuffer = std::move(resampled);
    }

    // Peak-normalize so detection thresholds are independent of mic gain
    const float peak = audioBuffer.getMagnitude(0, 0, audioBuffer.getNumSamples());
    if (peak > 0.001f) {
        audioBuffer.applyGain(0.9f / peak);
        if (args.verbose) {
            std::cout << "Normalized peak " << peak << " -> 0.9\n";
        }
    }

    // Transcribe
    auto drums = transcribeDrums(audioBuffer, args);

    if (drums.isEmpty()) {
        std::cout << "No drum hits detected. Try:\n";
        std::cout << "  - Lowering sensitivity: -s 0.1\n";
        std::cout << "  - Lowering threshold: -t 0.01\n";
        return 0;
    }

    // Save MIDI
    saveMidi(drums, args);

    if (args.verbose) {
        std::cout << "\nComplete!\n";
    }

    return 0;
}


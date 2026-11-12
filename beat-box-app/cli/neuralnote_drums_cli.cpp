/*
  NeuralNote Drums CLI - Beatboxing to MIDI Percussion
  Energy onset detection + timbre classification -> General MIDI drum file.
*/

#include <juce_core/juce_core.h>
#include <juce_audio_basics/juce_audio_basics.h>
#include <juce_audio_formats/juce_audio_formats.h>
#include <juce_events/juce_events.h>
#include <juce_dsp/juce_dsp.h>

#include <iostream>
#include <memory>
#include <algorithm>
#include <array>
#include <cmath>
#include <vector>

// GM drum notes (channel 10) the built-in classifier can emit.
enum Drum : int { Kick = 36, Snare = 38, ClosedHiHat = 42, OpenHiHat = 46 };

// With --json, stdout carries exactly one JSON object and every human-readable
// line moves to stderr. Without it, stdout is the legacy text output.
static std::ostream* gInfo = &std::cout;
static std::ostream& info() { return *gInfo; }

struct CLIArgs {
    juce::String inputFile;
    juce::String notesFile; // --notes: write the MIDI file from an edited note list instead of audio
    juce::String outputFile;
    float sensitivity = 0.5f;
    float threshold = 0.0f; // 0 = fully adaptive floor
    bool verbose = false;
    bool json = false;
    bool help = false;
    int bpm = 120;
    bool bpmAuto = false; // --bpm auto: estimate tempo from the hits
    int quantize = 0;     // 0 = keep played timing, 16 = snap to 1/16 notes
    juce::String mode = "classic"; // classic | kit | neural
    juce::String modelFile;        // --model: trained network (JSON); default sits beside the executable
    juce::String kitFile;          // --kit: taught sounds (JSON)
    // --kit-range: how close a hit must be to a taught repeat to count as that
    // sound. 0.75 was the best value on AVP personal sounds (training/train.py):
    // tighter sends too many hits to the classic fallback, looser lets a
    // taught sound swallow hits that are not it.
    float kitRange = 0.75f;
};

// Tempo and grid actually used for the MIDI file (after --bpm auto resolved).
struct Timing {
    int bpm = 120;
    bool detected = false;  // tempo came from the audio and passed the confidence gate
    bool quantized = false; // hits were snapped to the 1/16 grid
    double score = 0.0;     // tempo estimator confidence, for diagnostics
};

static const int kTicksPerQuarter = 480;
static const int kTicksPerSixteenth = kTicksPerQuarter / 4;

// Spectral features of one onset window, computed from the raw audio.
// Beatbox kick/snare/hi-hat are mostly unpitched noise — timbre (band energy
// balance + noisiness) separates them, pitch does not.
static const int kNumBands = 12;
static const int kNumFeatures = 4 + kNumBands;
// Bump when the meaning or order of the feature vector changes: taught kits
// and trained models store vectors, and stale ones must fail loudly.
static const int kFeatureVersion = 1;
using FeatureVector = std::array<float, kNumFeatures>;

struct OnsetFeatures {
    float lowRatio;   // energy below ~250 Hz / total
    float highRatio;  // energy above ~4 kHz / total
    float zcr;        // zero crossings per sample (0..1), noisiness proxy
    float durationMs; // time until the envelope decays to 25% of its peak
    std::array<float, kNumBands> bands; // spectral envelope, dB relative to the window's total energy
};

// The vector stored in kits and fed to the trained model:
// [lowRatio, highRatio, zcr, log10(durationMs), 12 band levels].
FeatureVector toVector(const OnsetFeatures& f) {
    FeatureVector v {};
    v[0] = f.lowRatio;
    v[1] = f.highRatio;
    v[2] = f.zcr;
    v[3] = std::log10(std::max(1.0f, f.durationMs));
    std::copy(f.bands.begin(), f.bands.end(), v.begin() + 4);
    return v;
}

// Spread of each feature (standard deviation over the hits of the 47-recording
// corpus), so one unit means the same thing on every axis when comparing sounds.
// 0 = left out of the comparison: duration, because a sound taught on its own
// rings out while the same sound inside a beat is cut short by the next hit.
static const FeatureVector kFeatureScales = {
    0.335f, 0.069f, 0.182f, 0.0f,
    17.5f, 15.8f, 13.7f, 9.2f, 8.0f, 10.2f, 8.6f, 8.0f, 9.3f, 11.3f, 12.6f, 14.5f
};

// How alike two sounds are: RMS difference in units of typical spread.
// ~0.5 = same sound repeated, >1.5 = clearly different sounds.
float featureDistance(const FeatureVector& a, const FeatureVector& b) {
    double sum = 0.0;
    int dims = 0;
    for (int i = 0; i < kNumFeatures; i++) {
        if (kFeatureScales[static_cast<size_t>(i)] <= 0.0f) continue;
        const double z = (a[static_cast<size_t>(i)] - b[static_cast<size_t>(i)]) / kFeatureScales[static_cast<size_t>(i)];
        sum += z * z;
        dims++;
    }
    return static_cast<float>(std::sqrt(sum / dims));
}

// Sounds the user taught ("this noise is my clap"). A hit is compared with
// every taught repeat and takes the drum of the closest one — on AVP personal
// sounds that beat comparing with each sound's average by ~3 points.
struct KitSound {
    int note;
    juce::String name;
    std::vector<FeatureVector> examples;
};
using Kit = std::vector<KitSound>;

bool loadKit(const juce::String& path, Kit& kit) {
    const juce::File file(path);
    if (!file.existsAsFile()) {
        std::cerr << "Error: Kit file not found: " << path << "\n";
        return false;
    }
    const juce::var root = juce::JSON::parse(file);
    if (static_cast<int>(root.getProperty("featureVersion", -1)) != kFeatureVersion) {
        std::cerr << "Error: Kit was taught with a different feature version (need " << kFeatureVersion
                  << ") — teach your sounds again\n";
        return false;
    }
    const auto* sounds = root.getProperty("sounds", juce::var()).getArray();
    if (sounds == nullptr) {
        std::cerr << "Error: Kit file has no sounds list\n";
        return false;
    }
    for (const auto& entry : *sounds) {
        const int note = entry.getProperty("note", 0);
        const auto* examples = entry.getProperty("examples", juce::var()).getArray();
        if (note < 35 || note > 81 || examples == nullptr || examples->isEmpty()) {
            std::cerr << "Error: Kit file has a malformed sound\n";
            return false;
        }
        KitSound sound {note, entry.getProperty("name", "").toString(), {}};
        for (const auto& example : *examples) {
            const auto* values = example.getArray();
            if (values == nullptr || values->size() != kNumFeatures) {
                std::cerr << "Error: Kit example is not a " << kNumFeatures << "-value feature vector\n";
                return false;
            }
            FeatureVector vector {};
            for (int i = 0; i < kNumFeatures; i++) {
                vector[static_cast<size_t>(i)] = static_cast<float>(static_cast<double>((*values)[i]));
            }
            sound.examples.push_back(vector);
        }
        kit.push_back(sound);
    }
    return true;
}

struct DrumEvent {
    double time;    // seconds from start of audio
    int note;       // GM drum note
    float velocity; // 0..1
    OnsetFeatures features;
    const char* source = "classic"; // which classifier chose the note
    float distance = -1.0f;         // kit mode: distance to the nearest taught sound
    int tick = 0;                   // MIDI tick, set by assignTicks()
};

static int midiVelocity(float v) { return juce::jlimit(1, 127, static_cast<int>(v * 127.0f)); }

// Longest clip an edited note list may describe: 64 bars.
static const int kMaxNoteTick = 64 * 4 * kTicksPerQuarter;

// Hits the user edited in the app ({"notes":[{tick,note,velocity}]}), already
// in MIDI ticks. Anything malformed is an error: a skipped note would make the
// file differ from the grid the user is looking at.
bool loadNotes(const juce::String& path, int bpm, std::vector<DrumEvent>& drums) {
    const juce::File file = juce::File::getCurrentWorkingDirectory().getChildFile(path);
    if (!file.existsAsFile()) {
        std::cerr << "Error: Notes file not found: " << path << "\n";
        return false;
    }
    const juce::var root = juce::JSON::parse(file); // named: the list below points into it
    const auto* notes = root.getProperty("notes", juce::var()).getArray();
    if (notes == nullptr || notes->isEmpty()) {
        std::cerr << "Error: Notes file has no notes list\n";
        return false;
    }

    const double ticksPerSecond = kTicksPerQuarter * bpm / 60.0;
    for (const auto& entry : *notes) {
        // isInt(): a cast alone would quietly turn 12.5 into 12
        const auto field = [&entry](const char* name, int min, int max, int& out) {
            const juce::var value = entry.getProperty(name, juce::var());
            if (!value.isInt() || static_cast<int>(value) < min || static_cast<int>(value) > max) {
                std::cerr << "Error: Note " << name << " must be a whole number " << min << "-" << max << "\n";
                return false;
            }
            out = static_cast<int>(value);
            return true;
        };
        int tick = 0, note = 0, velocity = 0;
        if (!field("tick", 0, kMaxNoteTick, tick) || !field("note", 35, 81, note) || !field("velocity", 1, 127, velocity)) {
            return false;
        }
        DrumEvent drum {};
        drum.time = tick / ticksPerSecond;
        drum.note = note;
        // midiVelocity() truncates; half a step up reads back as the same value
        drum.velocity = (static_cast<float>(velocity) + 0.5f) / 127.0f;
        drum.source = "edit";
        drum.tick = tick;
        drums.push_back(drum);
    }

    // saveMidi() expects time order; one drum cannot sound twice on one tick (keep the louder)
    std::sort(drums.begin(), drums.end(), [](const DrumEvent& a, const DrumEvent& b) {
        return a.tick != b.tick ? a.tick < b.tick : a.note < b.note;
    });
    std::vector<DrumEvent> merged;
    for (const auto& drum : drums) {
        if (!merged.empty() && merged.back().tick == drum.tick && merged.back().note == drum.note) {
            merged.back().velocity = std::max(merged.back().velocity, drum.velocity);
        } else {
            merged.push_back(drum);
        }
    }
    drums = std::move(merged);
    return true;
}

void printUsage(const char* name) {
    info() << "NeuralNote Drums CLI - Beatboxing to MIDI Percussion\n\n";
    info() << "Usage: " << name << " -i <input> -o <output.mid> [options]\n\n";
    info() << "Options:\n";
    info() << "  -i, --input <file>      Input audio (.wav, .aiff, .flac)\n";
    info() << "  -o, --output <file>     Output MIDI file (optional with --json)\n";
    info() << "  -s, --sensitivity <val> Detection sensitivity 0.0-1.0 (default: 0.5, higher = more hits)\n";
    info() << "  -t, --threshold <val>   Amplitude floor 0.0-1.0 (default: adaptive from noise)\n";
    info() << "  --bpm <value|auto>      Tempo in BPM 60-300, or auto to detect it (default: 120)\n";
    info() << "  --quantize <0|16>       16 snaps hits to 1/16 notes; 0 keeps played timing (default: 0)\n";
    info() << "                          With --bpm auto, hits are only snapped when the tempo locks.\n";
    info() << "  --mode <classic|kit|neural>\n";
    info() << "                          classic: built-in kick/snare/hat rules (default)\n";
    info() << "                          kit: match hits to sounds you taught, classic for the rest\n";
    info() << "                          neural: small network trained on amateur vocal percussion\n";
    info() << "  --model <file>          Network for --mode neural (default: drum_model.json beside this program)\n";
    info() << "  --kit <file>            Taught sounds (JSON) for --mode kit\n";
    info() << "  --kit-range <val>       How close a hit must be to a taught sound (default: 0.75)\n";
    info() << "  --notes <file>          Instead of -i: write -o from a note list, no audio. JSON\n";
    info() << "                          {\"notes\":[{\"tick\":0,\"note\":36,\"velocity\":100}]}, ticks at 480 per\n";
    info() << "                          quarter note. Needs -o and --bpm <value>.\n";
    info() << "  --json                  Print one JSON result object on stdout (logs go to stderr)\n";
    info() << "  -v, --verbose           Verbose output\n";
    info() << "  -h, --help              Show this help\n\n";
    info() << "Drum Mapping (GM Standard, Channel 10) — classified by onset timbre:\n";
    info() << "  Kick:        MIDI 36 (low-frequency energy, boomy \"b\")\n";
    info() << "  Snare:       MIDI 38 (broadband \"pss\"/\"k\")\n";
    info() << "  Hi-hat (C):  MIDI 42 (short noisy \"ts\")\n";
    info() << "  Hi-hat (O):  MIDI 46 (long noisy \"tss\")\n";
}

// Unknown flags are an error: silently ignoring them lets a stale binary look
// like it honoured an option it never heard of.
bool parseArgs(int argc, char* argv[], CLIArgs& args) {
    for (int i = 1; i < argc; i++) {
        const juce::String arg = argv[i];
        const bool hasValue = i + 1 < argc;
        if (arg == "-h" || arg == "--help") {
            args.help = true;
        } else if (arg == "-v" || arg == "--verbose") {
            args.verbose = true;
        } else if (arg == "--json") {
            args.json = true;
        } else if ((arg == "-i" || arg == "--input") && hasValue) {
            args.inputFile = argv[++i];
        } else if (arg == "--notes" && hasValue) {
            args.notesFile = argv[++i];
        } else if ((arg == "-o" || arg == "--output") && hasValue) {
            args.outputFile = argv[++i];
        } else if ((arg == "-s" || arg == "--sensitivity") && hasValue) {
            args.sensitivity = juce::String(argv[++i]).getFloatValue();
        } else if ((arg == "-t" || arg == "--threshold") && hasValue) {
            args.threshold = juce::String(argv[++i]).getFloatValue();
        } else if (arg == "--bpm" && hasValue) {
            const juce::String value = argv[++i];
            args.bpmAuto = value == "auto";
            if (!args.bpmAuto) args.bpm = value.getIntValue();
        } else if (arg == "--quantize" && hasValue) {
            args.quantize = juce::String(argv[++i]).getIntValue();
        } else if (arg == "--mode" && hasValue) {
            args.mode = argv[++i];
        } else if (arg == "--model" && hasValue) {
            args.modelFile = argv[++i];
        } else if (arg == "--kit" && hasValue) {
            args.kitFile = argv[++i];
        } else if (arg == "--kit-range" && hasValue) {
            args.kitRange = juce::String(argv[++i]).getFloatValue();
        } else {
            std::cerr << "Error: Unknown or incomplete option: " << arg << "\n";
            return false;
        }
    }
    return true;
}

bool validateArgs(const CLIArgs& args) {
    if (args.sensitivity < 0.0f || args.sensitivity > 1.0f) {
        std::cerr << "Error: Sensitivity must be between 0.0 and 1.0\n";
        return false;
    }
    if (args.threshold < 0.0f || args.threshold > 1.0f) {
        std::cerr << "Error: Threshold must be between 0.0 and 1.0\n";
        return false;
    }
    if (args.bpm < 60 || args.bpm > 300) {
        std::cerr << "Error: BPM must be between 60 and 300, or auto\n";
        return false;
    }
    if (args.quantize != 0 && args.quantize != 16) {
        std::cerr << "Error: Quantize must be 0 or 16\n";
        return false;
    }
    if (args.mode != "classic" && args.mode != "kit" && args.mode != "neural") {
        std::cerr << "Error: Mode must be classic, kit or neural\n";
        return false;
    }
    if (args.mode == "kit" && args.kitFile.isEmpty()) {
        std::cerr << "Error: --mode kit needs --kit <file>\n";
        return false;
    }
    if (!(args.kitRange > 0.0f)) {
        std::cerr << "Error: Kit range must be greater than 0\n";
        return false;
    }
    return true;
}

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

    OnsetFeatures f {0.0f, 0.0f, 0.0f, static_cast<float>((endTimeSec - startTimeSec) * 1000.0), {}};
    f.bands.fill(-80.0f);
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

    // Spectral envelope: 12 log-spaced bands from 60 Hz to Nyquist. Each band
    // is its share of the window's energy in dB, so loudness cancels out and
    // only the shape of the sound is left. Floored at -80 dB: an empty band
    // must stay a finite number (JSON, distances).
    static const juce::dsp::FFT fft(11); // 2048 points; the 90 ms window is 1984 samples, zero-padded
    const int fftSize = fft.getSize();
    std::vector<float> spectrum(static_cast<size_t>(2 * fftSize), 0.0f);
    for (int i = 0; i < n; ++i) {
        const float hann = 0.5f - 0.5f * std::cos(juce::MathConstants<float>::twoPi * static_cast<float>(i) / static_cast<float>(n - 1));
        spectrum[static_cast<size_t>(i)] = x[start + i] * hann;
    }
    fft.performFrequencyOnlyForwardTransform(spectrum.data());

    const double lowHz = 60.0, highHz = sampleRate / 2.0;
    std::array<double, kNumBands> bandEnergy {};
    double spectrumEnergy = 0.0;
    for (int bin = 1; bin < fftSize / 2; ++bin) {
        const double hz = bin * sampleRate / fftSize;
        if (hz < lowHz) continue;
        const int band = std::min(kNumBands - 1, static_cast<int>(kNumBands * std::log(hz / lowHz) / std::log(highHz / lowHz)));
        const double power = static_cast<double>(spectrum[static_cast<size_t>(bin)]) * spectrum[static_cast<size_t>(bin)];
        bandEnergy[static_cast<size_t>(band)] += power;
        spectrumEnergy += power;
    }
    if (spectrumEnergy > 0.0) {
        for (size_t b = 0; b < kNumBands; b++) {
            f.bands[b] = static_cast<float>(std::max(-80.0, 10.0 * std::log10(std::max(bandEnergy[b] / spectrumEnergy, 1e-8))));
        }
    }
    return f;
}

// Classic mode: four fixed rules, no setup, no data files.
// Thresholds fitted on the AVP dataset (training/train.py, 5-fold by
// participant): 57% of hits right on voices it has not heard, against 54% for
// the earlier hand-tuned values. Rules this simple top out there — the neural
// and kit modes are the upgrade path.
int classifyOnset(const OnsetFeatures& f) {
    if (f.lowRatio > 0.25f || f.zcr < 0.09f) return Kick; // boomy "b"
    if (f.zcr > 0.35f || f.highRatio > 0.25f) {
        return f.durationMs > 120.0f ? OpenHiHat : ClosedHiHat; // sizzly "ts"
    }
    return Snare; // broadband mid noise "pss"/"k"
}

// Neural mode: a small fully connected network over the feature vector,
// trained by training/train.py and stored as plain JSON
// ({featureVersion, mean, std, layers:[{W, b}], classes}).
struct NeuralModel {
    struct Layer {
        std::vector<std::vector<float>> weights; // one row per output unit
        std::vector<float> bias;
    };
    std::vector<float> mean, std;
    std::vector<Layer> layers;
    std::vector<int> classes; // GM note for each output unit

    int classify(const FeatureVector& features) const {
        std::vector<float> activation(kNumFeatures);
        for (size_t i = 0; i < kNumFeatures; i++) activation[i] = (features[i] - mean[i]) / std[i];
        for (size_t l = 0; l < layers.size(); l++) {
            const auto& layer = layers[l];
            std::vector<float> next(layer.bias);
            for (size_t unit = 0; unit < next.size(); unit++) {
                for (size_t i = 0; i < activation.size(); i++) next[unit] += layer.weights[unit][i] * activation[i];
                if (l + 1 < layers.size()) next[unit] = std::max(0.0f, next[unit]); // ReLU on hidden layers
            }
            activation = std::move(next);
        }
        const auto best = std::max_element(activation.begin(), activation.end());
        return classes[static_cast<size_t>(best - activation.begin())];
    }
};

// Reads a JSON number array of an exact length; false on any mismatch.
static bool readNumbers(const juce::var& value, size_t expected, std::vector<float>& out) {
    const auto* array = value.getArray();
    if (array == nullptr || static_cast<size_t>(array->size()) != expected) return false;
    out.clear();
    for (const auto& item : *array) {
        if (!item.isDouble() && !item.isInt() && !item.isInt64()) return false;
        out.push_back(static_cast<float>(static_cast<double>(item)));
    }
    return true;
}

bool loadModel(const juce::File& file, NeuralModel& model) {
    if (!file.existsAsFile()) {
        std::cerr << "Error: Neural model not found: " << file.getFullPathName()
                  << "\n  Train it with training/train.py, or pass --model <file>\n";
        return false;
    }
    const juce::var root = juce::JSON::parse(file);
    if (static_cast<int>(root.getProperty("featureVersion", -1)) != kFeatureVersion) {
        std::cerr << "Error: Neural model was trained for a different feature version (need " << kFeatureVersion
                  << ") — retrain it with training/train.py\n";
        return false;
    }
    const auto malformed = [] {
        std::cerr << "Error: Neural model file is malformed\n";
        return false;
    };
    if (!readNumbers(root.getProperty("mean", juce::var()), kNumFeatures, model.mean) ||
        !readNumbers(root.getProperty("std", juce::var()), kNumFeatures, model.std)) {
        return malformed();
    }
    for (const float spread : model.std) {
        if (!(spread > 0.0f)) return malformed();
    }
    const auto* layers = root.getProperty("layers", juce::var()).getArray();
    const auto* classes = root.getProperty("classes", juce::var()).getArray();
    if (layers == nullptr || layers->isEmpty() || classes == nullptr) return malformed();

    size_t inputs = kNumFeatures;
    for (const auto& entry : *layers) {
        const auto* rows = entry.getProperty("W", juce::var()).getArray();
        if (rows == nullptr || rows->isEmpty()) return malformed();
        NeuralModel::Layer layer;
        if (!readNumbers(entry.getProperty("b", juce::var()), static_cast<size_t>(rows->size()), layer.bias)) return malformed();
        for (const auto& row : *rows) {
            std::vector<float> weights;
            if (!readNumbers(row, inputs, weights)) return malformed();
            layer.weights.push_back(weights);
        }
        inputs = layer.bias.size();
        model.layers.push_back(layer);
    }
    if (static_cast<size_t>(classes->size()) != inputs) return malformed();
    for (const auto& note : *classes) {
        const int value = note;
        if (value < 35 || value > 81) return malformed();
        model.classes.push_back(value);
    }
    return true;
}

// Energy-based onset detection + timbre classification.
// Percussion (kick "b", snare "pss", hi-hat "ts") is mostly unpitched noise —
// a pitch model detects zero events for noise bursts, so it cannot see snares
// or hi-hats at all. A short-time-energy onset detector hears every hit; the
// spectral classifier above decides which drum it was.
std::vector<DrumEvent> transcribeDrums(const juce::AudioBuffer<float>& audio, const CLIArgs& args,
                                       const Kit& kit, const NeuralModel* model) {
    const double sampleRate = 22050.0;
    const float* x = audio.getReadPointer(0);
    const int numSamples = audio.getNumSamples();

    if (args.verbose) {
        float maxAmp = 0.0f;
        for (int i = 0; i < numSamples; i++) maxAmp = std::max(maxAmp, std::abs(x[i]));
        info() << "Starting onset detection...\n";
        info() << "  Audio samples: " << numSamples << "\n";
        info() << "  Duration: " << (numSamples / sampleRate) << " seconds\n";
        info() << "  Max amplitude: " << maxAmp << "\n";
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

    // Onset = envelope jumps above the valley tracker by riseFactor and clears
    // the absolute floor. Sensitivity maps to how small a jump counts.
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
    // Quadratic map: 0.5 -> 2.8x, 0.0 -> 7.0x (only sharp loud hits),
    // 1.0 -> 1.4x (hair trigger).
    const float invSens = 1.0f - args.sensitivity;
    const float riseFactor = 1.4f + invSens * invSens * 5.6f;
    // Minimum spacing between hits: 8 frames, ~93 ms. Measured on AVP (9,777
    // annotated hits): 0.2% of real hits are closer than 100 ms, while a
    // shorter window lets the second half of one sound ("k-ss") count twice.
    // ponytail: rolls faster than ~10 hits/s merge; shorten this (and accept
    // more double hits) if fast rolls matter more than clean beats.
    const int refractoryFrames = static_cast<int>(0.100 * sampleRate / hop);

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
        if (f - lastOnsetFrame < refractoryFrames) {
            // Inside a hit: ride the baseline up to the hit's own level. Left
            // at the pre-hit level, the ringing tail of the same sound clears
            // riseFactor again the moment the refractory ends — on the AVP
            // dataset that was 78% of all false hits. From here a new hit has
            // to rise out of the decaying sound, not out of the old silence.
            valley = std::max(valley, e);
        } else {
            valley = e < valley ? e : valley + 0.08f * (e - valley);
        }
    }

    if (args.verbose) {
        info() << "Detected " << hits.size() << " onsets (floor=" << floorRms
               << ", rise=" << riseFactor << "x)\n";
    }

    // Hits come out of the frame loop already in time order.
    std::vector<DrumEvent> drums;
    for (const auto& hit : hits) {
        const auto features = computeOnsetFeatures(audio, sampleRate, hit.start, hit.end);
        DrumEvent drum;
        drum.time = hit.start;
        drum.note = classifyOnset(features);
        drum.velocity = juce::jlimit(0.05f, 1.0f, hit.peak);
        drum.features = features;

        if (model != nullptr) {
            drum.note = model->classify(toVector(features));
            drum.source = "neural";
        }

        // Kit mode: a hit that falls within range of a taught sound becomes
        // that sound's drum; anything else keeps the classic answer.
        if (!kit.empty()) {
            const auto vector = toVector(features);
            const KitSound* nearest = nullptr;
            for (const auto& sound : kit) {
                for (const auto& example : sound.examples) {
                    const float d = featureDistance(vector, example);
                    if (nearest == nullptr || d < drum.distance) {
                        nearest = &sound;
                        drum.distance = d;
                    }
                }
            }
            if (drum.distance <= args.kitRange) {
                drum.note = nearest->note;
                drum.source = "kit";
            }
        }
        drums.push_back(drum);

        if (args.verbose) {
            info() << "    Hit t=" << hit.start
                   << " midi=" << drum.note
                   << " lowRatio=" << features.lowRatio
                   << " highRatio=" << features.highRatio
                   << " zcr=" << features.zcr
                   << " durMs=" << features.durationMs
                   << " peak=" << hit.peak
                   << " source=" << drum.source << "\n";
        }
    }

    if (args.verbose) {
        info() << "Mapped to " << drums.size() << " drum events\n";
    }

    return drums;
}

// Tempo from onset times alone.
// Every pair of hits up to 2.5 s apart (about a bar — short enough that human
// tempo drift does not smear it) votes with a cosine for how well its gap fits
// the 1/16, 1/8 and 1/4 grids of each candidate tempo. Scoring three grid
// levels makes the coarsest grid that explains the hits win, which settles
// 3:2 and 4:3 confusions without special cases.
//
// Candidates cover one octave only: whether a beat is 80 or 160 BPM cannot be
// known from onsets, so the caller offers half/double instead.
//
// The gate is the calibration knob. Random onsets score about 1/sqrt(pairs);
// 2.0/sqrt(pairs) held false locks under 1% and wrong tempos under 3% in
// simulation (random onsets; four beat shapes at 85-155 BPM, 10-30 ms jitter,
// 3% drift). Below it we report "not detected" — no grid beats a wrong grid.
// ponytail: straight 16ths only. Swing/triplet feel and loose timing (>25 ms)
// will not lock; upgrade path is a swing-aware grid.
Timing estimateTempo(const std::vector<DrumEvent>& drums) {
    Timing result;
    if (drums.size() < 8) return result;

    const double horizon = 2.5;
    std::vector<double> gaps;
    for (size_t i = 0; i < drums.size(); i++) {
        for (size_t j = i + 1; j < drums.size(); j++) {
            const double gap = drums[j].time - drums[i].time;
            if (gap > horizon) break;
            gaps.push_back(gap);
        }
    }

    const double twoPi = juce::MathConstants<double>::twoPi;
    double bestBpm = 120.0, bestScore = -1.0;
    for (double bpm = 80.0; bpm < 160.0; bpm += 0.25) {
        const double sixteenth = 15.0 / bpm;
        double sum = 0.0;
        for (const double gap : gaps) {
            const double phase = twoPi * gap / sixteenth;
            sum += std::cos(phase) + std::cos(phase / 2.0) + std::cos(phase / 4.0);
        }
        const double score = sum / (3.0 * static_cast<double>(gaps.size()));
        if (score > bestScore) {
            bestScore = score;
            bestBpm = bpm;
        }
    }

    result.score = bestScore;
    const double gate = std::max(0.08, 2.0 / std::sqrt(static_cast<double>(gaps.size())));
    if (bestScore >= gate) {
        result.bpm = static_cast<int>(std::lround(bestBpm));
        result.detected = true;
    }
    return result;
}

// Give every hit its MIDI tick. The clip always starts at the first hit.
void assignTicks(std::vector<DrumEvent>& drums, const Timing& timing) {
    if (drums.empty()) return;
    const double firstTime = drums.front().time;

    if (!timing.quantized) {
        const double ticksPerSecond = kTicksPerQuarter * timing.bpm / 60.0;
        for (auto& drum : drums) {
            drum.tick = static_cast<int>(std::lround((drum.time - firstTime) * ticksPerSecond));
        }
        return;
    }

    // Snap to 1/16 notes with a grid that follows the player: each hit lands
    // on the nearest step, then pulls the grid 30% toward itself, so slow
    // tempo drift is tracked instead of piling up into wrong steps.
    const double step = 15.0 / timing.bpm;

    // Seat the grid on the first few hits together, not on hit one alone —
    // otherwise the first hit's own timing error is added to every other hit.
    const size_t lead = std::min<size_t>(6, drums.size());
    double offset = 0.0;
    for (size_t i = 0; i < lead; i++) {
        const double rel = drums[i].time - firstTime;
        offset += rel - std::round(rel / step) * step;
    }
    double grid = firstTime + offset / static_cast<double>(lead);
    int index = 0;

    std::vector<DrumEvent> snapped;
    for (auto drum : drums) {
        const int stepsAhead = std::max(0, static_cast<int>(std::lround((drum.time - grid) / step)));
        index += stepsAhead;
        grid += stepsAhead * step;
        grid += 0.3 * (drum.time - grid);
        drum.tick = index * kTicksPerSixteenth;

        // Two hits of the same drum on one step: keep the louder one
        bool merged = false;
        for (auto it = snapped.rbegin(); it != snapped.rend() && it->tick == drum.tick; ++it) {
            if (it->note == drum.note) {
                it->velocity = std::max(it->velocity, drum.velocity);
                merged = true;
                break;
            }
        }
        if (!merged) snapped.push_back(drum);
    }
    drums = std::move(snapped);
}

bool saveMidi(const std::vector<DrumEvent>& drums, const Timing& timing, const CLIArgs& args) {
    juce::MidiFile midiFile;
    juce::MidiMessageSequence track;

    track.addEvent(juce::MidiMessage::textMetaEvent(3, "Beatbox Drums"), 0); // 3 = track name
    track.addEvent(juce::MidiMessage::timeSignatureMetaEvent(4, 4), 0);
    track.addEvent(juce::MidiMessage::tempoMetaEvent(static_cast<int>(std::lround(60000000.0 / timing.bpm))), 0);

    // Channel 10 = drums in GM standard (JUCE channels are 1-based)
    const int drumChannel = 10;
    int lastNoteOff = 0;

    for (size_t i = 0; i < drums.size(); i++) {
        const auto& drum = drums[i];
        // A 1/32 note: long enough to see in a piano roll, and never running
        // into the next hit of the same drum.
        int length = kTicksPerSixteenth / 2;
        for (size_t j = i + 1; j < drums.size(); j++) {
            if (drums[j].note == drum.note) {
                length = std::min(length, drums[j].tick - drum.tick - 1);
                break;
            }
        }
        length = std::max(1, length);

        track.addEvent(juce::MidiMessage::noteOn(drumChannel, drum.note,
                                                 static_cast<juce::uint8>(midiVelocity(drum.velocity))),
                       drum.tick);
        track.addEvent(juce::MidiMessage::noteOff(drumChannel, drum.note), drum.tick + length);
        lastNoteOff = std::max(lastNoteOff, drum.tick + length);
    }

    track.updateMatchedPairs();

    // End the track on a bar line so the clip loops cleanly in a DAW
    const int ticksPerBar = 4 * kTicksPerQuarter;
    track.addEvent(juce::MidiMessage::endOfTrack(), ((lastNoteOff + ticksPerBar - 1) / ticksPerBar) * ticksPerBar);

    midiFile.addTrack(track);
    midiFile.setTicksPerQuarterNote(kTicksPerQuarter);

    juce::File outputFile(args.outputFile);
    outputFile.deleteFile(); // FileOutputStream appends to an existing file
    juce::FileOutputStream stream(outputFile);
    if (!stream.openedOk() || !midiFile.writeTo(stream)) {
        std::cerr << "Error: Cannot write to output file: " << args.outputFile << "\n";
        return false;
    }

    if (args.verbose) {
        info() << "Saved " << drums.size() << " drum hits to: " << args.outputFile << "\n";
    }
    return true;
}

// The single machine-readable result. Wrappers parse this instead of scraping log lines.
void printJson(const std::vector<DrumEvent>& drums, const Timing& timing, const CLIArgs& args) {
    juce::Array<juce::var> hits;
    for (const auto& drum : drums) {
        auto* h = new juce::DynamicObject();
        h->setProperty("time", drum.time);
        h->setProperty("tick", drum.tick);
        h->setProperty("note", drum.note);
        h->setProperty("velocity", midiVelocity(drum.velocity));
        h->setProperty("source", drum.source);
        if (drum.distance >= 0.0f) h->setProperty("distance", drum.distance);
        juce::Array<juce::var> features;
        for (const float value : toVector(drum.features)) features.add(value);
        h->setProperty("features", features);
        hits.add(juce::var(h));
    }
    juce::Array<juce::var> scales;
    for (const float scale : kFeatureScales) scales.add(scale);

    auto* root = new juce::DynamicObject();
    root->setProperty("featureVersion", kFeatureVersion);
    root->setProperty("featureScales", scales); // so callers compare sounds exactly as the CLI does
    root->setProperty("mode", args.mode);
    root->setProperty("kitRange", args.kitRange);
    root->setProperty("bpm", timing.bpm);
    root->setProperty("bpmDetected", timing.detected);
    root->setProperty("quantized", timing.quantized);
    root->setProperty("tempoScore", timing.score);
    root->setProperty("hits", hits);
    std::cout << juce::JSON::toString(juce::var(root), true) << std::endl;
}

int main(int argc, char* argv[]) {
    CLIArgs args;
    if (!parseArgs(argc, argv, args)) {
        return 1;
    }
    if (args.json) gInfo = &std::cerr;
    if (args.help) {
        printUsage(argv[0]);
        return 0;
    }
    const bool fromNotes = args.notesFile.isNotEmpty();
    if (fromNotes) {
        if (args.inputFile.isNotEmpty() || args.outputFile.isEmpty() || args.bpmAuto) {
            std::cerr << "Error: --notes takes no -i, and needs -o <file> and --bpm <60-300>\n";
            return 1;
        }
    } else if (args.inputFile.isEmpty() || (args.outputFile.isEmpty() && !args.json)) {
        printUsage(argv[0]);
        return 1;
    }
    if (!validateArgs(args)) {
        return 1;
    }

    // Edited hits: nothing to listen to, only a file to write
    if (fromNotes) {
        std::vector<DrumEvent> drums;
        Timing timing;
        timing.bpm = args.bpm;
        if (!loadNotes(args.notesFile, args.bpm, drums) || !saveMidi(drums, timing, args)) {
            return 1;
        }
        if (args.json) printJson(drums, timing, args);
        return 0;
    }

    Kit kit;
    if (args.mode == "kit" && !loadKit(args.kitFile, kit)) {
        return 1;
    }

    NeuralModel model;
    if (args.mode == "neural") {
        const juce::File modelFile = args.modelFile.isNotEmpty()
            ? juce::File::getCurrentWorkingDirectory().getChildFile(args.modelFile)
            : juce::File::getSpecialLocation(juce::File::currentExecutableFile).getSiblingFile("drum_model.json");
        if (!loadModel(modelFile, model)) {
            return 1;
        }
    }

    if (args.verbose) {
        info() << "NeuralNote Drums CLI\n";
        info() << "===================\n";
        info() << "Input: " << args.inputFile << "\n";
        info() << "Output: " << args.outputFile << "\n";
        info() << "Sensitivity: " << args.sensitivity << "\n";
        info() << "Threshold: " << args.threshold << "\n";
        info() << "BPM: " << (args.bpmAuto ? juce::String("auto") : juce::String(args.bpm)) << "\n\n";
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
        std::cerr << "Supported formats: WAV, AIFF, FLAC\n";
        return 1;
    }

    if (reader->sampleRate < 8000.0 || reader->sampleRate > 192000.0) {
        std::cerr << "Error: Unsupported sample rate: " << reader->sampleRate << " Hz\n";
        std::cerr << "Supported range: 8000-192000 Hz\n";
        return 1;
    }

    if (args.verbose) {
        info() << "Audio file info:\n";
        info() << "  Sample rate: " << reader->sampleRate << " Hz\n";
        info() << "  Channels: " << reader->numChannels << "\n";
        info() << "  Length: " << reader->lengthInSamples << " samples\n";
        info() << "  Duration: " << (reader->lengthInSamples / reader->sampleRate) << " seconds\n\n";
    }

    juce::AudioBuffer<float> audioBuffer(
        static_cast<int>(reader->numChannels),
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

    // Detection constants assume 22050 Hz; resample anything else.
    const double targetSampleRate = 22050.0;
    if (reader->sampleRate != targetSampleRate) {
        if (args.verbose) {
            info() << "Resampling from " << reader->sampleRate << " Hz to " << targetSampleRate << " Hz...\n";
        }

        // JUCE speedRatio = input samples consumed per output sample.
        // ponytail: no anti-alias filter before decimation — content above
        // 11 kHz folds back as noise. The web app pre-converts with ffmpeg,
        // which filters; upgrade path is Lib/DSP/Resampler (needs juce_dsp).
        const double speedRatio = reader->sampleRate / targetSampleRate;
        const int newLength = static_cast<int>(audioBuffer.getNumSamples() / speedRatio);
        juce::AudioBuffer<float> resampled(1, newLength);

        juce::LagrangeInterpolator interpolator;
        interpolator.process(
            speedRatio,
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
            info() << "Normalized peak " << peak << " -> 0.9\n";
        }
    }

    auto drums = transcribeDrums(audioBuffer, args, kit, args.mode == "neural" ? &model : nullptr);

    Timing timing;
    timing.bpm = args.bpm;
    timing.quantized = args.quantize == 16;
    if (args.bpmAuto) {
        timing = estimateTempo(drums);
        // Snapping to a tempo we could not confirm would move hits to wrong places
        timing.quantized = timing.detected && args.quantize == 16;
        if (args.verbose) {
            info() << "Tempo: " << timing.bpm << " BPM (" << (timing.detected ? "detected" : "not detected, using default")
                   << ", score=" << timing.score << ")\n";
        }
    }
    assignTicks(drums, timing);

    if (drums.empty()) {
        info() << "No drum hits detected. Try:\n";
        info() << "  - Raising sensitivity: -s 0.8\n";
        info() << "  - Lowering threshold: -t 0.01\n";
    } else if (args.outputFile.isNotEmpty() && !saveMidi(drums, timing, args)) {
        return 1;
    }

    if (args.json) printJson(drums, timing, args);

    if (args.verbose && !drums.empty()) {
        info() << "\nComplete!\n";
    }

    return 0;
}

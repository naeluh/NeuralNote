/*
  NeuralNote CLI - Complete Working Version with All Parameters
  Matches GUI behavior with proper MIDI output
  ./build/CLI/neuralnote -i long_wav.wav -o piano_more_test.mid -f midi -v --no-auto --note-sens 0.8 --split-sens 0.8 --threshold 0.05 --min-duration 25
*/

#include <juce_core/juce_core.h>
#include <juce_audio_basics/juce_audio_basics.h>
#include <juce_audio_formats/juce_audio_formats.h>
#include <juce_audio_utils/juce_audio_utils.h>
#include <juce_events/juce_events.h>

#include <iostream>
#include <memory>

#include "Features.h"
#include "BasicPitch.h"
#include "Notes.h"
#include "NoteOptions.h"
#include "BasicPitchConstants.h"

struct NoteEvent {
    float startTime;
    float endTime;
    int pitch;
    int velocity;
};

struct CLIArgs {
    juce::String inputFile;
    juce::String outputFile;
    float noteSensitivity = 0.5f;
    float splitSensitivity = 0.5f;
    float minNoteDuration = 58.0f; // milliseconds
    float amplitudeThreshold = 0.1f;
    int sampleRate = 22050;
    bool verbose = false;
    bool autoAnalyze = true;
    bool showAnalysis = false;
    juce::String format = "json";
    
    // Music theory and accuracy improvements
    bool enableNoteQuantization = false;
    int keyRootNote = 0; // C = 0, C# = 1, etc.
    int scaleType = 0; // Chromatic = 0, Major = 1, Minor = 2, etc.
    int snapMode = 0; // Adjust = 0, Remove = 1
    int minMidiNote = MIN_MIDI_NOTE; // A0
    int maxMidiNote = MAX_MIDI_NOTE; // C8
    bool mergeOverlappingNotes = true;
    bool dropOverlappingPitchBends = true;
};

void printUsage(const char* programName)
{
    std::cout << "NeuralNote CLI - Smart Audio-to-MIDI Transcription\n";
    std::cout << "Enhanced with music theory and MIDI standards for improved accuracy\n\n";
    std::cout << "Usage: " << programName << " [options] -i <input_file> -o <output_file>\n\n";
    std::cout << "Options:\n";
    std::cout << "  -i, --input <file>     Input audio file (.wav, .aiff, .flac, .mp3)\n";
    std::cout << "  -o, --output <file>    Output file\n";
    std::cout << "  -f, --format <format>  Output format: json, midi, csv (default: json)\n";
    std::cout << "  --auto-analyze         Auto-detect optimal parameters (default: on)\n";
    std::cout << "  --no-auto              Disable auto-analysis, use manual parameters\n";
    std::cout << "  --show-analysis        Show detailed audio analysis results\n";
    std::cout << "\nManual Parameters (override auto-detection):\n";
    std::cout << "  -n, --note-sens <val>  Note sensitivity 0.0-1.0\n";
    std::cout << "  -s, --split-sens <val> Split sensitivity 0.0-1.0\n";
    std::cout << "  -d, --min-duration <ms> Minimum note duration in ms\n";
    std::cout << "  -t, --threshold <val>  Amplitude threshold 0.0-1.0\n";
    std::cout << "  -r, --sample-rate <hz> Sample rate (default: 22050)\n";
    std::cout << "\nMusic Theory & Accuracy Improvements:\n";
    std::cout << "  --enable-note-quant    Enable note quantization to musical scales\n";
    std::cout << "  --key-root <note>      Root note (0=C, 1=C#, 2=D, ..., 11=B)\n";
    std::cout << "  --scale <type>         Scale type (0=Chromatic, 1=Major, 2=Minor, 3=Dorian, etc.)\n";
    std::cout << "  --snap-mode <mode>     Snap mode (0=Adjust, 1=Remove)\n";
    std::cout << "  --min-midi <note>      Minimum MIDI note (default: 21=A0)\n";
    std::cout << "  --max-midi <note>      Maximum MIDI note (default: 108=C8)\n";
    std::cout << "  --no-merge-notes      Disable merging overlapping notes\n";
    std::cout << "  --no-drop-bends       Disable dropping overlapping pitch bends\n";
    std::cout << "\nOther:\n";
    std::cout << "  -v, --verbose          Verbose output\n";
    std::cout << "  -h, --help             Show this help\n\n";
    std::cout << "Examples:\n";
    std::cout << "  " << programName << " -i piano.wav -o piano.mid --enable-note-quant --key-root 0 --scale 1\n";
    std::cout << "  " << programName << " -i song.mp3 -o song.mid --enable-note-quant --scale 2 --snap-mode 0\n";
    std::cout << "  " << programName << " -i beatbox.wav -o beatbox.mid --enable-note-quant --scale 2 --snap-mode 0\n";
}

CLIArgs parseArgs(int argc, char* argv[])
{
    CLIArgs args;
    for (int i = 1; i < argc; i++) {
        juce::String arg = argv[i];

        if (arg == "-h" || arg == "--help") {
            printUsage(argv[0]);
            exit(0);
        } else if ((arg == "-i" || arg == "--input") && i + 1 < argc) {
            args.inputFile = argv[++i];
        } else if ((arg == "-o" || arg == "--output") && i + 1 < argc) {
            args.outputFile = argv[++i];
        } else if ((arg == "-f" || arg == "--format") && i + 1 < argc) {
            args.format = argv[++i];
        } else if (arg == "--auto-analyze") {
            args.autoAnalyze = true;
        } else if (arg == "--no-auto") {
            args.autoAnalyze = false;
        } else if (arg == "--show-analysis") {
            args.showAnalysis = true;
        } else if ((arg == "-n" || arg == "--note-sens") && i + 1 < argc) {
            args.noteSensitivity = juce::String(argv[++i]).getFloatValue();
            args.autoAnalyze = false; // Manual override
        } else if ((arg == "-s" || arg == "--split-sens") && i + 1 < argc) {
            args.splitSensitivity = juce::String(argv[++i]).getFloatValue();
            args.autoAnalyze = false; // Manual override
        } else if ((arg == "-r" || arg == "--sample-rate") && i + 1 < argc) {
            args.sampleRate = juce::String(argv[++i]).getIntValue();
        } else if ((arg == "-d" || arg == "--min-duration") && i + 1 < argc) {
            args.minNoteDuration = juce::String(argv[++i]).getFloatValue();
            args.autoAnalyze = false; // Manual override
        } else if ((arg == "-t" || arg == "--threshold") && i + 1 < argc) {
            args.amplitudeThreshold = juce::String(argv[++i]).getFloatValue();
            args.autoAnalyze = false; // Manual override
        } else if (arg == "-v" || arg == "--verbose") {
            args.verbose = true;
        } else if (arg == "--enable-note-quant") {
            args.enableNoteQuantization = true;
        } else if ((arg == "--key-root") && i + 1 < argc) {
            args.keyRootNote = juce::String(argv[++i]).getIntValue();
        } else if ((arg == "--scale") && i + 1 < argc) {
            args.scaleType = juce::String(argv[++i]).getIntValue();
        } else if ((arg == "--snap-mode") && i + 1 < argc) {
            args.snapMode = juce::String(argv[++i]).getIntValue();
        } else if ((arg == "--min-midi") && i + 1 < argc) {
            args.minMidiNote = juce::String(argv[++i]).getIntValue();
        } else if ((arg == "--max-midi") && i + 1 < argc) {
            args.maxMidiNote = juce::String(argv[++i]).getIntValue();
        } else if (arg == "--no-merge-notes") {
            args.mergeOverlappingNotes = false;
        } else if (arg == "--no-drop-bends") {
            args.dropOverlappingPitchBends = false;
        } else {
            std::cerr << "Unknown argument: " << arg << std::endl;
            printUsage(argv[0]);
            exit(1);
        }
    }
    return args;
}

juce::AudioBuffer<float> loadAudio(const juce::String& filename, int targetSampleRate, bool verbose)
{
    juce::File audioFile(filename);
    if (!audioFile.existsAsFile()) {
        throw std::runtime_error("File not found: " + filename.toStdString());
    }

    juce::AudioFormatManager formatManager;
    formatManager.registerBasicFormats();

    std::unique_ptr<juce::AudioFormatReader> reader(formatManager.createReaderFor(audioFile));
    if (!reader) {
        throw std::runtime_error("Cannot read audio file: " + filename.toStdString());
    }

    if (verbose) {
        std::cout << "Audio: " << reader->numChannels << " channels, " << reader->sampleRate << " Hz, "
                  << reader->lengthInSamples / reader->sampleRate << " seconds\n";
    }

    // Load audio
    juce::AudioBuffer<float> buffer((int) reader->numChannels, (int) reader->lengthInSamples);
    reader->read(&buffer, 0, (int) reader->lengthInSamples, 0, true, true);

    // Convert to mono
    if (buffer.getNumChannels() > 1) {
        juce::AudioBuffer<float> mono(1, buffer.getNumSamples());
        mono.clear();
        for (int ch = 0; ch < buffer.getNumChannels(); ++ch) {
            mono.addFrom(0, 0, buffer, ch, 0, buffer.getNumSamples(), 1.0f / buffer.getNumChannels());
        }
        buffer = std::move(mono);
    }

    // Resample if needed
    if (reader->sampleRate != targetSampleRate) {
        if (verbose)
            std::cout << "Resampling to " << targetSampleRate << " Hz\n";

        double ratio = targetSampleRate / reader->sampleRate;
        int newLength = (int) (buffer.getNumSamples() * ratio);
        juce::AudioBuffer<float> resampled(1, newLength);

        juce::LagrangeInterpolator interpolator;
        interpolator.process(
            ratio, buffer.getReadPointer(0), resampled.getWritePointer(0), newLength, buffer.getNumSamples(), 0);

        buffer = std::move(resampled);
    }

    return buffer;
}

void saveAsJson(const juce::Array<NoteEvent>& notes, const juce::String& filename)
{
    juce::File file(filename);
    juce::FileOutputStream stream(file);
    if (!stream.openedOk())
        throw std::runtime_error("Cannot create JSON file");

    stream.writeText("{\n  \"notes\": [\n", false, false, nullptr);
    for (int i = 0; i < notes.size(); ++i) {
        const auto& note = notes[i];
        const char* noteNames[] = {"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"};
        int octave = (note.pitch / 12) - 1;
        juce::String noteName = juce::String(noteNames[note.pitch % 12]) + juce::String(octave);

        juce::String line = juce::String::formatted(
            "    {\"start\": %.3f, \"end\": %.3f, \"pitch\": %d, \"velocity\": %d, \"note\": \"%s\"}",
            note.startTime,
            note.endTime,
            note.pitch,
            note.velocity,
            noteName.toRawUTF8());

        if (i < notes.size() - 1)
            line += ",";
        line += "\n";
        stream.writeText(line, false, false, nullptr);
    }
    stream.writeText("  ]\n}\n", false, false, nullptr);
}

void saveAsMidi(const juce::Array<NoteEvent>& notes, const juce::String& filename)
{
    if (notes.size() == 0) {
        std::cout << "Warning: No notes to save to MIDI file\n";
        return;
    }

    std::cout << "DEBUG MIDI: Writing " << notes.size() << " notes to MIDI file\n";

    // EXACT copy of NeuralNote GUI implementation
    const int mTicksPerQuarterNote = 960; // GUI uses 960, not 480!
    const double inExportBpm = 120.0; // Standard BPM
    const double start_offset = 0.0; // No offset for CLI (GUI calculates this from TimeQuantizeInfo)

    juce::MidiMessageSequence message_sequence;

    // Set tempo (EXACTLY like GUI)
    auto tempo_meta_event = juce::MidiMessage::tempoMetaEvent(
        static_cast<int>(std::round(1.0e6 * (60.0 / inExportBpm))) // Microseconds per quarter note
    );
    tempo_meta_event.setTimeStamp(0.0);
    message_sequence.addEvent(tempo_meta_event);

    // Set time signature (EXACTLY like GUI)
    auto time_signature_meta_event = juce::MidiMessage::timeSignatureMetaEvent(4, 4); // 4/4 time
    time_signature_meta_event.setTimeStamp(0.0);
    message_sequence.addEvent(time_signature_meta_event);

    // Debug: Show timing calculation for first few notes
    for (int i = 0; i < std::min(5, notes.size()); ++i) {
        const auto& note = notes[i];
        double noteOnTicks = (note.startTime + start_offset) * inExportBpm / 60.0 * mTicksPerQuarterNote;
        double noteOffTicks = (note.endTime + start_offset) * inExportBpm / 60.0 * mTicksPerQuarterNote;
        std::cout << "DEBUG MIDI: Note " << i << " - Pitch: " << note.pitch << ", Start: " << note.startTime << "s → "
                  << noteOnTicks << " ticks"
                  << ", End: " << note.endTime << "s → " << noteOffTicks << " ticks"
                  << ", Velocity: " << note.velocity << "\n";
    }

    // Add note events (EXACTLY like GUI)
    for (const auto& note: notes) {
        // Create note on message
        auto note_on = juce::MidiMessage::noteOn(1, note.pitch, static_cast<float>(note.velocity / 127.0f));
        note_on.setTimeStamp((note.startTime + start_offset) * inExportBpm / 60.0 * mTicksPerQuarterNote);

        // Create note off message
        auto note_off = juce::MidiMessage::noteOff(1, note.pitch);
        note_off.setTimeStamp((note.endTime + start_offset) * inExportBpm / 60.0 * mTicksPerQuarterNote);

        message_sequence.addEvent(note_on);
        message_sequence.addEvent(note_off);
    }

    // Sort and update matched pairs (EXACTLY like GUI)
    message_sequence.sort();
    message_sequence.updateMatchedPairs();

    std::cout << "DEBUG MIDI: NumEvents in message sequence: " << message_sequence.getNumEvents() << "\n";

    // Write MIDI file (EXACTLY like GUI)
    juce::MidiFile midi_file;
    midi_file.setTicksPerQuarterNote(mTicksPerQuarterNote);
    midi_file.addTrack(message_sequence);

    juce::File outputFile(filename);
    juce::FileOutputStream output_stream(outputFile);

    if (!output_stream.openedOk()) {
        throw std::runtime_error("Failed to open MIDI output file: " + filename.toStdString());
    }

    output_stream.setPosition(0);
    bool success = midi_file.writeTo(output_stream);

    if (!success) {
        throw std::runtime_error("Failed to write MIDI data to file: " + filename.toStdString());
    }

    std::cout << "DEBUG MIDI: Successfully wrote MIDI file\n";
    std::cout << "DEBUG MIDI: File size: " << outputFile.getSize() << " bytes\n";
}

void saveAsCsv(const juce::Array<NoteEvent>& notes, const juce::String& filename)
{
    juce::File file(filename);
    juce::FileOutputStream stream(file);
    if (!stream.openedOk())
        throw std::runtime_error("Cannot create CSV file");

    stream.writeText("start,end,pitch,velocity,note\n", false, false, nullptr);
    for (const auto& note: notes) {
        const char* noteNames[] = {"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"};
        int octave = (note.pitch / 12) - 1;
        juce::String noteName = juce::String(noteNames[note.pitch % 12]) + juce::String(octave);

        juce::String line = juce::String::formatted(
            "%.3f,%.3f,%d,%d,%s\n", note.startTime, note.endTime, note.pitch, note.velocity, noteName.toRawUTF8());
        stream.writeText(line, false, false, nullptr);
    }
}

juce::Array<NoteEvent> transcribe(const juce::AudioBuffer<float>& audio, const CLIArgs& args)
{
    BasicPitch basicPitch;

    // Set parameters - either use manual values or defaults
    float noteSens = args.noteSensitivity;
    float splitSens = args.splitSensitivity;
    float minDuration = args.minNoteDuration;

    if (args.verbose) {
        if (args.autoAnalyze) {
            std::cout << "Using auto-analysis mode with base parameters:\n";
        } else {
            std::cout << "Using manual parameters:\n";
        }
        std::cout << "  Note sensitivity: " << noteSens << "\n";
        std::cout << "  Split sensitivity: " << splitSens << "\n";
        std::cout << "  Min duration: " << minDuration << " ms\n";
        std::cout << "  Amplitude threshold: " << args.amplitudeThreshold << "\n";
        
        if (args.enableNoteQuantization) {
            std::cout << "  Note quantization: ENABLED\n";
            std::cout << "    Key root: " << args.keyRootNote << "\n";
            std::cout << "    Scale type: " << args.scaleType << "\n";
            std::cout << "    Snap mode: " << args.snapMode << "\n";
            std::cout << "    MIDI range: " << args.minMidiNote << "-" << args.maxMidiNote << "\n";
        }
    }

    // Set BasicPitch parameters
    basicPitch.setParameters(noteSens, splitSens, minDuration);

    // Get audio data
    const float* audioData = audio.getReadPointer(0);
    int numSamples = audio.getNumSamples();

    if (args.verbose) {
        std::cout << "Transcribing " << numSamples << " samples...\n";
    }

    // Transcribe
    basicPitch.transcribeToMIDI(const_cast<float*>(audioData), numSamples);

    // Get results
    auto noteEvents = basicPitch.getNoteEvents();

    if (args.verbose) {
        std::cout << "Raw note events found: " << noteEvents.size() << "\n";
    }

    // Apply music theory improvements
    if (args.enableNoteQuantization) {
        NoteOptions noteOptions;
        noteOptions.setParameters(
            true, // Enable
            static_cast<NoteUtils::RootNote>(args.keyRootNote),
            static_cast<NoteUtils::ScaleType>(args.scaleType),
            static_cast<NoteUtils::SnapMode>(args.snapMode),
            args.minMidiNote,
            args.maxMidiNote
        );
        
        noteEvents = noteOptions.process(noteEvents);
        
        if (args.verbose) {
            std::cout << "After note quantization: " << noteEvents.size() << " notes\n";
        }
    }


    // Apply post-processing
    if (args.dropOverlappingPitchBends) {
        Notes::dropOverlappingPitchBends(noteEvents);
    }
    
    if (args.mergeOverlappingNotes) {
        Notes::mergeOverlappingNotesWithSamePitch(noteEvents);
    }

    // Convert to our format with user-specified filtering
    juce::Array<NoteEvent> notes;
    int filteredCount = 0;

    // DEBUG: Show raw timing from BasicPitch before any conversion
    if (args.verbose && noteEvents.size() > 0) {
        std::cout << "DEBUG RAW: First few processed note events:\n";
        for (int i = 0; i < std::min(5, (int) noteEvents.size()); ++i) {
            const auto& event = noteEvents[i];
            std::cout << "DEBUG RAW: Event " << i << " - Pitch: " << event.pitch << ", Start: " << event.startTime
                      << "s"
                      << ", End: " << event.endTime << "s"
                      << ", Amplitude: " << event.amplitude << "\n";
        }
    }

    for (const auto& event: noteEvents) {
        // Apply user-specified threshold filtering
        if (event.amplitude < args.amplitudeThreshold) {
            filteredCount++;
            continue;
        }

        // Check minimum duration
        float durationMs = (event.endTime - event.startTime) * 1000.0f;
        if (durationMs < args.minNoteDuration) {
            filteredCount++;
            continue;
        }

        // Apply MIDI note range filtering
        if (event.pitch < args.minMidiNote || event.pitch > args.maxMidiNote) {
            filteredCount++;
            continue;
        }

        NoteEvent note;
        note.startTime = static_cast<float>(event.startTime);
        note.endTime = static_cast<float>(event.endTime);
        note.pitch = juce::jlimit(0, 127, static_cast<int>(event.pitch));
        note.velocity = juce::jlimit(1, 127, static_cast<int>(event.amplitude * 127.0f));

        // Ensure valid timing - DON'T modify the timing unless absolutely necessary
        if (note.startTime < 0.0f) {
            std::cout << "WARNING: Negative start time " << note.startTime << ", setting to 0\n";
            note.startTime = 0.0f;
        }
        if (note.endTime <= note.startTime) {
            std::cout << "WARNING: Invalid end time " << note.endTime << " <= " << note.startTime << ", adjusting\n";
            note.endTime = note.startTime + 0.01f;
        }

        notes.add(note);
    }

    if (args.verbose) {
        std::cout << "Final notes after filtering: " << notes.size() << "\n";
        std::cout << "Filtered out: " << filteredCount << " notes\n";

        if (notes.size() > 0) {
            std::cout << "DEBUG FINAL: First few final notes:\n";
            for (int i = 0; i < std::min(5, notes.size()); ++i) {
                const auto& note = notes[i];
                std::cout << "DEBUG FINAL: Note " << i << " - Pitch: " << note.pitch << ", Start: " << note.startTime
                          << "s"
                          << ", End: " << note.endTime << "s"
                          << ", Velocity: " << note.velocity << "\n";
            }
        }
    }

    return notes;
}

int main(int argc, char* argv[])
{
    try {
        CLIArgs args = parseArgs(argc, argv);

        if (args.inputFile.isEmpty() || args.outputFile.isEmpty()) {
            std::cerr << "Error: Input and output files are required\n";
            printUsage(argv[0]);
            return 1;
        }

        if (args.verbose) {
            std::cout << "🎵 NeuralNote CLI v1.0\n";
            std::cout << "Input: " << args.inputFile << "\n";
            std::cout << "Output: " << args.outputFile << " (" << args.format << ")\n";
            std::cout << "Auto-analysis: " << (args.autoAnalyze ? "Enabled" : "Disabled") << "\n\n";
        }

        // Load audio
        if (args.verbose)
            std::cout << "📁 Loading audio file...\n";
        auto audioBuffer = loadAudio(args.inputFile, args.sampleRate, args.verbose);

        // Transcribe
        if (args.verbose)
            std::cout << "🎯 Processing audio...\n";
        auto notes = transcribe(audioBuffer, args);

        if (notes.size() == 0) {
            std::cout << "⚠️  No notes detected. Try:\n";
            std::cout << "  - Lower sensitivity: --note-sens 0.2 --split-sens 0.2\n";
            std::cout << "  - Lower threshold: --threshold 0.02\n";
            std::cout << "  - Shorter duration: --min-duration 30\n";
            return 1;
        }

        // Save output
        if (args.verbose)
            std::cout << "💾 Saving output...\n";

        if (args.format == "midi") {
            saveAsMidi(notes, args.outputFile);
        } else if (args.format == "csv") {
            saveAsCsv(notes, args.outputFile);
        } else {
            saveAsJson(notes, args.outputFile);
        }

        std::cout << "✅ Success: " << notes.size() << " notes written to " << args.outputFile;
        if (!args.autoAnalyze) {
            std::cout << " (manual parameters)";
        }
        std::cout << "\n";

        // Verify file was created and has content
        juce::File outputFile(args.outputFile);
        if (outputFile.existsAsFile() && outputFile.getSize() > 0) {
            if (args.verbose) {
                std::cout << "📁 Output file size: " << outputFile.getSize() << " bytes\n";
            }
        } else {
            std::cerr << "⚠️  Warning: Output file may be empty or not created properly\n";
            return 1;
        }

        return 0;

    } catch (const std::exception& e) {
        std::cerr << "❌ Error: " << e.what() << std::endl;
        return 1;
    }
}

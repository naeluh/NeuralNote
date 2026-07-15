/*
  NeuralNote CLI - Enhanced Audio-to-MIDI Transcription
  Music Theory and MIDI Standards Improvements
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
    std::cout << "NeuralNote CLI - Enhanced Audio-to-MIDI Transcription\n";
    std::cout << "Music Theory and MIDI Standards Improvements\n\n";
    std::cout << "Usage: " << programName << " [options] -i <input_file> -o <output_file>\n\n";
    std::cout << "Options:\n";
    std::cout << "  -i, --input <file>     Input audio file (.wav, .aiff, .flac, .mp3)\n";
    std::cout << "  -o, --output <file>    Output file\n";
    std::cout << "  -f, --format <format>  Output format: json, midi, csv (default: json)\n";
    std::cout << "  --auto-analyze         Auto-detect optimal parameters (default: on)\n";
    std::cout << "  --no-auto              Disable auto-analysis, use manual parameters\n";
    std::cout << "  --show-analysis        Show detailed audio analysis results\n";
    std::cout << "\nManual Parameters:\n";
    std::cout << "  --note-sens <val>      Note sensitivity 0.0-1.0 (default: 0.5)\n";
    std::cout << "  --split-sens <val>     Split sensitivity 0.0-1.0 (default: 0.5)\n";
    std::cout << "  --threshold <val>       Amplitude threshold 0.0-1.0 (default: 0.1)\n";
    std::cout << "  --min-duration <ms>    Minimum note duration in ms (default: 58)\n";
    std::cout << "  --sample-rate <rate>   Sample rate (default: 22050)\n";
    std::cout << "\nMusic Theory Features:\n";
    std::cout << "  --enable-note-quant    Enable note quantization to musical scales\n";
    std::cout << "  --key-root <note>      Root note (0=C, 1=C#, 2=D, etc.)\n";
    std::cout << "  --scale <type>         Scale type (0=Chromatic, 1=Major, 2=Minor)\n";
    std::cout << "  --snap-mode <mode>     Snap mode (0=Adjust, 1=Remove)\n";
    std::cout << "  --min-midi <note>      Minimum MIDI note (default: 21=A0)\n";
    std::cout << "  --max-midi <note>      Maximum MIDI note (default: 108=C8)\n";
    std::cout << "  --no-merge-notes      Disable merging overlapping notes\n";
    std::cout << "  --no-drop-bends       Disable dropping overlapping pitch bends\n";
    std::cout << "\nOther Options:\n";
    std::cout << "  -v, --verbose          Verbose output\n";
    std::cout << "  -h, --help             Show this help\n";
    std::cout << "\nExamples:\n";
    std::cout << "  " << programName << " -i piano.wav -o piano.mid --enable-note-quant --key-root 0 --scale 1\n";
    std::cout << "  " << programName << " -i song.mp3 -o song.mid --enable-note-quant --scale 2 --snap-mode 0\n";
    std::cout << "  " << programName << " -i beatbox.wav -o beatbox.mid --enable-note-quant --scale 2 --snap-mode 0\n";
}

bool parseArgs(int argc, char* argv[], CLIArgs& args)
{
    for (int i = 1; i < argc; i++) {
        juce::String arg = argv[i];
        
        if (arg == "-h" || arg == "--help") {
            printUsage(argv[0]);
            return false;
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
        } else if ((arg == "--note-sens") && i + 1 < argc) {
            args.noteSensitivity = juce::String(argv[++i]).getFloatValue();
        } else if ((arg == "--split-sens") && i + 1 < argc) {
            args.splitSensitivity = juce::String(argv[++i]).getFloatValue();
        } else if ((arg == "--threshold") && i + 1 < argc) {
            args.amplitudeThreshold = juce::String(argv[++i]).getFloatValue();
        } else if ((arg == "--min-duration") && i + 1 < argc) {
            args.minNoteDuration = juce::String(argv[++i]).getFloatValue();
        } else if ((arg == "--sample-rate") && i + 1 < argc) {
            args.sampleRate = juce::String(argv[++i]).getIntValue();
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
            return false;
        }
    }
    
    return true;
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
    basicPitch.setNoteSensitivity(noteSens);
    basicPitch.setSplitSensitivity(splitSens);
    basicPitch.setMinNoteDuration(minDuration);
    basicPitch.setAmplitudeThreshold(args.amplitudeThreshold);

    // Transcribe audio to notes
    juce::Array<NoteEvent> noteEvents = basicPitch.transcribe(audio);

    if (args.verbose) {
        std::cout << "Initial transcription: " << noteEvents.size() << " notes\n";
    }

    // Apply music theory improvements if enabled
    if (args.enableNoteQuantization) {
        NoteOptions noteOptions;
        noteOptions.setParameters(
            true, // Enable note quantization
            static_cast<NoteOptions::ScaleTypes>(args.scaleType),
            args.keyRootNote,
            static_cast<NoteOptions::SnapModes>(args.snapMode),
            args.minMidiNote,
            args.maxMidiNote
        );
        
        noteEvents = noteOptions.process(noteEvents);
        
        if (args.verbose) {
            std::cout << "After note quantization: " << noteEvents.size() << " notes\n";
        }
    }

    // Apply post-processing
    if (args.mergeOverlappingNotes || args.dropOverlappingPitchBends) {
        juce::Array<NoteEvent> processedNotes;
        
        for (int i = 0; i < noteEvents.size(); i++) {
            NoteEvent note = noteEvents[i];
            bool shouldKeep = true;
            
            // Check for overlapping notes
            if (args.mergeOverlappingNotes) {
                for (int j = 0; j < processedNotes.size(); j++) {
                    if (processedNotes[j].pitch == note.pitch &&
                        processedNotes[j].startTime < note.endTime &&
                        note.startTime < processedNotes[j].endTime) {
                        // Merge overlapping notes
                        processedNotes[j].endTime = juce::jmax(processedNotes[j].endTime, note.endTime);
                        shouldKeep = false;
                        break;
                    }
                }
            }
            
            if (shouldKeep) {
                processedNotes.add(note);
            }
        }
        
        noteEvents = processedNotes;
        
        if (args.verbose) {
            std::cout << "After post-processing: " << noteEvents.size() << " notes\n";
        }
    }

    return noteEvents;
}

void saveToFile(const juce::Array<NoteEvent>& noteEvents, const CLIArgs& args)
{
    if (args.format == "midi") {
        // Save as MIDI file
        juce::MidiFile midiFile;
        juce::MidiMessageSequence sequence;
        
        for (const auto& note : noteEvents) {
            int startTick = static_cast<int>(note.startTime * 480.0); // 480 ticks per quarter note
            int endTick = static_cast<int>(note.endTime * 480.0);
            int velocity = static_cast<int>(note.amplitude * 127.0);
            
            sequence.addEvent(juce::MidiMessage::noteOn(1, note.pitch, static_cast<juce::uint8>(velocity)), startTick);
            sequence.addEvent(juce::MidiMessage::noteOff(1, note.pitch), endTick);
        }
        
        midiFile.addTrack(sequence);
        midiFile.setTicksPerQuarterNote(480);
        
        juce::File outputFile(args.outputFile);
        juce::FileOutputStream stream(outputFile);
        midiFile.writeTo(stream);
        
        if (args.verbose) {
            std::cout << "Saved " << noteEvents.size() << " notes to MIDI file: " << args.outputFile << "\n";
        }
    } else if (args.format == "csv") {
        // Save as CSV file
        juce::File outputFile(args.outputFile);
        juce::FileOutputStream stream(outputFile);
        
        stream << "start_time,end_time,pitch,amplitude\n";
        for (const auto& note : noteEvents) {
            stream << note.startTime << "," << note.endTime << "," << note.pitch << "," << note.amplitude << "\n";
        }
        
        if (args.verbose) {
            std::cout << "Saved " << noteEvents.size() << " notes to CSV file: " << args.outputFile << "\n";
        }
    } else {
        // Save as JSON file (default)
        juce::File outputFile(args.outputFile);
        juce::FileOutputStream stream(outputFile);
        
        stream << "{\n";
        stream << "  \"notes\": [\n";
        for (int i = 0; i < noteEvents.size(); i++) {
            const auto& note = noteEvents[i];
            stream << "    {\n";
            stream << "      \"start_time\": " << note.startTime << ",\n";
            stream << "      \"end_time\": " << note.endTime << ",\n";
            stream << "      \"pitch\": " << note.pitch << ",\n";
            stream << "      \"amplitude\": " << note.amplitude << "\n";
            stream << "    }";
            if (i < noteEvents.size() - 1) {
                stream << ",";
            }
            stream << "\n";
        }
        stream << "  ]\n";
        stream << "}\n";
        
        if (args.verbose) {
            std::cout << "Saved " << noteEvents.size() << " notes to JSON file: " << args.outputFile << "\n";
        }
    }
}

int main(int argc, char* argv[])
{
    CLIArgs args;
    
    if (!parseArgs(argc, argv, args)) {
        return 1;
    }
    
    if (args.inputFile.isEmpty() || args.outputFile.isEmpty()) {
        std::cerr << "Error: Input and output files are required\n";
        printUsage(argv[0]);
        return 1;
    }
    
    if (args.verbose) {
        std::cout << "NeuralNote CLI - Enhanced Audio-to-MIDI Transcription\n";
        std::cout << "Input: " << args.inputFile << "\n";
        std::cout << "Output: " << args.outputFile << "\n";
        std::cout << "Format: " << args.format << "\n";
    }
    
    // Load audio file
    juce::AudioFormatManager formatManager;
    formatManager.registerBasicFormats();
    
    juce::File inputFile(args.inputFile);
    if (!inputFile.exists()) {
        std::cerr << "Error: Input file does not exist: " << args.inputFile << "\n";
        return 1;
    }
    
    std::unique_ptr<juce::AudioFormatReader> reader(formatManager.createReaderFor(inputFile));
    if (!reader) {
        std::cerr << "Error: Could not read audio file: " << args.inputFile << "\n";
        return 1;
    }
    
    if (args.verbose) {
        std::cout << "Audio file info:\n";
        std::cout << "  Sample rate: " << reader->sampleRate << " Hz\n";
        std::cout << "  Channels: " << reader->numChannels << "\n";
        std::cout << "  Length: " << reader->lengthInSamples << " samples\n";
        std::cout << "  Duration: " << (reader->lengthInSamples / reader->sampleRate) << " seconds\n";
    }
    
    // Resample if necessary
    juce::AudioBuffer<float> audioBuffer;
    if (reader->sampleRate != args.sampleRate) {
        if (args.verbose) {
            std::cout << "Resampling from " << reader->sampleRate << " Hz to " << args.sampleRate << " Hz\n";
        }
        
        juce::AudioBuffer<float> tempBuffer(reader->numChannels, static_cast<int>(reader->lengthInSamples));
        reader->read(&tempBuffer, 0, static_cast<int>(reader->lengthInSamples), 0, true, true);
        
        int newLength = static_cast<int>((reader->lengthInSamples * args.sampleRate) / reader->sampleRate);
        audioBuffer.setSize(reader->numChannels, newLength);
        
        for (int channel = 0; channel < reader->numChannels; channel++) {
            juce::LinearInterpolator interpolator;
            interpolator.reset();
            interpolator.process(tempBuffer.getReadPointer(channel), tempBuffer.getNumSamples(),
                               audioBuffer.getWritePointer(channel), audioBuffer.getNumSamples());
        }
    } else {
        audioBuffer.setSize(reader->numChannels, static_cast<int>(reader->lengthInSamples));
        reader->read(&audioBuffer, 0, static_cast<int>(reader->lengthInSamples), 0, true, true);
    }
    
    // Transcribe audio to MIDI
    juce::Array<NoteEvent> noteEvents = transcribe(audioBuffer, args);
    
    if (noteEvents.isEmpty()) {
        std::cout << "No notes detected in audio file.\n";
        return 0;
    }
    
    // Save results
    saveToFile(noteEvents, args);
    
    if (args.verbose) {
        std::cout << "Transcription complete!\n";
    }
    
    return 0;
}

#!/bin/bash

# NeuralNote CLI Build Script for Mac M3 Pro
# This script builds a standalone executable that can be called from Python/Node.js

set -e  # Exit on any error

echo "🎵 NeuralNote CLI Build Script for Mac M3 Pro"
echo "============================================="

# Configuration
BUILD_DIR="build_cli"
CMAKE_BUILD_TYPE="Release"
NEURALNOTE_ROOT="$(pwd)"
ONNXRUNTIME_VERSION="1.15.1"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the NeuralNote directory
check_neuralnote_directory() {
    if [[ ! -d "Lib/Model" ]]; then
        log_error "This script must be run from the NeuralNote root directory"
        log_error "Please clone NeuralNote first:"
        echo "git clone --recurse-submodules --shallow-submodules https://github.com/DamRsn/NeuralNote"
        exit 1
    fi
    log_info "Found NeuralNote directory structure ✓"
}

# Check system requirements
check_requirements() {
    log_info "Checking system requirements..."

    # Check macOS version
    if [[ "$(uname)" != "Darwin" ]]; then
        log_error "This script is designed for macOS only"
        exit 1
    fi

    # Check for Apple Silicon
    if [[ "$(uname -m)" != "arm64" ]]; then
        log_warn "Not running on Apple Silicon (M1/M2/M3). Build may still work but optimization will be different."
    else
        log_info "Apple Silicon detected ✓"
    fi

    # Check for required tools
    command -v cmake >/dev/null 2>&1 || { log_error "cmake is required but not installed. Install via: brew install cmake"; exit 1; }
    command -v xxd >/dev/null 2>&1 || { log_error "xxd is required but not installed (should be included with macOS)"; exit 1; }

    log_info "All required tools found ✓"
}

# Install dependencies via Homebrew
install_dependencies() {
    log_info "Installing dependencies via Homebrew..."

    # Check if Homebrew is installed
    if ! command -v brew >/dev/null 2>&1; then
        log_error "Homebrew is not installed. Please install it first:"
        echo '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
        exit 1
    fi

    # Install other potentially useful tools
    if ! brew list wget >/dev/null 2>&1; then
        log_info "Installing wget..."
        brew install wget
    fi

    log_info "Dependencies ready ✓"
}

# Download and setup ONNXRuntime
setup_onnxruntime() {
    log_info "Setting up ONNXRuntime..."

    ONNX_DIR="ThirdParty/onnxruntime"

    if [[ -d "$ONNX_DIR" ]] && [[ -f "$ONNX_DIR/lib/libonnxruntime.a" ]]; then
        log_info "ONNXRuntime already set up ✓"
        return
    fi

    mkdir -p ThirdParty
    cd ThirdParty

    # Download ONNXRuntime for macOS ARM64
    ONNX_PACKAGE="onnxruntime-osx-arm64-${ONNXRUNTIME_VERSION}.tgz"
    ONNX_URL="https://github.com/microsoft/onnxruntime/releases/download/v${ONNXRUNTIME_VERSION}/${ONNX_PACKAGE}"

    if [[ ! -f "$ONNX_PACKAGE" ]]; then
        log_info "Downloading ONNXRuntime ${ONNXRUNTIME_VERSION}..."
        wget "$ONNX_URL"
    fi

    # Extract
    if [[ ! -d "onnxruntime-osx-arm64-${ONNXRUNTIME_VERSION}" ]]; then
        tar -xzf "$ONNX_PACKAGE"
    fi

    # Create symlink or copy to expected location
    if [[ ! -d "onnxruntime" ]]; then
        ln -sf "onnxruntime-osx-arm64-${ONNXRUNTIME_VERSION}" onnxruntime
    fi

    cd ..
    log_info "ONNXRuntime setup complete ✓"
}

# Setup RTNeural (should be included as submodule)
setup_rtneural() {
    log_info "Setting up RTNeural..."

    if [[ ! -d "ThirdParty/RTNeural" ]]; then
        log_error "RTNeural not found. Make sure you cloned with --recurse-submodules"
        log_info "You can fix this by running: git submodule update --init --recursive"
        exit 1
    fi

    log_info "RTNeural found ✓"
}

# Check for model data
check_model_data() {
    log_info "Checking model data..."

    if [[ ! -d "Lib/ModelData" ]]; then
        log_error "Model data directory not found"
        exit 1
    fi

    # Check for required model files
    local missing_files=()

    if [[ ! -f "Lib/ModelData/features_model.onnx" ]] && [[ ! -f "Lib/ModelData/features_model.ort" ]]; then
        missing_files+=("features_model.onnx or features_model.ort")
    fi

    # Check for JSON model files
    if ! ls Lib/ModelData/*.json >/dev/null 2>&1; then
        missing_files+=("*.json model files")
    fi

    if [[ ${#missing_files[@]} -gt 0 ]]; then
        log_error "Missing required model files:"
        for file in "${missing_files[@]}"; do
            echo "  - $file"
        done
        log_error "Please ensure all model data files are present in Lib/ModelData/"
        exit 1
    fi

    log_info "Model data files found ✓"
}

# Create CLI source files and integrate with existing build system
setup_cli_integration() {
    log_info "Setting up CLI integration with existing build system..."

    # Create CLI directory structure
    mkdir -p Source/CLI

    # Copy CLI source to appropriate location
    if [[ ! -f "neuralnote_cli.cpp" ]]; then
        log_error "neuralnote_cli.cpp not found. Please ensure the CLI source file is in the current directory."
        exit 1
    fi

    cp neuralnote_cli.cpp Source/CLI/
    log_info "CLI source copied to Source/CLI/ ✓"

    # Check if the existing CMakeLists.txt needs CLI target
    if ! grep -q "neuralnote_cli" CMakeLists.txt; then
        log_info "Adding CLI target to existing CMakeLists.txt..."

        # Backup original CMakeLists.txt
        cp CMakeLists.txt CMakeLists.txt.backup

        # Add CLI target at the end of CMakeLists.txt
        cat >> CMakeLists.txt << 'EOF'

#==============================================================================
# CLI Executable Target (added by build script)
#==============================================================================

option(BUILD_CLI "Build command-line interface" ON)

if(BUILD_CLI)
    message(STATUS "Building NeuralNote CLI")

    # Find libsndfile for audio file I/O
    find_package(PkgConfig QUIET)
    if(PKG_CONFIG_FOUND)
        pkg_check_modules(SNDFILE sndfile)
    endif()

    # CLI source files
    set(CLI_SOURCES
        Source/CLI/neuralnote_cli.cpp
    )

    # Create CLI executable
    add_executable(neuralnote_cli ${CLI_SOURCES})

    # Set target properties
    set_target_properties(neuralnote_cli PROPERTIES
        OUTPUT_NAME "neuralnote"
        RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/CLI"
        CXX_STANDARD 17
        CXX_STANDARD_REQUIRED ON
    )

    # Link against JUCE and existing shared code
    target_link_libraries(neuralnote_cli PRIVATE
        juce::juce_core
        juce::juce_data_structures
        juce::juce_events
        juce::juce_graphics
        juce::juce_gui_basics
        juce::juce_audio_basics
        juce::juce_audio_devices
        juce::juce_audio_formats
        juce::juce_audio_processors
        juce::juce_audio_utils
    )

    # Add libsndfile if found (optional - JUCE has built-in audio support)
    if(SNDFILE_FOUND)
        target_include_directories(neuralnote_cli PRIVATE ${SNDFILE_INCLUDE_DIRS})
        target_link_directories(neuralnote_cli PRIVATE ${SNDFILE_LIBRARY_DIRS})
        target_link_libraries(neuralnote_cli PRIVATE ${SNDFILE_LIBRARIES})
        target_compile_definitions(neuralnote_cli PRIVATE HAVE_SNDFILE=1)
        message(STATUS "libsndfile found - enhanced audio format support enabled")
    else()
        message(STATUS "libsndfile not found - using JUCE built-in audio format support")
    endif()

    # Platform-specific settings
    if(APPLE)
        target_link_libraries(neuralnote_cli PRIVATE
            "-framework Foundation"
            "-framework Accelerate"
            "-framework CoreAudio"
            "-framework AudioToolbox"
            "-framework CoreMIDI"
        )

        # Mac ARM optimization
        if(CMAKE_OSX_ARCHITECTURES MATCHES "arm64")
            target_compile_options(neuralnote_cli PRIVATE -march=native)
        endif()

        # Set deployment target
        set_target_properties(neuralnote_cli PROPERTIES
            MACOSX_DEPLOYMENT_TARGET "10.15"
        )
    endif()

    # Compiler definitions
    target_compile_definitions(neuralnote_cli PRIVATE
        JUCE_WEB_BROWSER=0
        JUCE_USE_CURL=0
        JUCE_APPLICATION_NAME_STRING="NeuralNote CLI"
        JUCE_APPLICATION_VERSION_STRING="1.0.0"
        CLI_BUILD=1
    )

    message(STATUS "CLI executable will be built as: ${CMAKE_BINARY_DIR}/CLI/neuralnote")
endif()
EOF

        log_info "CLI target added to CMakeLists.txt ✓"
    else
        log_info "CLI target already exists in CMakeLists.txt ✓"
    fi
}

# Build the project using existing NeuralNote build system
build_project() {
    log_info "Building NeuralNote with CLI support..."

    # Use the existing build script first to setup dependencies
    if [[ -f "build.sh" ]]; then
        log_info "Running existing NeuralNote build script to setup dependencies..."
        ./build.sh
    else
        log_warn "No existing build.sh found, proceeding with manual build..."
    fi

    # Create build directory
    mkdir -p "$BUILD_DIR"
    cd "$BUILD_DIR"

    # Configure with CMake, enabling CLI build
    log_info "Configuring with CMake (with CLI enabled)..."
    cmake -DCMAKE_BUILD_TYPE="$CMAKE_BUILD_TYPE" \
          -DCMAKE_OSX_ARCHITECTURES=arm64 \
          -DCMAKE_OSX_DEPLOYMENT_TARGET=11.0 \
          -DBUILD_CLI=ON \
          ..

    # Build the CLI target specifically
    log_info "Building CLI target..."
    make neuralnote_cli -j$(sysctl -n hw.ncpu)

    cd ..

    # Check for successful build
    CLI_EXECUTABLE=""
    if [[ -f "$BUILD_DIR/CLI/neuralnote" ]]; then
        CLI_EXECUTABLE="$BUILD_DIR/CLI/neuralnote"
    elif [[ -f "$BUILD_DIR/neuralnote_cli" ]]; then
        CLI_EXECUTABLE="$BUILD_DIR/neuralnote_cli"
    elif [[ -f "$BUILD_DIR/Source/CLI/neuralnote" ]]; then
        CLI_EXECUTABLE="$BUILD_DIR/Source/CLI/neuralnote"
    fi

    if [[ -n "$CLI_EXECUTABLE" ]]; then
        log_info "Build successful! ✅"
        log_info "CLI executable created: $CLI_EXECUTABLE"

        # Create a symlink for easy access
        mkdir -p "$BUILD_DIR/bin"
        ln -sf "../$(basename $(dirname $CLI_EXECUTABLE))/$(basename $CLI_EXECUTABLE)" "$BUILD_DIR/bin/neuralnote"
        log_info "Symlink created: $BUILD_DIR/bin/neuralnote"
    else
        log_error "Build failed - CLI executable not found"
        log_error "Checked locations:"
        echo "  - $BUILD_DIR/CLI/neuralnote"
        echo "  - $BUILD_DIR/neuralnote_cli"
        echo "  - $BUILD_DIR/Source/CLI/neuralnote"
        exit 1
    fi
}

# Test the executable
test_executable() {
    # Find the CLI executable
    local exe_path=""
    if [[ -f "$BUILD_DIR/bin/neuralnote" ]]; then
        exe_path="$BUILD_DIR/bin/neuralnote"
    elif [[ -f "$BUILD_DIR/CLI/neuralnote" ]]; then
        exe_path="$BUILD_DIR/CLI/neuralnote"
    elif [[ -f "$BUILD_DIR/neuralnote_cli" ]]; then
        exe_path="$BUILD_DIR/neuralnote_cli"
    fi

    if [[ ! -f "$exe_path" ]]; then
        log_error "Executable not found for testing"
        return 1
    fi

    log_info "Testing executable: $exe_path"

    # Test help output
    if "$exe_path" --help >/dev/null 2>&1; then
        log_info "Executable responds to --help ✓"
    else
        log_warn "Executable may have issues (help test failed)"
    fi

    # Check dynamic library dependencies
    log_info "Dynamic library dependencies:"
    otool -L "$exe_path" | grep -v "/usr/lib" | grep -v "/System/Library" || true
}

# Create installation package
create_package() {
    log_info "Creating installation package..."

    local install_dir="neuralnote_cli_package"
    local exe_path="$BUILD_DIR/bin/neuralnote"

    mkdir -p "$install_dir/bin"
    cp "$exe_path" "$install_dir/bin/"

    # Create wrapper scripts
    cat > "$install_dir/bin/neuralnote_wrapper.py" << 'EOF'
#!/usr/bin/env python3
"""
Python wrapper for NeuralNote CLI
Usage: python neuralnote_wrapper.py input.wav output.json
"""
import subprocess
import sys
import os
import json

def transcribe_audio(input_file, output_file, **kwargs):
    """Transcribe audio file using NeuralNote CLI"""

    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    neuralnote_exe = os.path.join(script_dir, "neuralnote")

    # Build command
    cmd = [neuralnote_exe, "-i", input_file, "-o", output_file]

    # Add optional parameters
    if "format" in kwargs:
        cmd.extend(["-f", kwargs["format"]])
    if "note_sensitivity" in kwargs:
        cmd.extend(["-n", str(kwargs["note_sensitivity"])])
    if "split_sensitivity" in kwargs:
        cmd.extend(["-s", str(kwargs["split_sensitivity"])])
    if "verbose" in kwargs and kwargs["verbose"]:
        cmd.append("-v")

    # Run the command
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return {"success": True, "output": result.stdout}
    except subprocess.CalledProcessError as e:
        return {"success": False, "error": e.stderr}

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python neuralnote_wrapper.py <input_file> <output_file>")
        sys.exit(1)

    result = transcribe_audio(sys.argv[1], sys.argv[2], verbose=True)

    if result["success"]:
        print("Success!")
        if result["output"]:
            print(result["output"])
    else:
        print("Error:", result["error"])
        sys.exit(1)
EOF

    cat > "$install_dir/bin/neuralnote_wrapper.js" << 'EOF'
#!/usr/bin/env node
/**
 * Node.js wrapper for NeuralNote CLI
 * Usage: node neuralnote_wrapper.js input.wav output.json
 */

const { spawn } = require('child_process');
const path = require('path');

function transcribeAudio(inputFile, outputFile, options = {}) {
    return new Promise((resolve, reject) => {
        const scriptDir = __dirname;
        const neuralNoteExe = path.join(scriptDir, 'neuralnote');

        // Build command arguments
        const args = ['-i', inputFile, '-o', outputFile];

        if (options.format) {
            args.push('-f', options.format);
        }
        if (options.noteSensitivity !== undefined) {
            args.push('-n', options.noteSensitivity.toString());
        }
        if (options.splitSensitivity !== undefined) {
            args.push('-s', options.splitSensitivity.toString());
        }
        if (options.verbose) {
            args.push('-v');
        }

        // Spawn the process
        const child = spawn(neuralNoteExe, args);

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        child.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        child.on('close', (code) => {
            if (code === 0) {
                resolve({ success: true, output: stdout });
            } else {
                reject({ success: false, error: stderr });
            }
        });

        child.on('error', (err) => {
            reject({ success: false, error: err.message });
        });
    });
}

// CLI usage
if (require.main === module) {
    if (process.argv.length < 4) {
        console.log('Usage: node neuralnote_wrapper.js <input_file> <output_file>');
        process.exit(1);
    }

    const inputFile = process.argv[2];
    const outputFile = process.argv[3];

    transcribeAudio(inputFile, outputFile, { verbose: true })
        .then(result => {
            console.log('Success!');
            if (result.output) {
                console.log(result.output);
            }
        })
        .catch(error => {
            console.error('Error:', error.error);
            process.exit(1);
        });
}

module.exports = { transcribeAudio };
EOF

    # Make scripts executable
    chmod +x "$install_dir/bin/neuralnote_wrapper.py"
    chmod +x "$install_dir/bin/neuralnote_wrapper.js"

    # Create README
    cat > "$install_dir/README.md" << EOF
# NeuralNote CLI

Command-line audio to MIDI transcription tool built from NeuralNote.

## Usage

### Direct usage:
\`\`\`bash
./bin/neuralnote -i input.wav -o output.json
./bin/neuralnote -i input.wav -o output.mid -f midi
\`\`\`

### Python wrapper:
\`\`\`python
from neuralnote_wrapper import transcribe_audio
result = transcribe_audio("input.wav", "output.json")
\`\`\`

### Node.js wrapper:
\`\`\`javascript
const { transcribeAudio } = require('./neuralnote_wrapper');
transcribeAudio("input.wav", "output.json").then(console.log);
\`\`\`

## Options

- \`-i, --input <file>\`: Input audio file (.wav, .aiff, .flac)
- \`-o, --output <file>\`: Output file
- \`-f, --format <format>\`: Output format: json, midi, csv (default: json)
- \`-n, --note-sens <val>\`: Note sensitivity 0.0-1.0 (default: 0.5)
- \`-s, --split-sens <val>\`: Split sensitivity 0.0-1.0 (default: 0.5)
- \`-v, --verbose\`: Verbose output

Built on $(date) for macOS ARM64
EOF

    log_info "Package created: $install_dir/"
}

# Main execution
main() {
    log_info "Starting build process..."

    check_neuralnote_directory
    check_requirements
    install_dependencies
    setup_onnxruntime
    setup_rtneural
    check_model_data
    setup_cli_integration
    build_project
    test_executable
    create_package

    echo
    log_info "🎉 Build completed successfully!"
    echo

    # Find and display the actual executable location
    if [[ -f "$BUILD_DIR/bin/neuralnote" ]]; then
        echo "Executable location: $BUILD_DIR/bin/neuralnote"
    elif [[ -f "$BUILD_DIR/CLI/neuralnote" ]]; then
        echo "Executable location: $BUILD_DIR/CLI/neuralnote"
    elif [[ -f "$BUILD_DIR/neuralnote_cli" ]]; then
        echo "Executable location: $BUILD_DIR/neuralnote_cli"
    fi

    echo "Package directory: neuralnote_cli_package/"
    echo
    echo "Test the executable:"
    echo "  ./\$(find $BUILD_DIR -name 'neuralnote' -type f) --help"
    echo
    echo "Example usage:"
    echo "  ./\$(find $BUILD_DIR -name 'neuralnote' -type f) -i audio.wav -o notes.json -v"
    echo
}

# Run main function
main "$@"

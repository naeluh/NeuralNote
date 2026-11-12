#!/usr/bin/env bash
# Build script for NeuralNote Drums CLI
# This script builds the CLI using the main project's build system

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Go up one level from beat-box-app/ to NeuralNote root
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CLI_DIR="$SCRIPT_DIR/cli"

echo "🥁 Building NeuralNote Drums CLI..."
echo "Project root: $PROJECT_ROOT"
echo "CLI source: $CLI_DIR"
echo "Build output: $CLI_DIR/neuralnote_drums"

# Ensure we're in the project root for the main build
cd "$PROJECT_ROOT"

# Check if main build exists, if not run main build.sh
if [ ! -d "$PROJECT_ROOT/build" ]; then
    echo "Main build directory not found. Running main build.sh..."
    cd "$PROJECT_ROOT"
    ./build.sh
    cd "$SCRIPT_DIR"
fi

# Verify source file exists (use absolute path)
SOURCE_FILE="$CLI_DIR/neuralnote_drums_cli.cpp"
if [ ! -f "$SOURCE_FILE" ]; then
    echo "❌ Error: CLI source file not found at: $SOURCE_FILE"
    echo "   Current directory: $(pwd)"
    exit 1
fi
echo "✓ Found CLI source: $SOURCE_FILE"

# Reconfigure CMake to ensure drums CLI target is included
echo "Configuring CMake (to include drums CLI target)..."
cd "$PROJECT_ROOT"
# Always reconfigure to ensure drums CLI target is picked up
echo "Reconfiguring CMake with BUILD_CLI=ON..."
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DBUILD_CLI=ON

# Verify target exists after configuration
if ! cmake --build build --target help 2>/dev/null | grep -q "neuralnote_drums_cli"; then
    echo "⚠️  Warning: neuralnote_drums_cli target not found in CMake configuration"
    echo "   Checking if source file is detected..."
    if [ -f "beat-box-app/cli/neuralnote_drums_cli.cpp" ]; then
        echo "   ✓ Source file exists at: beat-box-app/cli/neuralnote_drums_cli.cpp"
        echo "   Re-running CMake configuration..."
        cmake -S . -B build -DBUILD_CLI=ON
    else
        echo "   ✗ Source file NOT found at: beat-box-app/cli/neuralnote_drums_cli.cpp"
        exit 1
    fi
fi

# Build the drums CLI target
echo "Building drums CLI target..."
cd "$PROJECT_ROOT"
if ! cmake --build build --target neuralnote_drums_cli -j $(getconf _NPROCESSORS_ONLN || echo 4); then
    echo "❌ Build failed. Trying to list available targets..."
    cmake --build build --target help 2>&1 | head -20
    exit 1
fi
cd "$SCRIPT_DIR"

# Copy binary next to its source: backend/server.js runs beat-box-app/cli/neuralnote_drums
if [ -f "$PROJECT_ROOT/build/CLI/neuralnote_drums" ]; then
    cp "$PROJECT_ROOT/build/CLI/neuralnote_drums" "$CLI_DIR/neuralnote_drums"
    chmod +x "$CLI_DIR/neuralnote_drums"
    echo "✅ Success! Executable: $CLI_DIR/neuralnote_drums"
    echo ""
    echo "Usage:"
    echo "  $CLI_DIR/neuralnote_drums -i beatbox.wav -o drums.mid -v"
else
    echo "❌ Build failed - executable not found at: $PROJECT_ROOT/build/CLI/neuralnote_drums"
    echo "   Make sure the main project build completed successfully."
    exit 1
fi

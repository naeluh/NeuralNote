#!/usr/bin/env bash
# Quick build for NeuralNote Drums CLI (percussion only)

set -e

echo "🥁 Building NeuralNote Drums CLI..."

# Use existing build if available, otherwise create
if [ ! -d "build" ]; then
    echo "Running full build (first time)..."
    ./build.sh
fi

# Build only the drums CLI target
echo "Building drums CLI target..."
cmake --build build --target neuralnote_drums_cli -j $(getconf _NPROCESSORS_ONLN || echo 4)

if [ -f "build/CLI/neuralnote_drums" ]; then
    echo "✅ Success! Executable: build/CLI/neuralnote_drums"
    echo ""
    echo "Usage:"
    echo "  ./build/CLI/neuralnote_drums -i beatbox.wav -o drums.mid"
    echo ""
else
    echo "❌ Build failed"
    exit 1
fi

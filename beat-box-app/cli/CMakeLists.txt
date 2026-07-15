cmake_minimum_required(VERSION 3.16)
project(NeuralNoteDrumsCLI VERSION 1.0.0)

# This CMakeLists.txt builds the drums CLI standalone
# It references the main project's Lib/ and ThirdParty/ directories
# Run from beat-box-app/cli/ with: cmake -S . -B ../build -DMAIN_PROJECT_ROOT=../../

# C++ settings
set(CMAKE_CXX_STANDARD 17)
enable_language(CXX)

# Get main project root (should be passed as CMAKE variable or auto-detect)
if(NOT DEFINED MAIN_PROJECT_ROOT)
    # Auto-detect: go up two levels from cli/ to project root
    get_filename_component(MAIN_PROJECT_ROOT "${CMAKE_CURRENT_SOURCE_DIR}/../.." ABSOLUTE)
endif()

message(STATUS "Main project root: ${MAIN_PROJECT_ROOT}")
message(STATUS "CLI source directory: ${CMAKE_CURRENT_SOURCE_DIR}")

# Minimum MacOS target
if(APPLE)
    set(CMAKE_OSX_DEPLOYMENT_TARGET "10.15" CACHE STRING "Minimum OS X deployment version" FORCE)
endif()

# Add JUCE and RTNeural from main project
add_subdirectory(${MAIN_PROJECT_ROOT}/ThirdParty/JUCE)
add_subdirectory(${MAIN_PROJECT_ROOT}/ThirdParty/RTNeural)

set(BaseTargetName NeuralNote)

# Generate JUCE header (needed for binary data)
# We need to create a minimal plugin target or use the existing one
# For now, we'll reference the main project's build if it exists
# Otherwise, we'll need to generate headers manually

# Binary data (model files) - reference from main project
file(GLOB RESOURCES_FILES
    ${MAIN_PROJECT_ROOT}/Lib/ModelData/*.json
    ${MAIN_PROJECT_ROOT}/Lib/ModelData/*.ort
)

# Check if binary data target exists in main build
# If building standalone, we need to create it
if(NOT TARGET bin_data)
    juce_add_binary_data(bin_data SOURCES ${RESOURCES_FILES})
    juce_generate_juce_header(${BaseTargetName})
endif()

# BasicPitch CNN library
add_library(BasicPitchCNN STATIC ${MAIN_PROJECT_ROOT}/Lib/Model/BasicPitchCNN.cpp)
target_include_directories(BasicPitchCNN PRIVATE
    ${MAIN_PROJECT_ROOT}/ThirdParty/RTNeural
)

# Include directories for generated headers (if main build exists)
if(EXISTS "${MAIN_PROJECT_ROOT}/build/${BaseTargetName}_artefacts/JuceLibraryCode")
    target_include_directories(BasicPitchCNN PRIVATE
        ${MAIN_PROJECT_ROOT}/build/${BaseTargetName}_artefacts/JuceLibraryCode
        ${MAIN_PROJECT_ROOT}/build/juce_binarydata_bin_data/JuceLibraryCode
endif()

target_link_libraries(BasicPitchCNN PUBLIC RTNeural bin_data juce::juce_core)

# ONNX Runtime setup
add_library(onnxruntime STATIC IMPORTED)

if(APPLE)
    set_property(TARGET onnxruntime PROPERTY IMPORTED_LOCATION
        ${MAIN_PROJECT_ROOT}/ThirdParty/onnxruntime/lib/libonnxruntime.a)
elseif(WIN32)
    set_property(TARGET onnxruntime APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
    set_target_properties(onnxruntime PROPERTIES
        IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
        IMPORTED_LOCATION_RELEASE "${MAIN_PROJECT_ROOT}/ThirdParty/onnxruntime/lib/onnxruntime.lib")
    set_target_properties(onnxruntime PROPERTIES
        MAP_IMPORTED_CONFIG_DEBUG Release
        MAP_IMPORTED_CONFIG_MINSIZEREL Release
        MAP_IMPORTED_CONFIG_RELWITHDEBINFO Release)
elseif(UNIX)
    set_property(TARGET onnxruntime PROPERTY IMPORTED_LOCATION
        ${MAIN_PROJECT_ROOT}/ThirdParty/onnxruntime/lib/libonnxruntime.a)
endif()

# Drums CLI executable
set(DRUMS_CLI_SOURCES
    ${CMAKE_CURRENT_SOURCE_DIR}/neuralnote_drums_cli.cpp
    ${MAIN_PROJECT_ROOT}/Lib/Model/Features.cpp
    ${MAIN_PROJECT_ROOT}/Lib/Model/BasicPitch.cpp
    ${MAIN_PROJECT_ROOT}/Lib/Model/Notes.cpp
)

add_executable(neuralnote_drums_cli ${DRUMS_CLI_SOURCES})

set_target_properties(neuralnote_drums_cli PROPERTIES
    OUTPUT_NAME "neuralnote_drums"
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/CLI"
    CXX_STANDARD 17
    CXX_STANDARD_REQUIRED ON
)

# Include directories
target_include_directories(neuralnote_drums_cli PRIVATE
    ${MAIN_PROJECT_ROOT}/Lib/Model
    ${MAIN_PROJECT_ROOT}/Lib/Utils
    ${MAIN_PROJECT_ROOT}/ThirdParty/onnxruntime/include
)

# Add generated header directories if they exist
if(EXISTS "${MAIN_PROJECT_ROOT}/build/${BaseTargetName}_artefacts/JuceLibraryCode")
    target_include_directories(neuralnote_drums_cli PRIVATE
        ${MAIN_PROJECT_ROOT}/build/${BaseTargetName}_artefacts/JuceLibraryCode
        ${MAIN_PROJECT_ROOT}/build/juce_binarydata_bin_data/JuceLibraryCode
    )
endif()

# Link libraries
target_link_libraries(neuralnote_drums_cli PRIVATE
    juce::juce_core
    juce::juce_audio_basics
    juce::juce_audio_formats
    juce::juce_events
    juce::juce_graphics
    onnxruntime
    bin_data
    BasicPitchCNN
    RTNeural
)

# Platform-specific settings
if(APPLE)
    target_link_libraries(neuralnote_drums_cli PRIVATE
        "-framework Foundation"
        "-framework Accelerate"
        "-framework CoreAudio"
    )

    if(CMAKE_OSX_ARCHITECTURES MATCHES "arm64")
        target_compile_options(neuralnote_drums_cli PRIVATE -march=native -O3)
    endif()

    set_target_properties(neuralnote_drums_cli PROPERTIES
        MACOSX_DEPLOYMENT_TARGET "10.15"
    )
endif()

# Compiler definitions
target_compile_definitions(neuralnote_drums_cli PRIVATE
    JUCE_WEB_BROWSER=0
    JUCE_USE_CURL=0
    CLI_BUILD=1
)

message(STATUS "Drums CLI will be built as: ${CMAKE_BINARY_DIR}/CLI/neuralnote_drums")


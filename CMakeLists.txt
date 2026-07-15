cmake_minimum_required(VERSION 3.16)
project(NeuralNotePlugin VERSION 1.1.0)

# C++ settings
set(CMAKE_CXX_STANDARD 17)
enable_language(CXX)

set(CMAKE_EXPORT_COMPILE_COMMANDS TRUE)
set(CMAKE_POSITION_INDEPENDENT_CODE TRUE)

# Minimum MacOS target
set(CMAKE_OSX_DEPLOYMENT_TARGET "10.15" CACHE STRING "Minimum OS X deployment version" FORCE)

option(UniversalBinary "Build universal binary for mac" OFF)
option(RTNeural_Release "When CMAKE_BUILD_TYPE=Debug, overwrite it to Release for RTNeural only" OFF)
option(LTO "Enable Link Time Optimization" ON)
option(BUILD_CLI "Build command-line interface" ON)

if (UniversalBinary)
    set(CMAKE_OSX_ARCHITECTURES "x86_64;arm64" CACHE INTERNAL "")
    message(STATUS "Building Universal Binary")
endif ()

# Static linking in Windows
set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")

# Add JUCE and RTNeural
add_subdirectory(ThirdParty/JUCE)
add_subdirectory(ThirdParty/RTNeural)

set(BaseTargetName NeuralNote)

# Set COPY_PLUGIN_AFTER_BUILD to TRUE on Mac and to FALSE on Windows
if (APPLE)
    set(COPY_PLUGIN_AFTER_BUILD TRUE)
else ()
    set(COPY_PLUGIN_AFTER_BUILD FALSE)
endif ()

# Main plugin target (keeping original)
juce_add_plugin("${BaseTargetName}"
        ICON_BIG "${CMAKE_CURRENT_LIST_DIR}/NeuralNote/Assets/logo.png"
        ICON_SMALL "${CMAKE_CURRENT_LIST_DIR}/NeuralNote/Assets/logo.png"
        COMPANY_NAME "Dr. Audio"
        BUNDLE_ID "com.draudio.neuralnote"
        IS_SYNTH FALSE
        NEEDS_MIDI_INPUT FALSE
        NEEDS_MIDI_OUTPUT TRUE
        IS_MIDI_EFFECT FALSE
        EDITOR_WANTS_KEYBOARD_FOCUS FALSE
        COPY_PLUGIN_AFTER_BUILD ${COPY_PLUGIN_AFTER_BUILD}
        MICROPHONE_PERMISSION_ENABLED TRUE
        MICROPHONE_PERMISSION_TEXT "Need access to Microphone"
        HARDENED_RUNTIME_ENABLED TRUE
        PLUGIN_MANUFACTURER_CODE DrAu
        PLUGIN_CODE NRNT
        FORMATS AU VST3 Standalone
        PRODUCT_NAME "NeuralNote")

juce_generate_juce_header(${BaseTargetName})

# Plugin source files
file(GLOB_RECURSE SOURCES_PLUGIN ${CMAKE_CURRENT_LIST_DIR}/NeuralNote/*.cpp ${CMAKE_CURRENT_LIST_DIR}/Lib/*.cpp)
list(REMOVE_ITEM SOURCES_PLUGIN ${CMAKE_CURRENT_LIST_DIR}/Lib/Model/BasicPitchCNN.cpp)
file(GLOB_RECURSE HEADERS_PLUGIN ${CMAKE_CURRENT_LIST_DIR}/NeuralNote/*.h ${CMAKE_CURRENT_LIST_DIR}/Lib/*.h)
list(REMOVE_ITEM HEADERS_PLUGIN ${CMAKE_CURRENT_LIST_DIR}/Lib/Model/BasicPitchCNN.h)

target_sources(${BaseTargetName} PRIVATE ${SOURCES_PLUGIN} ${HEADERS_PLUGIN})

# Include directories for plugin
file(GLOB_RECURSE lib_dirs LIST_DIRECTORIES true ${CMAKE_CURRENT_LIST_DIR}/Lib/*)
foreach (dir ${lib_dirs})
    IF (IS_DIRECTORY ${dir})
        target_include_directories(${BaseTargetName} PRIVATE ${dir})
    ENDIF ()
endforeach ()

file(GLOB_RECURSE source_dirs LIST_DIRECTORIES true ${CMAKE_CURRENT_LIST_DIR}/NeuralNote/*)
foreach (dir ${source_dirs})
    IF (IS_DIRECTORY ${dir})
        target_include_directories(${BaseTargetName} PRIVATE ${dir})
    ENDIF ()
endforeach ()

# Binary data (model files and assets)
file(GLOB RESOURCES_FILES
    ${CMAKE_CURRENT_LIST_DIR}/Lib/ModelData/*.json
    ${CMAKE_CURRENT_LIST_DIR}/Lib/ModelData/*.ort
    ${CMAKE_CURRENT_LIST_DIR}/NeuralNote/Assets/*.ttf
    ${CMAKE_CURRENT_LIST_DIR}/NeuralNote/Assets/*.png
    ${CMAKE_CURRENT_LIST_DIR}/NeuralNote/Assets/*.svg)

juce_add_binary_data(bin_data SOURCES ${RESOURCES_FILES})

# BasicPitch CNN library
add_library(BasicPitchCNN STATIC ${CMAKE_CURRENT_LIST_DIR}/Lib/Model/BasicPitchCNN.cpp)
target_include_directories(BasicPitchCNN PRIVATE
    ${CMAKE_CURRENT_LIST_DIR}/ThirdParty/RTNeural
    # Remove this line: ${CMAKE_CURRENT_SOURCE_DIR}/ThirdParty/JUCE/modules
    # Instead, link against the JUCE modules directly
)
# Ensure BasicPitchCNN can find the generated JuceHeader.h and BinaryData.h
# These are usually located in the build directory within the JuceLibraryCode folders.
target_include_directories(BasicPitchCNN PRIVATE
    ${CMAKE_BINARY_DIR}/${BaseTargetName}_artefacts/JuceLibraryCode
    ${CMAKE_BINARY_DIR}/juce_binarydata_bin_data/JuceLibraryCode
)

if ((CMAKE_BUILD_TYPE STREQUAL "Debug") AND RTNeural_Release)
    if (MSVC)
        target_compile_options(BasicPitchCNN PUBLIC /O2)
    else ()
        target_compile_options(BasicPitchCNN PUBLIC -O3)
    endif ()
endif ()
# You must explicitly link BasicPitchCNN to the JUCE core module
target_link_libraries(BasicPitchCNN PUBLIC RTNeural bin_data juce::juce_core) # <--- ADD juce::juce_core here

# ONNX Runtime setup
add_library(onnxruntime STATIC IMPORTED)

if (APPLE)
    set_property(TARGET onnxruntime PROPERTY IMPORTED_LOCATION ${CMAKE_CURRENT_LIST_DIR}/ThirdParty/onnxruntime/lib/libonnxruntime.a)
elseif (WIN32)
    set_property(TARGET onnxruntime APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
    set_target_properties(onnxruntime PROPERTIES
            IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
            IMPORTED_LOCATION_RELEASE "${CMAKE_CURRENT_LIST_DIR}/ThirdParty/onnxruntime/lib/onnxruntime.lib")
    set_target_properties(onnxruntime PROPERTIES
            MAP_IMPORTED_CONFIG_DEBUG Release
            MAP_IMPORTED_CONFIG_MINSIZEREL Release
            MAP_IMPORTED_CONFIG_RELWITHDEBINFO Release)
elseif (UNIX)
    set_property(TARGET onnxruntime PROPERTY IMPORTED_LOCATION ${CMAKE_CURRENT_LIST_DIR}/ThirdParty/onnxruntime/lib/libonnxruntime.a)
endif ()

# Include directories for main plugin
target_include_directories("${BaseTargetName}" PRIVATE
    ${CMAKE_CURRENT_LIST_DIR}/ThirdParty/onnxruntime/include
    ${CMAKE_CURRENT_LIST_DIR}/ThirdParty/minimp3)

# Plugin compile definitions
target_compile_definitions(${BaseTargetName}
        PUBLIC
        JUCE_WEB_BROWSER=0
        JUCE_USE_CURL=0
        JUCE_VST3_CAN_REPLACE_VST2=0)

# Link libraries for plugin
target_link_libraries(${BaseTargetName}
        PRIVATE
        juce::juce_audio_utils
        juce::juce_dsp
        BasicPitchCNN
        onnxruntime
        bin_data
        PUBLIC
        juce_recommended_config_flags)

if (${LTO})
    target_link_libraries(${BaseTargetName} PUBLIC juce_recommended_lto_flags)
    message(STATUS "Link Time Optimization (LTO) enabled")
endif ()

target_compile_definitions(${BaseTargetName}
        PRIVATE
        SAVE_DOWNSAMPLED_AUDIO=0
        USE_TEST_NOTE_FRAME_TO_TIME=0)

if (WIN32)
    target_compile_definitions(${BaseTargetName} PUBLIC JUCE_ASIO=1)
    target_include_directories(${BaseTargetName} PRIVATE ThirdParty/ASIO/common)
endif ()

#==============================================================================
# Enhanced CLI Executable Target
#==============================================================================

if(BUILD_CLI)
    message(STATUS "Building Enhanced NeuralNote CLI with MIDI playback")

    # CLI source files - check for both standard and GUI-matching versions
    if(EXISTS "${CMAKE_CURRENT_LIST_DIR}/neuralnote_gui_cli.cpp")
        set(CLI_MAIN_SOURCE "${CMAKE_CURRENT_LIST_DIR}/neuralnote_gui_cli.cpp")
        message(STATUS "Using GUI-matching CLI source")
    elseif(EXISTS "${CMAKE_CURRENT_LIST_DIR}/neuralnote_cli.cpp")
        set(CLI_MAIN_SOURCE "${CMAKE_CURRENT_LIST_DIR}/neuralnote_cli.cpp")
        message(STATUS "Using standard CLI source")
    elseif(EXISTS "${CMAKE_CURRENT_LIST_DIR}/Source/CLI/neuralnote_cli.cpp")
        set(CLI_MAIN_SOURCE "${CMAKE_CURRENT_LIST_DIR}/Source/CLI/neuralnote_cli.cpp")
        message(STATUS "Using CLI source from Source/CLI/")
    else()
        message(FATAL_ERROR "No CLI source file found. Please ensure neuralnote_gui_cli.cpp or neuralnote_cli.cpp exists.")
    endif()

    set(CLI_SOURCES
        ${CLI_MAIN_SOURCE}
        ${CMAKE_CURRENT_LIST_DIR}/Lib/Model/Features.cpp
        ${CMAKE_CURRENT_LIST_DIR}/Lib/Model/BasicPitch.cpp
        ${CMAKE_CURRENT_LIST_DIR}/Lib/Model/Notes.cpp
    )

    # Create CLI executable
    add_executable(neuralnote_cli ${CLI_SOURCES})

    # Set target properties for optimal Mac M3 Pro performance
    set_target_properties(neuralnote_cli PROPERTIES
        OUTPUT_NAME "neuralnote"
        RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/CLI"
        CXX_STANDARD 17
        CXX_STANDARD_REQUIRED ON
    )

    # Include directories for CLI
    target_include_directories(neuralnote_cli PRIVATE
        ${CMAKE_CURRENT_LIST_DIR}/Lib/Model
        ${CMAKE_CURRENT_LIST_DIR}/Lib/Utils
        ${CMAKE_CURRENT_LIST_DIR}/ThirdParty/onnxruntime/include
        ${CMAKE_BINARY_DIR}/${BaseTargetName}_artefacts/JuceLibraryCode
        ${CMAKE_BINARY_DIR}/juce_binarydata_bin_data/JuceLibraryCode
    )

    # Link against JUCE modules and dependencies (including audio devices for MIDI)
    target_link_libraries(neuralnote_cli PRIVATE
        juce::juce_core
        juce::juce_data_structures
        juce::juce_events
        juce::juce_audio_basics
        juce::juce_audio_devices
        juce::juce_audio_formats
        juce::juce_audio_processors
        juce::juce_audio_utils
        juce::juce_dsp
        onnxruntime
        bin_data
        BasicPitchCNN
        RTNeural
    )

    # Platform-specific optimizations
    if(APPLE)
        # Mac-specific frameworks
        target_link_libraries(neuralnote_cli PRIVATE
            "-framework Foundation"
            "-framework Accelerate"
            "-framework CoreAudio"
            "-framework AudioToolbox"
            "-framework CoreMIDI"
            "-framework AVFoundation"
        )

        # Apple Silicon optimization for M3 Pro
        if(CMAKE_OSX_ARCHITECTURES MATCHES "arm64")
            target_compile_options(neuralnote_cli PRIVATE
                -march=native
                -mtune=native
                -O3
                -DNDEBUG
            )
            message(STATUS "Apple Silicon optimizations enabled for M3 Pro")
        endif()

        # Set minimum deployment target
        set_target_properties(neuralnote_cli PROPERTIES
            MACOSX_DEPLOYMENT_TARGET "10.15"
        )
    endif()

    # Compiler definitions for CLI
    target_compile_definitions(neuralnote_cli PRIVATE
        JUCE_WEB_BROWSER=0
        JUCE_USE_CURL=0
        JUCE_APPLICATION_NAME_STRING="NeuralNote CLI"
        JUCE_APPLICATION_VERSION_STRING="2.0.0"
        CLI_BUILD=1
        FEATURES_AVAILABLE=1
        BASICPITCH_AVAILABLE=1
        RTNEURAL_DEFAULT_ALIGNMENT=16
        SAVE_DOWNSAMPLED_AUDIO=0
        USE_TEST_NOTE_FRAME_TO_TIME=0
        JUCE_DONT_DECLARE_PROJECTINFO=1
    )

    # Ensure proper include paths for generated headers
    target_include_directories(neuralnote_cli PRIVATE
        ${CMAKE_BINARY_DIR}/juce_binarydata_bin_data/JuceLibraryCode
        ${CMAKE_BINARY_DIR}/${BaseTargetName}_artefacts/JuceLibraryCode
    )

    # Make CLI depend on main plugin to ensure headers are generated
    add_dependencies(neuralnote_cli ${BaseTargetName} bin_data)

    # Create convenience symlink for development
    if(APPLE)
        add_custom_command(TARGET neuralnote_cli POST_BUILD
            COMMAND ${CMAKE_COMMAND} -E create_symlink
            ${CMAKE_BINARY_DIR}/CLI/neuralnote
            ${CMAKE_BINARY_DIR}/neuralnote
            COMMENT "Creating convenience symlink"
        )
    endif()

    message(STATUS "CLI executable will be built as: ${CMAKE_BINARY_DIR}/CLI/neuralnote")
    message(STATUS "Convenience symlink: ${CMAKE_BINARY_DIR}/neuralnote")
endif()

#==============================================================================
# Drums CLI Executable Target (Beatboxing/Percussion)
#==============================================================================

if(BUILD_CLI)
    message(STATUS "Building NeuralNote Drums CLI for percussion transcription")

    # Check for drums CLI source in beat-box-app
    if(EXISTS "${CMAKE_CURRENT_LIST_DIR}/beat-box-app/cli/neuralnote_drums_cli.cpp")
        set(DRUMS_CLI_SOURCE "${CMAKE_CURRENT_LIST_DIR}/beat-box-app/cli/neuralnote_drums_cli.cpp")
        message(STATUS "Using drums CLI from beat-box-app/cli/")
    else()
        message(WARNING "Drums CLI source not found at beat-box-app/cli/neuralnote_drums_cli.cpp")
    endif()

    if(DRUMS_CLI_SOURCE)
        set(DRUMS_CLI_SOURCES
            ${DRUMS_CLI_SOURCE}
            ${CMAKE_CURRENT_LIST_DIR}/Lib/Model/Features.cpp
            ${CMAKE_CURRENT_LIST_DIR}/Lib/Model/BasicPitch.cpp
            ${CMAKE_CURRENT_LIST_DIR}/Lib/Model/Notes.cpp
        )

        add_executable(neuralnote_drums_cli ${DRUMS_CLI_SOURCES})

        set_target_properties(neuralnote_drums_cli PROPERTIES
            OUTPUT_NAME "neuralnote_drums"
            RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/CLI"
            CXX_STANDARD 17
            CXX_STANDARD_REQUIRED ON
        )

        target_include_directories(neuralnote_drums_cli PRIVATE
            ${CMAKE_CURRENT_LIST_DIR}/Lib/Model
            ${CMAKE_CURRENT_LIST_DIR}/Lib/Utils
            ${CMAKE_CURRENT_LIST_DIR}/ThirdParty/onnxruntime/include
            ${CMAKE_BINARY_DIR}/${BaseTargetName}_artefacts/JuceLibraryCode
            ${CMAKE_BINARY_DIR}/juce_binarydata_bin_data/JuceLibraryCode
        )

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

        target_compile_definitions(neuralnote_drums_cli PRIVATE
            JUCE_WEB_BROWSER=0
            JUCE_USE_CURL=0
            CLI_BUILD=1
        )

        add_dependencies(neuralnote_drums_cli ${BaseTargetName} bin_data)

        message(STATUS "Drums CLI: ${CMAKE_BINARY_DIR}/CLI/neuralnote_drums")
    endif()
endif()

# Unit tests (if enabled)
if (BUILD_UNIT_TESTS)
    add_subdirectory(Tests)
endif ()

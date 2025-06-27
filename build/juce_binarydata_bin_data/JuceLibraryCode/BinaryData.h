/* =========================================================================================

   This is an auto-generated file: Any edits you make may be overwritten!

*/

#pragma once

namespace BinaryData
{
    extern const char*   cnn_contour_model_json;
    const int            cnn_contour_model_jsonSize = 335797;

    extern const char*   cnn_note_model_json;
    const int            cnn_note_model_jsonSize = 111888;

    extern const char*   cnn_onset_1_model_json;
    const int            cnn_onset_1_model_jsonSize = 247581;

    extern const char*   cnn_onset_2_model_json;
    const int            cnn_onset_2_model_jsonSize = 21667;

    extern const char*   features_model_ort;
    const int            features_model_ortSize = 175264;

    extern const char*   MontserratBold_ttf;
    const int            MontserratBold_ttfSize = 198072;

    extern const char*   MontserratRegular_ttf;
    const int            MontserratRegular_ttfSize = 197976;

    extern const char*   MontserratSemiBold_ttf;
    const int            MontserratSemiBold_ttfSize = 198204;

    extern const char*   back_svg;
    const int            back_svgSize = 619;

    extern const char*   background_png;
    const int            background_pngSize = 703780;

    extern const char*   center_off_svg;
    const int            center_off_svgSize = 1516;

    extern const char*   center_on_svg;
    const int            center_on_svgSize = 1598;

    extern const char*   deleteicon_svg;
    const int            deleteicon_svgSize = 532;

    extern const char*   logo_png;
    const int            logo_pngSize = 101079;

    extern const char*   mute_svg;
    const int            mute_svgSize = 1719;

    extern const char*   pause_svg;
    const int            pause_svgSize = 417;

    extern const char*   play_svg;
    const int            play_svgSize = 318;

    extern const char*   recordingoff_svg;
    const int            recordingoff_svgSize = 25087;

    extern const char*   recordingon_svg;
    const int            recordingon_svgSize = 24808;

    extern const char*   settings_svg;
    const int            settings_svgSize = 3735;

    extern const char*   unmute_svg;
    const int            unmute_svgSize = 1248;

    // Number of elements in the namedResourceList and originalFileNames arrays.
    const int namedResourceListSize = 21;

    // Points to the start of a list of resource names.
    extern const char* namedResourceList[];

    // Points to the start of a list of resource filenames.
    extern const char* originalFilenames[];

    // If you provide the name of one of the binary resource variables above, this function will
    // return the corresponding data and its size (or a null pointer if the name isn't found).
    const char* getNamedResource (const char* resourceNameUTF8, int& dataSizeInBytes);

    // If you provide the name of one of the binary resource variables above, this function will
    // return the corresponding original, non-mangled filename (or a null pointer if the name isn't found).
    const char* getNamedResourceOriginalFilename (const char* resourceNameUTF8);
}

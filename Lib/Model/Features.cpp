//
// Created by Damien Ronssin on 04.03.23.
//

#include "Features.h"
#include <stdexcept>
#include <string>

Features::Features()
    : mMemoryInfo(nullptr)
    , mSession(nullptr)
{
    mMemoryInfo = Ort::MemoryInfo::CreateCpu(OrtDeviceAllocator, OrtMemTypeCPU);

    mSessionOptions.SetInterOpNumThreads(1);
    mSessionOptions.SetIntraOpNumThreads(1);

    mSession = Ort::Session(mEnv, BinaryData::features_model_ort, BinaryData::features_model_ortSize, mSessionOptions);
}

const float* Features::computeFeatures(float* inAudio, size_t inNumSamples, size_t& outNumFrames)
{
    mInputShape[0] = 1;
    mInputShape[1] = static_cast<int64_t>(inNumSamples);
    mInputShape[2] = 1;

    mInput.clear();
    mInput.push_back(
        Ort::Value::CreateTensor<float>(mMemoryInfo, inAudio, inNumSamples, mInputShape.data(), mInputShape.size()));

    mOutput = mSession.Run(mRunOptions, mInputNames, mInput.data(), 1, mOutputNames, 1);

    auto out_shape = mOutput[0].GetTensorTypeAndShapeInfo().GetShape();

    // Check output shape validity (replace assert with runtime check)
    if (out_shape[0] != 1 || out_shape[2] != NUM_FREQ_IN || out_shape[3] != NUM_HARMONICS) {
        throw std::runtime_error(
            "ONNX model output shape mismatch. Expected [1, N, " +
            std::to_string(NUM_FREQ_IN) + ", " + std::to_string(NUM_HARMONICS) +
            "], got [" + std::to_string(out_shape[0]) + ", " + std::to_string(out_shape[1]) +
            ", " + std::to_string(out_shape[2]) + ", " + std::to_string(out_shape[3]) + "]"
        );
    }

    outNumFrames = static_cast<size_t>(out_shape[1]);

    // Check if we got 0 frames (this would cause empty results)
    if (outNumFrames == 0) {
        throw std::runtime_error(
            "ONNX model returned 0 frames. Input samples: " + std::to_string(inNumSamples) +
            ". Model may not be processing the audio correctly."
        );
    }

    mInput.clear();

    return mOutput[0].GetTensorData<float>();
}

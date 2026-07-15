Create beat box CLI and application

- this application should be as few lines as possible
- a minimal viable product
- no styles applied to anything
- only write one bash file that can be executed to build the entire application
- if you use python use conda for environmet management
- this should be a docker application
- this application should account mac processors, gpu nvidia, and just cpu processing
- beat box CLI and application takes an audio sound that is recorded by an input device
- that file is processed by a NeuralNote to determine the best possible midi file based off a coefiecnt that is based off https://en.wikipedia.org/wiki/Music_theory concepts and then the midi ouput is based off https://en.wikipedia.org/wiki/MIDI_controller concepts
- all audio is recored saved and processed by the NeuralNote and which build a model that creates the beat box audio file as midi the GAN is trained to make this output as accurate as possible using these concepts
- We need to compile NeuralNote binary and call it through the python cli/api
- once the NeuralNote has finished training it attempts to use the model to generate the beat box audio as midi which can be played back through the react app
- using the python cli/api we can create react tailwind ui that allow me to record the beat box audio runs the training process and returns the midi result for playing in the browser
- the goal of this project is create a way to record beat box audio and covert it to identica midi
- account for all audio file formats https://en.wikipedia.org/wiki/Audio_file_format mac windows web anything
- the display will have a way to display and play audio input and midi output
- let me know if you know what to do?
